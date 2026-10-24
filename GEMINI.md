# Frontend Design Rules — Portfolio / Agency Site

## Design Philosophy
- **Premium & Immersive**: Every page should feel like an Awwwards-winning site
- **Dark-mode first** with rich depth, glassmorphism, and layered backgrounds
- **Motion is meaning**: Every animation should guide the eye, reveal hierarchy, or delight
- **Craft over speed**: Spend time on polish — micro-interactions, smooth easing, pixel-perfect alignment

## Color System
- Primary background: deep rich blacks (`#0a0a0a`, `#111111`, `#0f0f0f`)
- Accent gradients: vivid purple-to-cyan (`#7c3aed` → `#06b6d4`), warm amber accents (`#f59e0b`)
- Glass surfaces: `rgba(255, 255, 255, 0.05)` with `backdrop-filter: blur(16px)`
- Text: off-white (`#f5f5f5`) for headings, muted zinc (`#a1a1aa`) for body
- Borders: subtle white at 8-12% opacity
- Glow effects: use `box-shadow` with accent colors at 20-40% opacity

## Typography
- Use Google Fonts: `Inter` for body, `Outfit` or `Space Grotesk` for headings
- Headings: bold, large, with tight letter-spacing
- Use fluid typography with `clamp()` for responsive sizing
- Hero text should be dramatic — 4xl to 7xl with gradient text effects using `bg-clip-text`

## Animation & Motion (Framer Motion)
- Every section should animate in on scroll using `whileInView` with `once: true`
- Stagger children: `staggerChildren: 0.08` to `0.15` for lists and grids
- Use spring physics: `type: "spring", stiffness: 100, damping: 20`
- Hover states: `scale: 1.02-1.05`, subtle glow, 200-300ms transitions
- Page/route transitions: wrap routes in `AnimatePresence` with fade + y-slide
- Exit animations: always define `exit` variants for smooth unmounts
- Scroll progress: use `useScroll` + `useTransform` for parallax and progress bars

## Component Standards
- Cards: glass effect (`bg-white/5 backdrop-blur-xl`), subtle border, hover lift + glow
- Buttons: gradient background, `hover:scale-105`, shadow expansion on hover
- Navigation: sticky, glass background, smooth scroll links, mobile hamburger with animated toggle
- Sections: full-viewport hero, alternating layouts, generous `py-24` to `py-32` padding
- Images: `object-cover`, subtle parallax via `useTransform`, reveal-on-scroll with clip-path or opacity
- Inputs: dark backgrounds (`bg-white/5`), glowing focus rings with accent colors

## Layout Rules
- Max content width: `max-w-7xl` (1280px) centered with `mx-auto`
- Use CSS Grid for complex layouts, Flexbox for alignment
- Generous whitespace — sections should breathe with `gap-8` to `gap-16`
- Mobile-first responsive: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`

## Tech Stack (This Project)
- React 19 + Vite 8
- Tailwind CSS v4 (use `@import "tailwindcss"` — no config file needed)
- Framer Motion v14
- Lucide React for icons
- Canvas Confetti for celebrations

## Code Quality
- All components: modular, reusable, well-named React components
- Use Tailwind utility classes — no inline styles
- All interactive elements need unique IDs for accessibility
- Semantic HTML5: `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`
- Proper SEO: meta tags, OG tags, structured heading hierarchy (`h1` > `h2` > `h3`)

## Anti-Patterns (NEVER do these)
- No plain white backgrounds
- No default browser fonts (system-ui, serif, sans-serif alone)
- No static, unanimated page loads
- No generic blue/red/green — always use the curated palette
- No placeholder images — generate real assets with the image tool
- No basic MVP-looking interfaces
- No elements without hover/focus states
- No hardcoded pixel values for spacing — use Tailwind scale
