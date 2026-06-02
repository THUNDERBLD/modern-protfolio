"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useProgress, Center } from "@react-three/drei";
import * as THREE from "three";
import { Model as CyberWarrior } from "./CyberWarrior";

// A sleek loading indicator while the heavy model loads
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

// Custom component to smoothly move the model based on page scroll
// Optimized to completely eliminate layout thrashing inside the render loop!
function ScrollAnimatedModel({ children }) {
  const group = useRef();
  const scrollPercentRef = useRef(0);
  
  useEffect(() => {
    // Cache layout dimensions to avoid querying them at 60fps
    let maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    
    const handleResize = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    
    const handleScroll = () => {
      // Access scroll position using window.scrollY (cheap)
      const scrollY = window.scrollY;
      scrollPercentRef.current = Math.min(1, Math.max(0, scrollY / maxScroll));
    };
    
    // Use a passive scroll listener (essential for smooth scrolling)
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    
    // Run once on mount
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  useFrame(() => {
    if (!group.current) return;
    
    // Map scroll percentage to Y position
    // startY: model is pushed down to show the head
    // endY: model is pushed up to show the lower body
    const startY = -4.6; 
    const endY = 4.5;
    
    const targetY = startY + (endY - startY) * scrollPercentRef.current;
    
    // Smoothly interpolate to the target position
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05);
  });
  
  return <group ref={group}>{children}</group>;
}

export default function CyberWarriorScene() {
  return (
    // Added pointer-events-none to prevent touch/click capturing (massive scroll boost on mobile)
    <div className="fixed inset-0 z-0 h-screen w-screen bg-[#050707] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        // Set DPR to 1 (perfectly sharp, but saves 2x to 4x GPU calculations on high-res Retina displays)
        dpr={1}
        gl={{ 
          preserveDrawingBuffer: true, 
          alpha: true,
          powerPreference: "high-performance", // Force GPU high-performance mode
          antialias: true
        }}
      >
        {/* Optimized 3-point lighting setup (dramatically faster than Environment map PBR reflection calculations) */}
        <ambientLight intensity={1.4} />
        {/* Key Light (White, from front-right) */}
        <directionalLight position={[5, 5, 4]} intensity={2.5} color="#ffffff" />
        {/* Rim/Accent Light (Cyberpunk Red, from bottom-left) */}
        <directionalLight position={[-5, -3, -4]} intensity={1.8} color="#ff3b3b" />
        {/* Front-Fill Light (Soft Cyan/White, from front-center) */}
        <directionalLight position={[0, 3, 5]} intensity={1.5} color="#d1f4ff" />

        <Suspense fallback={<Loader />}>
          {/* Removed PresentationControls to eliminate spring loops & pointer event calculations */}
          <group>
            {/* 
                Positioned to the right (X=2).
                Initial Y position is handled by ScrollAnimatedModel.
                Rotated to face the camera (towards the user).
            */}
            <Center position={[2, 0, 0]} rotation={[0, Math.PI * 1.35, 0]}>
              <ScrollAnimatedModel>
                {/* Massive scale for the super close-up look */}
                <CyberWarrior scale={6.8} />
              </ScrollAnimatedModel>
            </Center>
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
