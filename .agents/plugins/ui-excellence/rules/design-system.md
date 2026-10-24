# UI Excellence Design System Rules

## Component Architecture
- Every component must accept a `className` prop for composition
- Use `motion.div` from Framer Motion as the default wrapper for animated components
- Extract animation variants into a shared `utils/animations.js` file
- Keep components under 150 lines — split into sub-components if larger

## Responsive Breakpoint Strategy
- Design mobile-first, then enhance for larger screens
- Use Tailwind breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Test at 375px (iPhone SE), 768px (iPad), 1440px (Desktop), 1920px (Large Desktop)
- Hero sections: single column mobile → two column desktop
- Navigation: hamburger mobile → horizontal desktop

## Accessibility Standards
- All images must have descriptive `alt` text
- Interactive elements need `focus-visible` outlines (use accent color ring)
- Respect `prefers-reduced-motion`: disable animations when system preference is set
- Color contrast: ensure 4.5:1 ratio minimum for body text
- All forms need proper `<label>` associations

## Image & Media Guidelines
- Use WebP format when possible for performance
- Hero images: 1920x1080 minimum resolution
- Thumbnails: consistent aspect ratios (16:9 or 4:3)
- Always include loading="lazy" for below-fold images
- Use `object-cover` with proper aspect-ratio containers

## Dark Theme Specifics
- Never use pure black (#000000) — use #0a0a0a or #0f0f0f for depth
- Layer surfaces with increasing white opacity (2%, 5%, 8%, 10%)
- Shadows should use accent colors at low opacity, not black
- Borders: white at 8-15% opacity for subtle separation
- Hover states: increase surface opacity by 3-5%
