---
name: shadergradient
description: >-
  Implementation guide and recipes for ShaderGradient (shadergradient.co / @shadergradient/react).
  Use when building fluid, organic, animated 3D WebGL gradient canvases, mesh gradients,
  aurora waves, liquid backdrops, and interactive color mesh animations for hero sections,
  landing backgrounds, cards, and modal backdrops in React/Next.js.
---

# ShaderGradient Skill

ShaderGradient creates three-dimensional animated gradient surfaces powered by Three.js and GLSL shaders.
It produces fluid, moving color waves with custom color palettes, wireframe options, lighting, and camera choreography.

## Required Dependencies

```bash
npm install @shadergradient/react @react-three/fiber three three-stdlib camera-controls
```

---

## 1. Next.js App Router Integration (Dynamic Client Component)

Because ShaderGradient uses WebGL, it must be loaded dynamically on the client without SSR:

```tsx
"use client";

import dynamic from "next/dynamic";

export const ShaderGradientCanvas = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradientCanvas),
  { ssr: false }
);

export const ShaderGradient = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradient),
  { ssr: false }
);
```

---

## 2. Production Fluid Hero Background (Agency Theme)

```tsx
"use client";

import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

export function HeroGradientBackground() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        lazy={false}
      >
        <ShaderGradient
          control="props"
          animate="on"
          type="waterPlane"           // 'waterPlane' | 'sphere' | 'plane'
          color1="#0a0a0a"            // Deep dark canvas base
          color2="#7c3aed"            // Vibrant Purple
          color3="#06b6d4"            // Electric Cyan
          bgColor1="#000000"
          bgColor2="#050505"
          uSpeed={0.3}                // Fluid motion speed (keep under 0.4 for smooth feel)
          uStrength={2.4}             // Wave height / amplitude
          uDensity={1.3}              // Surface distortion density
          uFrequency={5.5}
          cAzimuthAngle={180}
          cPolarAngle={90}
          cDistance={3.2}
          cameraZoom={1}
          lightType="3d"
          wireframe={false}
          grain="off"                 // 'off' | 'on'
        />
      </ShaderGradientCanvas>
      {/* Vignette / dark overlay to ensure high text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
    </div>
  );
}
```

---

## 3. Key ShaderGradient Presets & Types

### 1. `waterPlane` (Best for Hero Backgrounds & Aurora Waves)
Creates undulating ocean/aurora ribbons across the horizon.
- `type="waterPlane"`
- `uSpeed={0.25}`
- `uStrength={2.0}`
- `cPolarAngle={80}`

### 2. `sphere` (Best for Interactive Floating 3D Blob)
Creates an organic morphing sphere ideal for centered branding or mascot visuals.
- `type="sphere"`
- `uSpeed={0.35}`
- `uStrength={1.5}`
- `cDistance={2.5}`

### 3. `plane` (Best for Card Hover or Glassmorphic Underlays)
Flat fluid surface with subtle color shifts.
- `type="plane"`
- `uStrength={0.8}`
- `uDensity={1.0}`

---

## 4. Performance & Design Best Practices

1. **Lower Animation Speed**: Keep `uSpeed` between `0.2` and `0.4` for an elegant, luxurious drift. Fast speeds look frantic.
2. **Text Contrast**: Always place a subtle gradient or dark backdrop (`bg-[#0a0a0a]/40 backdrop-blur-[2px]`) over the canvas so headlines remain razor sharp and accessible.
3. **Lazy Rendering**: Use `lazy={true}` for sections placed below the fold so the GPU doesn't compute shader passes when outside the viewport.
4. **Pointer Events**: Ensure `pointerEvents: "none"` is set on background wrappers so clicks pass through to buttons and links without interference.
