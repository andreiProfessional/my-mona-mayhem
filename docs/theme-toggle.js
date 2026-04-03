(function () {
	const saved = localStorage.getItem('theme');
	if (saved) {
		document.documentElement.setAttribute('data-theme', saved);
	}
})();

// Global function exposed for HTML onclick handlers
window.toggleTheme = function () {
	const html = document.documentElement;
	const current = html.getAttribute('data-theme');
	const next = current === 'light' ? 'dark' : 'light';
	html.setAttribute('data-theme', next);
	localStorage.setItem('theme', next);
	updateToggleIcon();
};

function updateToggleIcon() {
	const btn = document.querySelector('.theme-toggle');
	if (!btn) return;
	const isLight = document.documentElement.getAttribute('data-theme') === 'light';
	btn.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
}

document.addEventListener('DOMContentLoaded', updateToggleIcon);
