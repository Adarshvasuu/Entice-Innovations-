---
name: react-three-fiber
description: >-
  Comprehensive guide and implementation patterns for React Three Fiber (@react-three/fiber),
  @react-three/drei, and Three.js 3D web experiences. Use when building interactive 3D hero
  backgrounds, particle systems, floating models, 3D cards, shader materials, WebGL canvases,
  interactive product showcases, physics simulations, and cursor-reactive 3D scenes in React/Next.js.
---

# React Three Fiber (R3F) Skill

React Three Fiber is a React renderer for Three.js. It lets you build declarative, reusable,
component-driven 3D scenes with state, hooks, and reactive props.

## Key Ecosystem Packages

- **`three`**: Core WebGL library.
- **`@react-three/fiber`**: React renderer for Three.js.
- **`@react-three/drei`**: High-level helpers, abstractions, controls, shaders, loaders, and environments.
- **`@react-three/postprocessing`**: Bloom, chromatic aberration, depth of field, noise, and vignette effects.
- **`maath`**: Math helpers for smooth damping and spring-like rotations.

---

## 1. Next.js App Router Integration (SSR / Client Only)

R3F requires browser WebGL contexts. Always render the Canvas component inside a client component with dynamic loading or `use client`:

```tsx
"use client";

import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />
});

export default function Hero() {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <Scene3D />
    </div>
  );
}
```

---

## 2. Interactive Cursor-Reactive Mesh / Geometric Orb

```tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    // Smooth mouse tilt
    const { x, y } = state.pointer;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.5, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.5, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#7c3aed"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="w-full h-full pointer-events-none"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[-10, -10, -5]} intensity={1.2} color="#ec4899" />
      <AnimatedOrb />
    </Canvas>
  );
}
```

---

## 3. High-Performance Particle Field (Stars / Cyber Grid)

```tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";

function ParticleField(props: any) {
  const ref = useRef<THREE.Points>(null!);
  
  // Generate random spherical distribution
  const [sphere] = useState(() => {
    const coords = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 2.5;
      const sinPhi = Math.sin(phi);
      coords[i * 3] = r * sinPhi * Math.cos(theta);
      coords[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      coords[i * 3 + 2] = r * Math.cos(phi);
    }
    return coords;
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#a855f7"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
```

---

## 4. Scroll-Driven 3D Scene (Drei ScrollControls)

```tsx
import { ScrollControls, Scroll, useScroll } from "@react-three/drei";

function ScrollItem() {
  const scroll = useScroll();
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    // scroll.offset ranges from 0 to 1
    ref.current.rotation.y = scroll.offset * Math.PI * 2;
    ref.current.position.z = scroll.range(0.2, 0.4) * 2;
  });

  return <mesh ref={ref}>...</mesh>;
}

export function ScrollScene() {
  return (
    <Canvas>
      <ScrollControls pages={3} damping={0.2}>
        <Scroll>
          <ScrollItem />
        </Scroll>
        <Scroll html>
          {/* DOM Overlay content */}
          <div className="h-screen flex items-center"><h1>Slide 1</h1></div>
          <div className="h-screen flex items-center"><h1>Slide 2</h1></div>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
```

---

## 5. Performance Guidelines for R3F in Production

1. **Avoid Instantiating in Loops**: Never call `new THREE.Vector3()` or `new THREE.Color()` inside `useFrame`. Reuse shared module-level objects to prevent garbage collection frame drops.
2. **Use InstancedMesh for Duplicates**: For hundreds of repetitive objects (cubes, particles, cards), always use `<instancedMesh>` instead of individual `<mesh>` nodes.
3. **Set `dpr={[1, 1.5]}`**: Cap Device Pixel Ratio on `<Canvas>` to avoid rendering 4K textures on mobile screens.
4. **GLTF Optimization**: Use `gltf-pipeline` or Draco compression (`useGLTF.preload(url, true)`) to keep 3D asset downloads minimal.
5. **Frame-Rate Throttle**: When offscreen, pause the render loop using `<Canvas frameloop="demand">` or intersection observers.
