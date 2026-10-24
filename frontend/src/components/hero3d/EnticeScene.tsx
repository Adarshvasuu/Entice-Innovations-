"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ─── CLIENT / PARTNER LOGOS DATA ─────────────────────────────────────────────
const CLIENT_LOGOS = [
  { url: "/assets/logo/urban-tree.png", alt: "Urban Tree", pos: [-3.8, 2.0, -2.5] as [number, number, number], scale: 1.4, opacity: 0.45, speed: 1.2 },
  { url: "/assets/logo/pious-logo.png", alt: "Pious", pos: [3.9, 2.2, -2.0] as [number, number, number], scale: 1.3, opacity: 0.45, speed: -0.9 },
  { url: "/assets/logo/vog-enhanced.png", alt: "VOG", pos: [-4.2, -1.8, -1.8] as [number, number, number], scale: 1.5, opacity: 0.40, speed: 1.4 },
  { url: "/assets/logo/polymers.png", alt: "Polymers", pos: [4.0, -1.7, -2.8] as [number, number, number], scale: 1.3, opacity: 0.38, speed: -1.1 },
  { url: "/assets/logo/make-me-up.png", alt: "Make Me Up", pos: [1.8, 2.6, -3.2] as [number, number, number], scale: 1.2, opacity: 0.32, speed: 0.8 },
  { url: "/assets/logo/vins-aluminiyum.png", alt: "Vins Aluminium", pos: [-2.0, -2.5, -2.6] as [number, number, number], scale: 1.2, opacity: 0.35, speed: -1.3 },
  { url: "/assets/logo/ip-logo.png", alt: "IP Logo", pos: [-4.6, 0.3, -3.4] as [number, number, number], scale: 1.3, opacity: 0.36, speed: 0.95 },
  { url: "/assets/logo/urban-tree.png", alt: "Urban Tree Secondary", pos: [2.9, -0.4, -2.0] as [number, number, number], scale: 1.1, opacity: 0.30, speed: -1.0 },
];

// ─── CSS 3D INTERACTIVE ENGINE (Used as fallback & immediate interactive layer) ─
export function CSS3DInteractiveScene({ onInteract }: { onInteract?: () => void }) {
  const [spinDeg, setSpinDeg] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
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
      {/* Background Floating Client Logos */}
      {CLIENT_LOGOS.map((logo, i) => (
        <motion.div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:block"
          style={{
            left: `${((logo.pos[0] + 5) / 10) * 100}%`,
            top: `${((-logo.pos[1] + 3.5) / 7) * 100}%`,
            opacity: logo.opacity,
          }}
          animate={{
            y: [0, i % 2 === 0 ? 12 : -12, 0],
            rotate: [0, i % 2 === 0 ? 5 : -5, 0],
          }}
          transition={{
            duration: 4.5 + i * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.url}
            alt={logo.alt}
            style={{ width: `${Math.round(logo.scale * 45)}px`, height: "auto" }}
            className="filter grayscale opacity-75 drop-shadow-sm"
          />
        </motion.div>
      ))}

      {/* Central Interactive Emblem */}
      <motion.div
        className="relative pointer-events-auto cursor-pointer flex items-center justify-center"
        style={{
          perspective: 1000,
          rotateX,
          rotateY,
        }}
        onClick={handleClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        {/* Soft Blue Atmospheric Halo */}
        <div
          className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full -z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(15, 103, 255, 0.22) 0%, rgba(15, 103, 255, 0.05) 55%, transparent 75%)",
            filter: "blur(24px)",
          }}
        />

        {/* Floating Emblem Container with Click-Spin inertia */}
        <motion.div
          animate={{
            rotate: spinDeg - 22,
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
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── PURE THREE.JS ENGINE (ZERO REACT-FIBER DEPENDENCIES) ────────────────────
function PureThreeScene({ onInteract }: { onInteract?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    } catch (e) {
      console.warn("WebGL not supported, falling back to CSS 3D:", e);
      return;
    }

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(8, 10, 5);
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x0f67ff, 2.5, 20);
    blueLight.position.set(-6, -6, -3);
    scene.add(blueLight);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // Client Logos Group
    const bgLogosGroup = new THREE.Group();
    scene.add(bgLogosGroup);

    const logoMeshes: {
      mesh: THREE.Mesh;
      basePos: [number, number, number];
      speed: number;
    }[] = [];

    CLIENT_LOGOS.forEach((logo) => {
      textureLoader.load(
        logo.url,
        (texture) => {
          texture.minFilter = THREE.LinearFilter;
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: logo.opacity,
            depthWrite: false,
          });
          const geometry = new THREE.PlaneGeometry(logo.scale, logo.scale);
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(...logo.pos);
          bgLogosGroup.add(mesh);
          logoMeshes.push({ mesh, basePos: logo.pos, speed: logo.speed });
        },
        undefined,
        (err) => console.warn("Logo texture load warning:", logo.url, err)
      );
    });

    // Central Emblem Group
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Atmospheric Blue Halo
    const haloGeometry = new THREE.PlaneGeometry(4.5, 4.5);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0x0f67ff,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    });
    const haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);
    haloMesh.position.set(0, 0, -0.06);
    emblemGroup.add(haloMesh);

    // Center Entice Emblem Mesh
    textureLoader.load("/assets/logo/entice-logo.png", (texture) => {
      texture.minFilter = THREE.LinearFilter;
      const emblemMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.98,
        side: THREE.DoubleSide,
      });
      const emblemGeometry = new THREE.PlaneGeometry(3.3, 3.3);
      const emblemMesh = new THREE.Mesh(emblemGeometry, emblemMaterial);
      emblemGroup.add(emblemMesh);
    });

    // Interaction & Animation State
    const mouse = { x: 0, y: 0 };
    let spinSpeed = 0;
    let spinAngle = 0;
    let animId: number;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const onClick = () => {
      spinSpeed = 8.5;
      if (onInteract) onInteract();
    };

    container.addEventListener("mousemove", onPointerMove, { passive: true });
    container.addEventListener("click", onClick);

    // Resize Handler
    const onResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Spin inertia decay
      if (spinSpeed > 0.05) {
        spinAngle += spinSpeed * delta;
        spinSpeed = Math.max(0, spinSpeed - delta * 4);
      }

      // Smooth pointer following on central emblem
      const targetRotX = -mouse.y * 0.32;
      const targetRotY = mouse.x * 0.42 + spinAngle;
      const targetRotZ = -0.38 + mouse.x * 0.12;

      emblemGroup.rotation.x = THREE.MathUtils.lerp(emblemGroup.rotation.x, targetRotX, delta * 4);
      emblemGroup.rotation.y = THREE.MathUtils.lerp(emblemGroup.rotation.y, targetRotY, delta * 4);
      emblemGroup.rotation.z = THREE.MathUtils.lerp(emblemGroup.rotation.z, targetRotZ, delta * 4);

      // Subtle float motion on emblem
      emblemGroup.position.y = Math.sin(elapsed * 1.8) * 0.08;

      // Animate background client logos
      logoMeshes.forEach(({ mesh, basePos, speed }, idx) => {
        mesh.position.y = basePos[1] + Math.sin(elapsed * 1.4 + idx) * 0.12;
        mesh.rotation.z += delta * speed * 0.15;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("click", onClick);
      renderer.dispose();
    };
  }, [onInteract]);

  return (
    <div ref={containerRef} className="relative w-full h-full pointer-events-auto cursor-pointer">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

// ─── MAIN EXPORT: BULLETPROOF HERO ───────────────────────────────────────────
export default function EnticeScene({ onInteract }: { onInteract?: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <CSS3DInteractiveScene onInteract={onInteract} />;
  }

  return <PureThreeScene onInteract={onInteract} />;
}
