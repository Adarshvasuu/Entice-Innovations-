---
name: liquid-glass
description: >-
  Apple-inspired true optical liquid glass, real-time WebGL refraction, adaptive Gaussian blur,
  specular rim highlights, and dynamic glass buttons/containers based on liquid-glass-js.
  Use when building ultra-luxurious glassmorphism, refractive navigation bars, pill buttons,
  floating dynamic islands, and realistic frosted glass surfaces in React/Next.js.
---

# Liquid Glass WebGL Skill

Inspired by Apple's physical liquid glass design language, this skill implements realistic
optical refraction, dynamic rim highlights, and multi-layer light bending over DOM backgrounds.

## Engine Source Files

The core JavaScript & CSS engine files are available at:
- Container class: `.agents/skills/liquid-glass/src/container.js`
- Button class: `.agents/skills/liquid-glass/src/button.js`
- Glass base styles: `.agents/skills/liquid-glass/src/glass.css`

---

## 1. Core Optical Parameters

| Parameter | Recommended Range | Visual Effect |
|---|---|---|
| **Edge Intensity** | `0.02 - 0.05` | Refraction and light bending at component boundaries |
| **Rim Intensity** | `0.08 - 0.15` | Specular chrome/glass highlight along edges |
| **Base Intensity** | `0.01 - 0.03` | Center lens distortion |
| **Blur Radius** | `5.0 - 12.0` | Adaptive Gaussian kernel background diffusion |
| **Tint Opacity** | `0.15 - 0.35` | Translucent glass surface tint overlay |

---

## 2. React / Next.js Component Pattern

For React & Next.js projects, liquid glass can be rendered via the WebGL container engine or paired with high-performance CSS hardware-accelerated optical fallbacks:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "pill" | "rounded" | "circle";
}

export function LiquidGlassCard({
  children,
  className = "",
  variant = "rounded"
}: LiquidGlassCardProps) {
  const roundedClass =
    variant === "pill"
      ? "rounded-full"
      : variant === "circle"
      ? "rounded-full aspect-square"
      : "rounded-3xl";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden ${roundedClass} ${className}
        bg-white/[0.04] 
        backdrop-blur-2xl 
        border border-white/[0.12]
        shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
        before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit]
        before:p-[1px] before:bg-gradient-to-b before:from-white/30 before:to-white/0
        after:absolute after:inset-0 after:pointer-events-none after:rounded-[inherit]
        after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.5)]
      `}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
```

---

## 3. WebGL Direct Refraction Setup (Dynamic Island / Floating Nav)

When running the direct WebGL canvas engine over live backgrounds:

```tsx
"use client";

import { useEffect, useRef } from "react";

export function LiquidGlassNav() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    let instance: any = null;
    import(".agents/skills/liquid-glass/src/container.js" as any).then(({ Container }) => {
      if (containerRef.current) {
        instance = new Container({
          type: "pill",
          borderRadius: 24,
          tintOpacity: 0.2,
        });
        containerRef.current.appendChild(instance.element);
      }
    });

    return () => {
      if (instance && instance.destroy) instance.destroy();
    };
  }, []);

  return <div ref={containerRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50" />;
}
```

---

## 4. Design Guidelines for True Liquid Glass

1. **Light Contrast**: Glass requires high contrast in the background (images, gradients, or dark texturing) to show off refraction. On a flat #000000 background, glass is invisible without rim lighting.
2. **Specular Top Edge**: Real glass has an illuminated top edge (`border-t border-white/30`) and a darkened underside (`border-b border-black/40`).
3. **Inner Shadows**: Use inset shadows (`inset 0 1px 1px rgba(255,255,255,0.3)`) to emulate glass thickness.
