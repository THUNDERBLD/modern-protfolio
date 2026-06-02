"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor({ color = "#00f0ff" }) {
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mouseCoords = useRef({ x: -100, y: -100 });
  const ringCoords = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device supports touch
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };
    checkTouch();

    const moveCursor = (e) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.closest(".cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    let animationFrameId;
    
    const updatePosition = () => {
      const targetX = mouseCoords.current.x;
      const targetY = mouseCoords.current.y;

      // Update inner dot immediately (zero latency)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX - 3}px, ${targetY - 3}px, 0)`;
      }

      // Linear interpolation for outer ring trail (very fast and snappy)
      const ease = 0.22; 
      ringCoords.current.x += (targetX - ringCoords.current.x) * ease;
      ringCoords.current.y += (targetY - ringCoords.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x - 16}px, ${ringCoords.current.y - 16}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hidden]);

  if (isTouchDevice || hidden) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
      {/* Outer Hologram Crosshair Wrapper (Translate only, no CSS transition) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center will-change-transform"
      >
        {/* Inner rotating/scaling element (Scale and Rotate CSS transitions) */}
        <div
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${clicked ? 0.6 : hovered ? 1.4 : 1}) rotate(${hovered ? 90 : 0}deg)`,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" className="overflow-visible">
            {/* Corner brackets */}
            <path d="M 5,11 L 5,5 L 11,5" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.8" />
            <path d="M 27,11 L 27,5 L 21,5" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.8" />
            <path d="M 5,21 L 5,27 L 11,27" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.8" />
            <path d="M 27,21 L 27,27 L 21,27" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.8" />
            
            {/* Rotating lock-on lines on hover */}
            {hovered && (
              <>
                <line x1="16" y1="1" x2="16" y2="4" stroke={color} strokeWidth="1.5" strokeDasharray="1 1" />
                <line x1="16" y1="28" x2="16" y2="31" stroke={color} strokeWidth="1.5" strokeDasharray="1 1" />
                <line x1="1" y1="16" x2="4" y2="16" stroke={color} strokeWidth="1.5" strokeDasharray="1 1" />
                <line x1="28" y1="16" x2="31" y2="16" stroke={color} strokeWidth="1.5" strokeDasharray="1 1" />
                <circle cx="16" cy="16" r="10" fill="none" stroke={color} strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.5" />
              </>
            )}
          </svg>
        </div>
      </div>
    </>
  );
}
