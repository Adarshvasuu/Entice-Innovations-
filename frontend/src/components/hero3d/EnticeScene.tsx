"use client";

import React, { Component, Suspense, useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ─── ERROR BOUNDARY ──────────────────────────────────────────────────────────
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn("WebGL Scene switched to interactive CSS 3D fallback:", error?.message || error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// ─── CLIENT/PARTNER LOGO DATA ────────────────────────────────────────────────
const CLIENT_LOGOS = [
  { url: "/assets/logo/urban-tree.png", alt: "Urban Tree", pos: [-5.2, 2.8, -3.8] as [number, number, number], cssLeft: "15%", cssTop: "22%", size: 68, opacity: 0.38, speed: 0.7, scale: 1.9 },
  { url: "/assets/logo/pious-logo.png", alt: "Pious", pos: [5.2, 3.2, -3.2] as [number, number, number], cssLeft: "82%", cssTop: "24%", size: 62, opacity: 0.40, speed: -0.6, scale: 1.7 },
  { url: "/assets/logo/vog-enhanced.png", alt: "VOG", pos: [-5.6, -2.6, -3.0] as [number, number, number], cssLeft: "12%", cssTop: "72%", size: 76, opacity: 0.35, speed: 0.85, scale: 2.1 },
  { url: "/assets/logo/polymers.png", alt: "Polymers", pos: [5.4, -2.4, -4.2] as [number, number, number], cssLeft: "84%", cssTop: "75%", size: 65, opacity: 0.32, speed: -0.5, scale: 1.8 },
  { url: "/assets/logo/make-me-up.png", alt: "Make Me Up", pos: [2.2, 3.8, -4.8] as [number, number, number], cssLeft: "62%", cssTop: "14%", size: 58, opacity: 0.28, speed: 0.6, scale: 1.6 },
  { url: "/assets/logo/vins-aluminiyum.png", alt: "Vins Aluminium", pos: [-2.6, -3.6, -3.8] as [number, number, number], cssLeft: "32%", cssTop: "84%", size: 64, opacity: 0.30, speed: -0.7, scale: 1.7 },
  { url: "/assets/logo/ip-logo.png", alt: "IP Logo", pos: [-6.2, 0.4, -4.6] as [number, number, number], cssLeft: "8%", cssTop: "48%", size: 66, opacity: 0.32, speed: 0.55, scale: 1.8 },
  { url: "/assets/logo/urban-tree.png", alt: "Urban Tree Secondary", pos: [3.8, -0.6, -2.8] as [number, number, number], cssLeft: "76%", cssTop: "52%", size: 54, opacity: 0.25, speed: -0.8, scale: 1.4 },
];

// ─── INTERACTIVE CSS 3D FALLBACK ENGINE ──────────────────────────────────────
export function CSS3DInteractiveScene({ onInteract }: { onInteract?: () => void }) {
  const [spinDeg, setSpinDeg] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleClick = () => {
    setSpinDeg((prev) => prev + 360);
    if (onInteract) onInteract();
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none pointer-events-none flex items-center justify-center">
      {/* Background Floating Client Logos in Depth */}
      {CLIENT_LOGOS.map((logo, i) => (
        <motion.div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:block"
          style={{
            left: logo.cssLeft,
            top: logo.cssTop,
            opacity: logo.opacity,
          }}
          animate={{
            y: [0, (i % 2 === 0 ? 12 : -12), 0],
            rotate: [0, (i % 2 === 0 ? 4 : -4), 0],
          }}
          transition={{
            duration: 5 + (i * 0.7),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.url}
            alt={logo.alt}
            style={{ width: `${logo.size}px`, height: "auto" }}
            className="filter grayscale opacity-70 hover:opacity-100 transition-opacity drop-shadow-sm"
          />
        </motion.div>
      ))}

      {/* Central 3D Interactive Emblem with Atmospheric Halo */}
      <motion.div
        className="relative pointer-events-auto cursor-pointer flex items-center justify-center"
        style={{
          perspective: 1200,
          rotateX,
          rotateY,
        }}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        {/* Soft Blue Atmospheric Halo */}
        <div
          className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full -z-10 pointer-events-none transition-transform duration-700"
          style={{
            background: "radial-gradient(circle, rgba(15, 103, 255, 0.22) 0%, rgba(15, 103, 255, 0.05) 55%, transparent 75%)",
            filter: "blur(24px)",
          }}
        />

        {/* Floating Emblem Container with Click-Spin inertia */}
        <motion.div
          animate={{
            rotate: spinDeg - 22, // -22deg signature tilt matching reference
            y: [0, -10, 0],
          }}
          transition={{
            rotate: { type: "spring", damping: 14, stiffness: 60 },
            y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo/entice-logo.png"
            alt="Entice Innovations Emblem"
            className="w-48 sm:w-64 md:w-80 h-auto object-contain drop-shadow-[0_24px_45px_rgba(15,103,255,0.20)]"
            priority-attr="true"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── THREE.JS / R3F MESHES ───────────────────────────────────────────────────
function FloatingLogoMesh({
  url,
  position,
  rotationSpeed,
  scale = 1.3,
  opacity = 0.35,
}: {
  url: string;
  position: [number, number, number];
  rotationSpeed: number;
  scale?: number;
  opacity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture(url);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * rotationSpeed * 0.18;
      meshRef.current.rotation.y += delta * rotationSpeed * 0.12;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1.4} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={[scale, scale, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

function CentralEmblemMesh({ onLogoClick }: { onLogoClick?: () => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  const texture = useTexture("/assets/logo/entice-logo.png");
  const [isHovered, setIsHovered] = useState(false);
  const [spinSpeed, setSpinSpeed] = useState(0);
  const spinAngle = useRef(0);
  const { pointer } = useThree();

  const handleClick = () => {
    setSpinSpeed(8.5);
    if (onLogoClick) onLogoClick();
  };

  useFrame((_, delta) => {
    if (groupRef.current) {
      if (spinSpeed > 0.05) {
        spinAngle.current += spinSpeed * delta;
        setSpinSpeed((s) => Math.max(0, s - delta * 4));
      }

      const targetRotX = -pointer.y * 0.35;
      const targetRotY = pointer.x * 0.45 + spinAngle.current;
      const targetRotZ = -0.38 + pointer.x * 0.15;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 4);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 4);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, delta * 4);
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.4}>
      <group
        ref={groupRef}
        onClick={handleClick}
        onPointerOver={() => {
          setIsHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setIsHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <mesh position={[0, 0, -0.08]} scale={[4.6, 4.6, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#0F67FF"
            transparent
            opacity={isHovered ? 0.22 : 0.12}
            depthWrite={false}
          />
        </mesh>

        <mesh scale={[3.4, 3.4, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.98}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

function WebGLSceneContent({ onInteract }: { onInteract?: () => void }) {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-8, -8, -4]} intensity={2.2} color="#0F67FF" />

      {CLIENT_LOGOS.map((item, idx) => (
        <FloatingLogoMesh
          key={idx}
          url={item.url}
          position={item.pos}
          rotationSpeed={item.speed}
          scale={item.scale}
          opacity={item.opacity}
        />
      ))}

      <CentralEmblemMesh onLogoClick={onInteract} />
    </Suspense>
  );
}

// ─── EXPORTED COMPONENT WITH DUAL-ENGINE RESILIENCE ──────────────────────────
export default function EnticeScene({ onInteract }: { onInteract?: () => void }) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setWebglSupported(!!gl);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  const fallbackScene = <CSS3DInteractiveScene onInteract={onInteract} />;

  // If WebGL check is in progress or unsupported, return CSS 3D engine immediately
  if (webglSupported === false) {
    return fallbackScene;
  }

  return (
    <SceneErrorBoundary fallback={fallbackScene}>
      <div className="relative w-full h-full">
        {/* Render CSS 3D scene underneath until WebGL compiles without visual glitch */}
        <div className="absolute inset-0 pointer-events-auto">
          <Canvas
            camera={{ position: [0, 0, 6.2], fov: 46 }}
            className="w-full h-full"
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          >
            <WebGLSceneContent onInteract={onInteract} />
          </Canvas>
        </div>
      </div>
    </SceneErrorBoundary>
  );
}
