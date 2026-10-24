"use client";

import * as THREE from "three";
import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";

// Floating background client/partner logo in depth
function FloatingBackgroundLogo({
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

// Hero Central Interactive Entice Emblem
function CentralInteractiveEmblem({
  onLogoClick,
}: {
  onLogoClick?: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const texture = useTexture("/assets/logo/entice-logo.svg");
  const [isHovered, setIsHovered] = useState(false);
  const [spinSpeed, setSpinSpeed] = useState(0);
  const spinAngle = useRef(0);
  const { pointer } = useThree();

  const handleClick = () => {
    // Add extra spin impulse on click
    setSpinSpeed(8.5);
    if (onLogoClick) onLogoClick();
  };

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Natural inertia decay for click spin
      if (spinSpeed > 0.05) {
        spinAngle.current += spinSpeed * delta;
        setSpinSpeed((s) => Math.max(0, s - delta * 4));
      }

      // Smooth pointer following
      const targetRotX = -pointer.y * 0.35;
      const targetRotY = pointer.x * 0.45 + spinAngle.current;
      const targetRotZ = -0.38 + pointer.x * 0.15; // Signature tilt angle matching the reference

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
        {/* Soft atmospheric halo */}
        <mesh position={[0, 0, -0.08]} scale={[4.6, 4.6, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#0F67FF"
            transparent
            opacity={isHovered ? 0.22 : 0.12}
            depthWrite={false}
          />
        </mesh>

        {/* Foreground Logo Emblem */}
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

export default function EnticeScene({
  onInteract,
}: {
  onInteract?: () => void;
}) {
  const bgLogos = useMemo(
    () => [
      { url: "/assets/logo/urban tree.svg", pos: [-5.2, 2.8, -3.8] as [number, number, number], speed: 0.7, scale: 1.9, opacity: 0.38 },
      { url: "/assets/logo/pious logo.svg", pos: [5.2, 3.2, -3.2] as [number, number, number], speed: -0.6, scale: 1.7, opacity: 0.4 },
      { url: "/assets/logo/VOG-enhanced-final.svg", pos: [-5.6, -2.6, -3] as [number, number, number], speed: 0.85, scale: 2.1, opacity: 0.35 },
      { url: "/assets/logo/polymers.svg", pos: [5.4, -2.4, -4.2] as [number, number, number], speed: -0.5, scale: 1.8, opacity: 0.32 },
      { url: "/assets/logo/make me up.svg", pos: [2.2, 3.8, -4.8] as [number, number, number], speed: 0.6, scale: 1.6, opacity: 0.28 },
      { url: "/assets/logo/vins aluminiyum.svg", pos: [-2.6, -3.6, -3.8] as [number, number, number], speed: -0.7, scale: 1.7, opacity: 0.3 },
      { url: "/assets/logo/IP LOGOb.svg", pos: [-6.2, 0.4, -4.6] as [number, number, number], speed: 0.55, scale: 1.8, opacity: 0.32 },
      { url: "/assets/logo/urban tree.svg", pos: [3.8, -0.6, -2.8] as [number, number, number], speed: -0.8, scale: 1.4, opacity: 0.25 },
    ],
    []
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 46 }}
      className="w-full h-full"
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-8, -8, -4]} intensity={2.2} color="#0F67FF" />

      {/* Floating Partner/Client Logos in 3D Depth */}
      {bgLogos.map((item, idx) => (
        <FloatingBackgroundLogo
          key={idx}
          url={item.url}
          position={item.pos}
          rotationSpeed={item.speed}
          scale={item.scale}
          opacity={item.opacity}
        />
      ))}

      {/* Centerpiece Hero Emblem */}
      <CentralInteractiveEmblem onLogoClick={onInteract} />
    </Canvas>
  );
}
