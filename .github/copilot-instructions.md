# Project Guidelines

## Project Overview

This is a retro arcade-themed website built with Astro that compares GitHub contribution graphs of two users in a battle arena format.

## Build and Test

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## Astro Best Practices

- Use .astro files for pages and components
- Prefer server-side rendering for dynamic content
- Use client: directives only when necessary for interactivity
- Organize components in src/components/
- Use TypeScript for type safety

## Retro Arcade Design Guide

### Color Palette
- **Primary Green**: `#5fed83` - Used for text, borders, and primary UI elements
- **Accent Purple**: `#8a2be2` - Used for highlights, secondary elements, and hover states
- **Background**: `#0a0a1a` - Deep space blue for the main background
- **Secondary Backgrounds**: `#1a1a2e` and `#16213e` - Gradient overlays for cards and sections
- **Warning/Accent**: `#ffff00` - Yellow for winner announcements and special highlights

### Typography
- **Primary Font**: Press Start 2P (Google Fonts) - Classic pixelated arcade font
- **Font Sizes**: Use relative em units (0.6em, 0.7em, 0.8em, 1.2em, 1.8em) for responsive scaling
- **Letter Spacing**: 2px for titles and buttons to enhance retro feel
- **Text Shadows**: Multi-layered neon glow effects for important text elements

### Animation Styles
- **CRT Effects**: Subtle screen flicker (8s cycle) and scanline overlays
- **Neon Glows**: Pulsing text shadows that alternate between green and purple
- **Float-in Animations**: Elements slide up from below on page load with staggered delays
- **Hover Effects**: Scale transforms (1.2x) with glowing box shadows
- **Shine Effects**: Animated light sweeps across cards and buttons
- **Gradient Shifts**: Color transitions on badges and interactive elements
- **Pulse Animations**: Subtle scaling for badges and buttons (3s cycles)

### Design Principles
- **Sharp Corners**: Use `border-radius: 0` for authentic retro feel
- **Neon Aesthetics**: Multi-layered box shadows and text shadows for glowing effects
- **Layered Backgrounds**: Combine gradients, overlays, and inset shadows
- **Performance**: CSS-only animations for smooth 60fps performance
- **Responsive**: Mobile-first design that stacks vertically on smaller screens
- **Accessibility**: Maintain sufficient contrast while preserving retro aesthetic
