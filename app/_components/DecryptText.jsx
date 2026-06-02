"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * DecryptText — A cinematic text-reveal component.
 *
 * On mount (and optionally on hover), the displayed text scrambles through
 * random cyber-glyphs before resolving character-by-character to the
 * final value, producing a high-end hacker / code-decryption effect.
 *
 * Props:
 *   text       — The final string to display.
 *   delay      — Milliseconds before the animation starts (default 0).
 *   speed      — Milliseconds per character resolve (default 40).
 *   hover      — If true, re-triggers the scramble on hover (default false).
 *   className  — Passed through to the wrapping <span>.
 *   as         — HTML tag to render (default "span").
 */

const GLYPHS = "01XΔΣ¥[]{}|/<>!@#$%^&*_-+=?αβγδ";

function getRandomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

export default function DecryptText({
  text = "",
  delay = 0,
  speed = 40,
  hover = true,
  className = "",
  as: Tag = "span",
}) {
  // Initialize to fully scrambled/encrypted text
  const [display, setDisplay] = useState(() =>
    text.split("").map((char) => (char === " " ? " " : getRandomGlyph())).join("")
  );
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // Keep scrambled display in sync with text prop changes
  useEffect(() => {
    setDisplay(
      text.split("").map((char) => (char === " " ? " " : getRandomGlyph())).join("")
    );
  }, [text]);

  const runDecrypt = useCallback(() => {
    // Clear any existing animation
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    let resolved = 0;
    const chars = text.split("");

    // Start with fully scrambled text
    setDisplay(chars.map((char) => (char === " " ? " " : getRandomGlyph())).join(""));

    intervalRef.current = setInterval(() => {
      resolved++;
      setDisplay(
        chars
          .map((char, i) => {
            if (i < resolved) return char; // Resolved characters
            if (char === " ") return " "; // Preserve spaces
            return getRandomGlyph(); // Still scrambling
          })
          .join("")
      );

      if (resolved >= chars.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, speed);
  }, [text, speed]);

  // Dedicated cleanup for interval and timeout on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (hover) runDecrypt();
  };

  return (
    <Tag
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: "inline" }}
    >
      {display || text}
    </Tag>
  );
}
