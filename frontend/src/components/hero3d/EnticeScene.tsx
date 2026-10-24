"use client";

import * as THREE from "three";
import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";

// Floating background logo particle
function BackgroundFloatingLogo({
  url,
  position,
  rotationSpeed,
  scale = 1.2,
}: {
  url: string;
  position: [number, number, number];
  rotationSpeed: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture(url);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * rotationSpeed * 0.15;
      meshRef.current.rotation.y += delta * rotationSpeed * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh ref={meshRef} position={position} scale={[scale, scale, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

// Hero Central Interactive Entice Emblem
function CentralHeroEmblem() {
  const meshRef = useRef<THREE.Group>(null!);
  const texture = useTexture("/assets/logo/entice-logo.svg");
  const [clicked, setClicked] = useState(false);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Smooth interactive cursor tracking
      const targetRotX = -pointer.y * 0.4;
      const targetRotY = pointer.x * 0.5 + (clicked ? Math.PI * 2 : 0);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, delta * 3);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 4);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <group
        ref={meshRef}
        onClick={() => setClicked(!clicked)}
        className="cursor-pointer"
      >
        {/* Glow halo behind logo */}
        <mesh position={[0, 0, -0.1]} scale={[4.2, 4.2, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#0F67FF"
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </mesh>

        {/* Central Logo Plane */}
        <mesh scale={[3.2, 3.2, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.96}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function EnticeScene() {
  const bgLogos = useMemo(
    () => [
      { url: "/assets/logo/urban tree.svg", pos: [-5, 2.5, -4] as [number, number, number], speed: 0.8, scale: 1.8 },
      { url: "/assets/logo/pious logo.svg", pos: [5.2, 3, -3.5] as [number, number, number], speed: -0.7, scale: 1.6 },
      { url: "/assets/logo/VOG-enhanced-final.svg", pos: [-5.5, -2.5, -3] as [number, number, number], speed: 0.9, scale: 1.9 },
      { url: "/assets/logo/polymers.svg", pos: [5.5, -2.2, -4.5] as [number, number, number], speed: -0.6, scale: 1.7 },
      { url: "/assets/logo/make me up.svg", pos: [2.5, 4, -5] as [number, number, number], speed: 0.5, scale: 1.5 },
      { url: "/assets/logo/vins aluminiyum.svg", pos: [-2.8, -3.8, -4] as [number, number, number], speed: -0.8, scale: 1.6 },
      { url: "/assets/logo/IP LOGOb.svg", pos: [-6, 0.2, -5] as [number, number, number], speed: 0.6, scale: 1.8 },
    ],
    []
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 48 }}
      className="w-full h-full"
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={2} color="#0F67FF" />

      {/* Floating client and partner logos in depth */}
      {bgLogos.map((item, idx) => (
        <BackgroundFloatingLogo
          key={idx}
          url={item.url}
          position={item.pos}
          rotationSpeed={item.speed}
          scale={item.scale}
        />
      ))}

      {/* Hero interactive emblem */}
      <CentralHeroEmblem />
    </Canvas>
  );
}
