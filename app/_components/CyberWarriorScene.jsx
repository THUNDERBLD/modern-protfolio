"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useProgress, Center } from "@react-three/drei";
import * as THREE from "three";
import { Model as CyberWarrior } from "./CyberWarrior";

// ─── 5 Cinematic Pose Configurations ─────────────────────────────────────────
// Y values are relative to the model's GEOMETRIC CENTER (thanks to <Center>).
//   Y < 0  → camera sees upper body / head
//   Y ≈ 0  → camera sees full body center
//   Y > 0  → camera sees lower body / legs
const SECTION_POSES = {
  Home: {
    // Pose 1: Side profile — helmet, glowing chest plate, shoulder armor
    position: [2, -4.2, -1.5],
    rotation: [0, Math.PI * 1.35, 0],
    scale: 6.8,
  },
  About: {
    // Pose 2: Back view — sweeping tech cape and backpack detail nodes
    position: [2.5, -3.7, -1.0],
    rotation: [-0.08, Math.PI * 2.05, 0],
    scale: 7.0,
  },
  Experience: {
    // Pose 3: Three-quarter back-right — dual red katanas + side armor
    position: [2.2, -4.0, -0.7],
    rotation: [-0.05, Math.PI * 0.45, 0],
    scale: 7.2,
  },
  Portofolio: {
    // Pose 4: Zoomed out profile - mechanical hip armor, sword hilt, core reactor
    position: [2.0, -3.5, -1.0],
    rotation: [0.05, Math.PI * 1.0, 0],
    scale: 7.2,
  },
  Skills: {
    // Pose 5: Front-facing low-angle — arm weapon systems + chest reactor glow
    position: [2.4, -3.5, -0.5],
    rotation: [0.1, Math.PI * 1.6, 0],
    scale: 7.8,
  },
  Contact: {
    // Pose 6: Epic full-body standing shot — entire model visible
    position: [2.0, -1.5, -2.5],
    rotation: [0, Math.PI * 1.05, 0],
    scale: 5.0,
  },
};

// Ordered list for scroll-based lookup
const SECTION_ORDER = ["Home", "About", "Experience", "Portofolio", "Skills", "Contact"];

// ─── Loading Indicator ───────────────────────────────────────────────────────
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-red-500"></div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
          Loading {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
}

// ─── Cinematic Scroll-Driven Model Controller ────────────────────────────────
// Detects active section via scroll position and smoothly lerps the model's
// position, rotation, and scale to the matching pose at 60 FPS.
function CinematicModel({ children }) {
  const group = useRef();
  const activeSectionRef = useRef("Home");

  // High-performance scroll spy: cache section elements' offsetTop values
  // to completely eliminate layout reflow / layout thrashing during scroll events.
  useEffect(() => {
    let sectionElements = [];

    const cacheOffsets = () => {
      sectionElements = SECTION_ORDER.map((id) => {
        const el = document.getElementById(id);
        return el ? { id, offsetTop: el.offsetTop } : null;
      }).filter(Boolean);
    };

    // Cache once initially, and again on image loading / content shifts
    cacheOffsets();
    
    // We run it again after a short delay to ensure dynamic images/content are fully loaded
    const timer = setTimeout(cacheOffsets, 1000);

    window.addEventListener("resize", cacheOffsets, { passive: true });

    const detectActiveSection = () => {
      const scrollY = window.scrollY;
      const viewportBias = window.innerHeight * 0.35;
      const scrollPosition = scrollY + viewportBias;

      if (scrollY < 50) {
        activeSectionRef.current = "Home";
        return;
      }

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const sec = sectionElements[i];
        if (scrollPosition >= sec.offsetTop) {
          activeSectionRef.current = sec.id;
          return;
        }
      }
    };

    window.addEventListener("scroll", detectActiveSection, { passive: true });
    detectActiveSection(); // initial run

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", cacheOffsets);
      window.removeEventListener("scroll", detectActiveSection);
    };
  }, []);

  // Smooth cinematic lerp loop running at 60 FPS inside the Three.js render cycle
  useFrame(() => {
    if (!group.current) return;

    const pose = SECTION_POSES[activeSectionRef.current] || SECTION_POSES.Home;
    const lerpFactor = 0.04; // Lower = smoother & more cinematic

    // Smoothly interpolate position
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pose.position[0], lerpFactor);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, pose.position[1], lerpFactor);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, pose.position[2], lerpFactor);

    // Smoothly interpolate rotation
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pose.rotation[0], lerpFactor);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pose.rotation[1], lerpFactor);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, pose.rotation[2], lerpFactor);

    // Smoothly interpolate uniform scale
    const currentScale = group.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, pose.scale, lerpFactor);
    group.current.scale.set(newScale, newScale, newScale);
  });

  return <group ref={group}>{children}</group>;
}

// ─── Main Scene ──────────────────────────────────────────────────────────────
export default function CyberWarriorScene() {
  return (
    // pointer-events-none prevents touch/click capturing (essential for scroll on mobile)
    <div className="fixed inset-0 z-0 h-screen w-screen bg-[#050707] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        // DPR [1, 1.5] matches performance to screen capability without crushing performance on Retina displays
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          powerPreference: "high-performance",
          antialias: true,
        }}
      >
        {/* Optimized 3-point lighting (faster than Environment map PBR) */}
        <ambientLight intensity={1.4} />
        {/* Key Light (White, front-right) */}
        <directionalLight position={[5, 5, 4]} intensity={2.5} color="#ffffff" />
        {/* Rim/Accent Light (Cyberpunk Red, bottom-left) */}
        <directionalLight position={[-5, -3, -4]} intensity={1.8} color="#ff3b3b" />
        {/* Front-Fill Light (Soft Cyan/White, front-center) */}
        <directionalLight position={[0, 3, 5]} intensity={1.5} color="#d1f4ff" />

        <Suspense fallback={<Loader />}>
          {/*
            CinematicModel handles all position/rotation/scale transitions.
            Center normalizes the model's geometry so (0,0,0) = geometric center,
            making pose Y values predictable (negative = upper body, positive = legs).
          */}
          <CinematicModel>
            <Center>
              <CyberWarrior />
            </Center>
          </CinematicModel>
        </Suspense>
      </Canvas>
    </div>
  );
}
