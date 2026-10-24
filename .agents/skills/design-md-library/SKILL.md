---
name: design-md-library
description: >-
  Design system knowledge base containing 84 reverse-engineered production design systems
  from world-class tech and design leaders (Linear, Apple, Stripe, Framer, Vercel, Supabase,
  Raycast, OpenAI, Figma, Ferrari, Bugatti, etc.). Use when the user wants to adopt, emulate,
  or build components with the exact color tokens, typography scales, spacing rules, and layout
  patterns of a specific leading brand or aesthetic.
---

# Design MD Library Skill

This skill allows the agent to consult and directly extract exact production tokens, typography,
layouts, and styling rules from 84 industry-leading tech and design companies.

## Available Design Systems in Library

The full library of design specs is located at:
`design-systems/<brand-name>/DESIGN.md` or `.agents/skills/design-md-library/library/<brand-name>/DESIGN.md`

### Notable Tech & AI Systems:
- **linear.app**: Deepest dark (#010102), hairline borders (#23252a), signature lavender (#5e6ad2), software-craft luxury.
- **framer**: Modern canvas, fluid micro-interactions, rich typography, dynamic surface elevations.
- **vercel**: Monochrome precision (#000000, #ffffff, #888888), high contrast, developer-grade geometric layout.
- **supabase**: Dark terminal aesthetic, emerald neon accent (#3ecf8e), layered charcoal surfaces.
- **raycast**: Mac-native dark mode, vibrant red/orange key accents, ultra-compact high-density layouts.
- **stripe**: Clean, multidimensional gradients, luminous glass layers, crisp typography hierarchy.
- **openai / claude / mistral.ai**: Minimalist editorial canvas, quiet high-contrast text, human-centric tech typography.
- **apple**: Precision typography (SF Pro), blurred frosted glass (backdrop-blur-2xl), subtle radial highlights.

### Luxury & High-Impact Brands:
- **ferrari / lamborghini / bugatti**: Aggressive contrast, hyper-car speed aesthetics, high-impact typography, carbon textures.

---

## How to Apply a DESIGN.md System to Code

When instructed to adopt a brand style (e.g. "make it look like Linear" or "use Stripe design tokens"):

1. **Locate and inspect the DESIGN.md**:
   Read `design-systems/<brand>/DESIGN.md` for:
   - `colors`: Canvas, surface elevations (surface-1 to surface-4), ink (text contrast levels), hairlines, and primary accents.
   - `typography`: Display, heading, body fonts, sizes, line heights, and negative letter-spacing.
   - `spacing & radius`: Border radius curves, padding density, component heights.
   - `components & cards`: Exact shadows, border opacities, and hover state definitions.

2. **Map Tokens into Tailwind / CSS**:
   Convert the YAML tokens into Tailwind classes or CSS variables:
   ```css
   /* Example: Linear-style canvas & surfaces */
   --canvas: #010102;
   --surface-1: #0f1011;
   --hairline: #23252a;
   --accent: #5e6ad2;
   ```

3. **Enforce the Visual Rules**:
   - Never mix conflicting design languages (e.g. don't put soft playful pastels into a Linear dark canvas).
   - Use the exact letter-spacing specified in `typography` (e.g. `-1.8px` on `display-lg`).
   - Match the card border and elevation hierarchy strictly.
