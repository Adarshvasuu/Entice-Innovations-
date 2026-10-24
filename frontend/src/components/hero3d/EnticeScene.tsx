"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

// ─── PURE THREE.JS EXTRUDED SVG LOGO SCENE ───────────────────────────────────
export default function EnticeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadError, setLoadError] = useState(false);

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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
    } catch (e) {
      console.warn("WebGL initialization failed, falling back:", e);
      setLoadError(true);
      return;
    }

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.8);

    // Studio Lighting (Soft, balanced, zero harsh glare)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(6, 8, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.0);
    fillLight.position.set(-6, 2, 5);
    scene.add(fillLight);

    const topRim = new THREE.DirectionalLight(0x93c5fd, 1.1);
    topRim.position.set(0, 7, -5);
    scene.add(topRim);

    // Soft Blurred Contact Shadow Underneath (Ground Plane)
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, "rgba(10, 20, 50, 0.22)");
      grad.addColorStop(0.35, "rgba(15, 103, 255, 0.08)");
      grad.addColorStop(0.7, "rgba(15, 103, 255, 0.02)");
      grad.addColorStop(1, "rgba(15, 103, 255, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 1.3),
      new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -1.82, 0);
    scene.add(shadowMesh);

    // Main Logo Container Group
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    const innerGroup = new THREE.Group();
    logoGroup.add(innerGroup);

    // Extruded 3D Mesh Material: Satin Matte Entice Blue with soft sheen, zero glare
    const logoMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0F67FF"),
      emissive: new THREE.Color("#052250"),
      emissiveIntensity: 0.12,
      roughness: 0.48,           // Matte satin finish, no shiny glare
      metalness: 0.14,           // Subtle blue-silver body
      clearcoat: 0.22,           // Soft ambient coat
      clearcoatRoughness: 0.38,
      reflectivity: 0.45,
    });

    // Load and Extrude SVG Paths from entice-logo.svg
    const loader = new SVGLoader();
    loader.load(
      "/assets/logo/entice-logo.svg",
      (data) => {
        data.paths.forEach((path) => {
          const shapes = SVGLoader.createShapes(path);
          shapes.forEach((shape) => {
            const geometry = new THREE.ExtrudeGeometry(shape, {
              depth: 32,
              bevelEnabled: true,
              bevelSegments: 5,
              steps: 1,
              bevelSize: 4.5,
              bevelThickness: 4.5,
            });
            const mesh = new THREE.Mesh(geometry, logoMaterial);
            innerGroup.add(mesh);
          });
        });

        // Compute Bounding Box and Center the Geometry
        const box = new THREE.Box3().setFromObject(innerGroup);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = new THREE.Vector3();
        box.getSize(size);

        // Center inner shapes around (0,0,0)
        innerGroup.position.x = -center.x;
        innerGroup.position.y = -center.y;
        innerGroup.position.z = -center.z;

        // Scale to fit viewport perfectly, flipping Y to render right-side up
        const maxDim = Math.max(size.x, size.y);
        const targetWorldSize = 3.65;
        const scale = targetWorldSize / maxDim;
        logoGroup.scale.set(scale, -scale, scale);
        logoGroup.position.set(0, 0, 0);
      },
      undefined,
      (err) => {
        console.warn("SVG loading warning, using fallback:", err);
        setLoadError(true);
      }
    );

    // Interaction & Animation Loop
    const mouse = { x: 0, y: 0 };
    let animId: number;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });

    const onResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Slow 8-10° automatic yaw drift + subtle pitch
        const autoYaw = Math.sin(elapsed * 0.65) * THREE.MathUtils.degToRad(9.5);
        const autoPitch = Math.cos(elapsed * 0.45) * THREE.MathUtils.degToRad(3.0);
        const autoFloat = Math.sin(elapsed * 1.15) * 0.07;

        // Gentle cursor tilt tracking
        const cursorYaw = mouse.x * THREE.MathUtils.degToRad(9.0);
        const cursorPitch = -mouse.y * THREE.MathUtils.degToRad(6.5);

        const targetRotY = autoYaw + cursorYaw;
        const targetRotX = autoPitch + cursorPitch;

        logoGroup.rotation.y = THREE.MathUtils.lerp(logoGroup.rotation.y, targetRotY, delta * 3.2);
        logoGroup.rotation.x = THREE.MathUtils.lerp(logoGroup.rotation.x, targetRotX, delta * 3.2);
        logoGroup.position.y = autoFloat;

        // Shadow follows breathing float
        shadowMesh.scale.set(1 + autoFloat * 0.35, 1 + autoFloat * 0.35, 1);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onPointerMove);
      renderer.dispose();
      logoMaterial.dispose();
      shadowTexture.dispose();
    };
  }, []);

  if (loadError) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/logo/entice-logo.svg"
          alt="Entice Innovations"
          className="w-56 sm:w-72 md:w-88 h-auto object-contain drop-shadow-[0_20px_40px_rgba(15,103,255,0.18)]"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[440px] md:h-[520px] lg:h-[560px] flex items-center justify-center select-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
