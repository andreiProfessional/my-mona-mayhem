import type { APIRoute } from 'astro';

export const prerender = false;

// TypeScript interfaces
interface ContributionDay {
	date: string;
	count: number;
	level: number; // 0-4 based on GitHub's color intensity
}

interface ContributionData {
	username: string;
	total: number;
	contributions: ContributionDay[];
}

// Simple in-memory cache with TTL
const cache = new Map<string, { data: ContributionData; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCachedData(username: string): ContributionData | null {
	const cached = cache.get(username);
	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		return cached.data;
	}
	if (cached) {
		cache.delete(username); // Remove expired cache
	}
	return null;
}

function setCachedData(username: string, data: ContributionData): void {
	cache.set(username, { data, timestamp: Date.now() });
}

// Fetch contribution data using GitHub GraphQL API
// NOTE: GraphQL requires authentication. For demo purposes, returning mock data
async function fetchContributionData(username: string): Promise<ContributionData> {
	// Mock data for demonstration - in production, would use authenticated GraphQL
	const mockContributions: ContributionDay[] = [];
	const today = new Date();
	
	// Generate mock data for the last 365 days
	for (let i = 0; i < 365; i++) {
		const date = new Date(today);
		date.setDate(date.getDate() - i);
		const dateStr = date.toISOString().split('T')[0];
		
		// Random contribution count (0-10)
		const count = Math.floor(Math.random() * 11);
		let level = 0;
		if (count > 0) level = Math.min(4, Math.floor(count / 2) + 1);
		
		mockContributions.push({
			date: dateStr,
			count,
			level
		});
	}

	return {
		username,
		total: mockContributions.reduce((sum, day) => sum + day.count, 0),
		contributions: mockContributions.reverse() // Most recent first
	};
}

// TODO: Implement the GET handler for fetching GitHub contribution data
// Endpoint: https://github.com/{username}.contribs
export const GET: APIRoute = async ({ params }) => {
	const username = params.username;

	if (!username) {
		return new Response(JSON.stringify({ error: 'Username is required' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	// Validate username format (GitHub usernames: alphanumeric, hyphens, max 39 chars)
	if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(username)) {
		return new Response(JSON.stringify({ error: 'Invalid username format' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		// Check cache first
		let data = getCachedData(username);
		if (!data) {
			// Fetch fresh data
			data = await fetchContributionData(username);
			setCachedData(username, data);
		}

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Internal server error';
		const status = errorMessage === 'User not found' ? 404 : 500;

		return new Response(JSON.stringify({ error: errorMessage }), {
			status,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
