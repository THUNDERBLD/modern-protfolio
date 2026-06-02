"use client";

/**
 * CyberHUDOverlay — A futuristic, animated sci-fi HUD background layer.
 *
 * Renders concentric rotating radar rings, a scanning laser line,
 * crosshair markers, grid guides, and telemetry readouts.
 * Everything uses CSS transforms + SVG for hardware-accelerated,
 * zero-layout-thrash rendering at 60 FPS.
 */

export default function CyberHUDOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {/* ─── Micro Dot-Matrix Grid Background ─── */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ─── Horizontal Dashed Grid Lines ─── */}
      {[18, 36, 54, 72, 88].map((top) => (
        <div
          key={`h-${top}`}
          className="absolute left-0 right-0 h-px opacity-[0.07]"
          style={{
            top: `${top}%`,
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 4px, transparent 4px, transparent 16px)",
          }}
        />
      ))}

      {/* ─── Vertical Dashed Grid Lines ─── */}
      {[12, 30, 70, 88].map((left) => (
        <div
          key={`v-${left}`}
          className="absolute top-0 bottom-0 w-px opacity-[0.07]"
          style={{
            left: `${left}%`,
            backgroundImage:
              "repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 4px, transparent 4px, transparent 16px)",
          }}
        />
      ))}

      {/* ─── Scanning Laser Line ─── */}
      <div className="animate-cyber-scan absolute left-0 w-full" style={{ height: "1px" }}>
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,59,59,0.0) 20%, rgba(255,59,59,0.35) 50%, rgba(255,59,59,0.0) 80%, transparent 100%)",
          }}
        />
        {/* Glow halo beneath the laser */}
        <div
          className="absolute left-[20%] right-[20%] h-[6px] -translate-y-1/2 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,59,59,0.5), transparent 70%)",
          }}
        />
      </div>

      {/* ─── Concentric Radar Rings (centered right side to surround the 3D model) ─── */}
      <div className="absolute" style={{ top: "20%", right: "-5%", width: "650px", height: "650px" }}>
        {/* Outer ring — slow clockwise */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full animate-cyber-spin-slow"
          fill="none"
        >
          <circle cx="100" cy="100" r="95" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <circle
            cx="100"
            cy="100"
            r="95"
            stroke="rgba(255,59,59,0.15)"
            strokeWidth="0.8"
            strokeDasharray="8 18"
            className="animate-cyber-dash"
          />
        </svg>

        {/* Middle ring — slow counter-clockwise */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full animate-cyber-spin-reverse"
          fill="none"
        >
          <circle cx="100" cy="100" r="72" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          <circle
            cx="100"
            cy="100"
            r="72"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.6"
            strokeDasharray="4 12"
            className="animate-cyber-dash"
          />
        </svg>

        {/* Inner ring — static with pulse glow */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full animate-cyber-pulse"
          fill="none"
        >
          <circle cx="100" cy="100" r="48" stroke="rgba(255,59,59,0.12)" strokeWidth="0.5" />
        </svg>

        {/* Center dot */}
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/30 animate-cyber-pulse" />
      </div>

      {/* ─── Crosshair Markers (left side) ─── */}
      {[
        { top: "22%", left: "6%" },
        { top: "42%", left: "5.5%" },
        { top: "62%", left: "6%" },
      ].map((pos, i) => (
        <div
          key={`cross-${i}`}
          className="absolute font-cyber-mono text-[10px] text-white/20"
          style={pos}
        >
          {/* Crosshair symbol */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="opacity-40">
            {/* Horizontal */}
            <line x1="0" y1="9" x2="6" y2="9" stroke="currentColor" strokeWidth="0.8" />
            <line x1="12" y1="9" x2="18" y2="9" stroke="currentColor" strokeWidth="0.8" />
            {/* Vertical */}
            <line x1="9" y1="0" x2="9" y2="6" stroke="currentColor" strokeWidth="0.8" />
            <line x1="9" y1="12" x2="9" y2="18" stroke="currentColor" strokeWidth="0.8" />
            {/* Center circle */}
            <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="0.6" fill="none" />
          </svg>
        </div>
      ))}

      {/* ─── Telemetry Readouts (small coordinate texts) ─── */}
      <span className="font-cyber-mono absolute left-[6%] top-[28%] text-[9px] tracking-[0.25em] text-white/10">
        SYS.ACTIVE // 00:14:33
      </span>
      <span className="font-cyber-mono absolute left-[5.5%] top-[48%] text-[9px] tracking-[0.25em] text-white/10">
        NODE.SECURE // ΔX:0.042
      </span>
      <span className="font-cyber-mono absolute left-[6%] top-[68%] text-[9px] tracking-[0.25em] text-white/10">
        GRID.LOCK // Z:7.81
      </span>

      {/* ─── Corner Bracket Marks (top-left & bottom-right) ─── */}
      {/* Top-Left */}
      <div className="absolute left-4 top-20 opacity-15">
        <div className="h-16 w-16 border-l border-t border-white/40" />
      </div>
      {/* Bottom-Right */}
      <div className="absolute right-4 bottom-8 opacity-15">
        <div className="h-16 w-16 border-r border-b border-white/40" />
      </div>

      {/* ─── Dot-Grid Cluster (right side, top) ─── */}
      <div
        className="absolute opacity-[0.08]"
        style={{ top: "8%", right: "18%", width: "60px", height: "60px" }}
      >
        <svg viewBox="0 0 60 60" fill="white">
          {Array.from({ length: 36 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 6) * 10 + 5}
              cy={Math.floor(i / 6) * 10 + 5}
              r="1.2"
            />
          ))}
        </svg>
      </div>

      {/* ─── Dot-Grid Cluster (right side, bottom) ─── */}
      <div
        className="absolute opacity-[0.08]"
        style={{ bottom: "12%", right: "6%", width: "50px", height: "50px" }}
      >
        <svg viewBox="0 0 50 50" fill="white">
          {Array.from({ length: 25 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 5) * 10 + 5}
              cy={Math.floor(i / 5) * 10 + 5}
              r="1"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
