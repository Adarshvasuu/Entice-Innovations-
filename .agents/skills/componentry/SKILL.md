---
name: componentry
description: >-
  Catalog, registry, and implementation guide for Componentry UI (https://componentry.dev) — premium animated React, Framer Motion, Tailwind CSS, and WebGL components.
  Use when the user asks to build, scaffold, or import any Componentry UI component (e.g. Spectral Ribbon, Magnetic Dock, Sticky Scroll Cards, Eye Tracking, Text Morphs, Liquid Glass Carousel, etc.).
---

# Componentry UI Components Skill

[Componentry](https://componentry.dev) is a curated library of handcrafted, animated React UI components built with **Tailwind CSS**, **TypeScript**, **Framer Motion**, and **WebGL**.

Every component in Componentry is available as open registry endpoints at:
```
https://componentry.dev/r/{component-name}.json
```

---

## 1. Quick Installation & AI Integration

### Option A: Using Shadcn CLI / Registry
Add the registry to `components.json`:
```json
{
  "registries": {
    "@componentry": "https://componentry.dev/r/{name}.json"
  }
}
```
Or run directly:
```bash
npx shadcn@latest add "https://componentry.dev/r/{component-name}.json"
```

### Option B: Fetching Directly via AI Agent
When the user asks for any Componentry component, the agent can fetch the raw registry JSON directly from `https://componentry.dev/r/{component-name}.json` and write the code into the user's project.

---

## 2. Complete Component Catalog

### A. Featured & Visual Effects
| Component | Slug / Registry Name | Description | Key Tech |
| :--- | :--- | :--- | :--- |
| **Spectral Ribbon** | `spectral-ribbon` | Soft spectral light ribbon on pure black with liquid motion and rainbow fringe | WebGL / Canvas |
| **Image Ripple Effect** | `image-ripple-effect` | WebGL cursor ripples displacing layered image cards in real time | WebGL / Shaders |
| **Liquid Glass Carousel** | `liquid-glass-carousel` | Infinite carousel through a liquid-glass lens with chromatic rim | WebGL / Framer Motion |
| **Dithered Logo** | `dithered-logo` | Interactive particle logo turning image assets into a dithered canvas field | Canvas / Math |
| **Ripple Transition** | `ripple-transition` | WebGL image transition with noisy refractive waves and chromatic edges | WebGL / Shaders |

### B. Text & Typography Animations
| Component | Slug / Registry Name | Description | Key Tech |
| :--- | :--- | :--- | :--- |
| **Velocity Scroll** | `scroll-based-velocity` | Horizontal infinite ticker whose velocity scales dynamically with scroll speed | Framer Motion |
| **Letter Cascade** | `letter-cascade` | Kinetic text where letters scatter with spring physics/blur and reassemble | Framer Motion |
| **Text Repel** | `text-repel` | Physics-based text reacting to cursor proximity with magnetic force fields | Framer Motion |
| **Text Morph** | `text-morph` | Fluid SVG gooey filter morph between words and states | SVG Filters / CSS |
| **Flipping Word Swap** | `flipping-word-swap` | 3D character-by-character flip between two words on interaction | CSS 3D Transforms |
| **Kinetic Text Reveal** | `kinetic-text-reveal` | Directional text reveal with blur and configurable word/character stagger | Framer Motion |
| **Particle Typography** | `cursor-driven-particle-typography` | Typography constructed of particles that disperse and reform on cursor hover | Canvas / Springs |
| **Annotated Text** | `annotated-text` | Hand-drawn sketched SVG marks (circles, underlines, highlights, cross-outs) | SVG Paths / Motion |

### C. UI & Presentation Decks
| Component | Slug / Registry Name | Description | Key Tech |
| :--- | :--- | :--- | :--- |
| **Case Study Flip Stack** | `case-study-flip-stack` | 3D editorial cards folding upward and peeling back on scroll | Framer Motion 3D |
| **Sticky Scroll Cards** | `sticky-scroll-cards` | Scroll-pinned card stack where images pin, scale, and layer | Framer Motion |
| **Scroll Split Card** | `scroll-split-card` | Scroll-driven card that splits into three panels and flips | Framer Motion 3D |
| **Scroll Choreography** | `scroll-choreography` | Multi-image spatial choreography linked to scroll viewport | Framer Motion |
| **Scroll Tilted Grid** | `scroll-tilted-grid` | Cinematic tilted grid resolving into focus as frames enter view | CSS 3D / Motion |
| **Orbit Card Stack** | `orbit-card-stack` | Fan-out card deck on hover lifting active card cleanly | Framer Motion |
| **Layered Stack** | `layered-stack` | Interactive multi-layer card stack with mouse hover depth | Framer Motion |
| **Wheel Carousel** | `wheel-carousel` | Rotating wheel picker with inertial drag and curved fading labels | Framer Motion Drag |
| **Spiral 3D Slider** | `spiral-3d-slider` | Compact image gallery traversing along a 3D spiral path on scroll | Three.js / CSS 3D |
| **Collection Surfer** | `collection-surfer` | Fluid surfing interaction for browsing multi-item collections | Framer Motion |
| **Fisheye Infinite Grid** | `fisheye-infinite-grid` | Draggable image wall warped as continuous fisheye surface | Canvas / Math |

### D. Interactive Widgets & Micro-interactions
| Component | Slug / Registry Name | Description | Key Tech |
| :--- | :--- | :--- | :--- |
| **Magnetic Dock** | `magnetic-dock` | MacOS-style dock magnifying icons based on cursor proximity | Framer Motion Springs |
| **Eye Tracking** | `eye-tracking` | Hyper-realistic eyes with reactive pupils and blinking following cursor | Canvas / Math |
| **Split Flap Display** | `split-flap-display` | Vintage departure board mechanical split-flap text animation | CSS 3D / Timers |
| **Music Player** | `music-player` | Vinyl record turntable with swinging tonearm and rotation | Framer Motion |
| **Mac Keyboard** | `mac-keyboard` | Realistic interactive Mac keyboard with press physics | Tailwind / CSS |
| **Circuit Board** | `circuit-board` | Animated glowing circuit board paths and pulsing nodes | SVG / Motion |
| **Flight Status Card** | `flight-status-card` | Animated flight ticket and status timeline tracker | Tailwind / Motion |
| **Signature** | `signature` | Smooth pressure-sensitive canvas drawing / signature pad | HTML5 Canvas |
| **Hover Transition** | `hover-transition` | 8 multi-directional interactive hover card reveals | Tailwind / Framer Motion |
| **GitHub Calendar** | `github-calendar` | Activity heatmap contribution matrix with custom tooltips | SVG / React |

---

## 3. General Dependencies

When scaffolding Componentry components in a React / Next.js project, install the standard dependencies:

```bash
npm install framer-motion clsx tailwind-merge lucide-react
```

For WebGL / Three.js components (e.g. Spectral Ribbon, Spiral 3D Slider):
```bash
npm install three @types/three
```

---

## 4. How to Implement Any Component on Demand

To implement any component from Componentry:
1. Locate its slug from the catalog above (e.g. `magnetic-dock`).
2. Read the source from `https://componentry.dev/r/{slug}.json`.
3. Extract the component code from `files[0].content`.
4. Adapt Tailwind classes, paths, and imports to match the user's project structure (`@/lib/utils`, etc.).
