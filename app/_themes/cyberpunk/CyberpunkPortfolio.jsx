"use client";

import { useMemo, useState, useEffect } from "react";
import { BriefcaseBusiness, Code2, ExternalLink, Github, Mail, Menu, Send, Shield, X, MapPin, CalendarDays, Terminal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { visibleItems } from "@/lib/fallbackContent";
import CyberHUDOverlay from "@/app/_components/CyberHUDOverlay";
import DecryptText from "@/app/_components/DecryptText";
import dynamic from "next/dynamic";

const CyberWarriorScene = dynamic(
  () => import("@/app/_components/CyberWarriorScene"),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import("@/app/_components/CustomCursor"),
  { ssr: false }
);

const resolveAsset = (asset) => {
  if (!asset) return "";
  if (asset.startsWith("http") || asset.startsWith("/")) return asset;
  return `/${asset}`;
};

const SectionHeading = ({ eyebrow, title, text, delay = 0 }) => (
  <div className="mb-8">
    <p className="font-cyber-mono text-xs font-semibold uppercase tracking-[0.35em] text-red-300">
      <DecryptText text={eyebrow} delay={delay} speed={30} />
    </p>
    <h2 className="font-cyber-title mt-3 text-3xl font-black uppercase tracking-wide text-white md:text-5xl">
      <DecryptText text={title} delay={delay + 200} speed={35} hover />
    </h2>
    {text && (
      <p className="font-cyber-sans mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
        {text}
      </p>
    )}
  </div>
);

const CyberPanel = ({ children, className = "", style = {}, ...props }) => (
  <div
    className={`relative border border-white/10 bg-[#080b0c]/90 p-5 ${className}`}
    style={{
      clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
      ...style,
    }}
    {...props}
  >
    {/* Angled top-right corner accent notch */}
    <span className="absolute right-0 top-0 h-[22px] w-px bg-red-500/40" />
    <span className="absolute right-0 top-0 h-px w-[22px] bg-red-500/40" />
    {/* Angled bottom-left corner accent notch */}
    <span className="absolute left-0 bottom-0 h-[22px] w-px bg-red-500/40" />
    <span className="absolute left-0 bottom-0 h-px w-[22px] bg-red-500/40" />
    {/* Left neon glow accent line */}
    <span className="absolute left-0 top-[20%] h-[60%] w-px bg-gradient-to-b from-transparent via-red-500/30 to-transparent" />
    {children}
  </div>
);

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    scaleX: 0.01,
    scaleY: 0.002,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      mass: 0.8,
      delayChildren: 0.25,
      staggerChildren: 0.08,
    },
  },
  exit: {
    scaleY: 0.002,
    scaleX: 0.01,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const ExperienceIntelModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md cursor-pointer"
    >
      <motion.div
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden border border-white/15 bg-[#070b0c]/98 p-6 md:p-8 text-white select-none cursor-default"
        style={{
          clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
          boxShadow: "0 0 40px rgba(0, 240, 255, 0.15)",
        }}
      >
        {/* Futuristic Grid Scanner Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,27,0.92)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,27,0.92)_1px,transparent_1px)] bg-[size:10px_10px] opacity-30 pointer-events-none" />
        
        {/* Hologram top/bottom edge overlay pulse lines */}
        <span className="absolute left-0 top-0 h-[2px] w-[50%] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent animate-pulse" />
        <span className="absolute right-0 bottom-0 h-[2px] w-[50%] bg-gradient-to-l from-transparent via-[#ff3b3b] to-transparent animate-pulse" />

        {/* Diagonal Notch Accents */}
        <span className="absolute right-0 top-0 h-[30px] w-px bg-red-500/40" />
        <span className="absolute right-0 top-0 h-px w-[30px] bg-red-500/40" />
        <span className="absolute left-0 bottom-0 h-[30px] w-px bg-red-500/40" />
        <span className="absolute left-0 bottom-0 h-px w-[30px] bg-red-500/40" />

        {/* Modal Close Icon at Top-Right */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-red-500 hover:rotate-90 transition-all duration-300 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal Content */}
        <div className="relative flex flex-col gap-6">
          
          {/* Header section */}
          <motion.div variants={childVariants} className="border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span 
                className="font-cyber-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#00f0ff] glitch-wrapper"
                data-text="INTEL REPORT // EXP_SEGMENT_0X"
              >
                INTEL REPORT // EXP_SEGMENT_0X
              </span>
              <div className="flex items-center gap-1.5 font-cyber-mono text-[9px] text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" />
                COGNITIVE_ESTABLISHED
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-cyber-mono text-sm font-semibold uppercase tracking-wider text-red-400">
                  {item.company}
                </p>
                <h3 className="font-cyber-title mt-1.5 text-2xl font-black uppercase tracking-wide text-white md:text-3xl">
                  {item.role}
                </h3>
              </div>
              <div className="flex flex-col gap-1.5 items-end font-cyber-mono text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 border border-white/5 bg-white/[0.02] px-2.5 py-1">
                  <CalendarDays className="h-3.5 w-3.5 text-[#00f0ff]" />
                  {item.duration}
                </span>
                <span className="flex items-center gap-1.5 border border-white/5 bg-white/[0.02] px-2.5 py-1">
                  <MapPin className="h-3.5 w-3.5 text-red-400" />
                  {item.location || "Remote"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Description summary */}
          <motion.div variants={childVariants} className="flex flex-col gap-2">
            <h4 className="font-cyber-mono text-xs font-bold uppercase tracking-widest text-[#00f0ff]">
              // OBJECTIVE_OVERVIEW
            </h4>
            <p className="font-cyber-sans text-sm md:text-base leading-relaxed text-zinc-300">
              {item.summary}
            </p>
          </motion.div>

          {/* Key Milestones / Highlights */}
          {item.highlights && item.highlights.length > 0 && (
            <motion.div variants={childVariants} className="flex flex-col gap-3">
              <h4 className="font-cyber-mono text-xs font-bold uppercase tracking-widest text-[#00f0ff]">
                // MISSION_KEY_HIGHLIGHTS
              </h4>
              <ul className="space-y-2.5">
                {item.highlights.map((highlight, idx) => (
                  <motion.li
                    key={idx}
                    variants={childVariants}
                    className="flex items-start gap-3 font-cyber-sans text-sm text-zinc-300 hover:text-white transition-colors duration-300"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Tech Stack used */}
          {item.stack && item.stack.length > 0 && (
            <motion.div variants={childVariants} className="flex flex-col gap-3">
              <h4 className="font-cyber-mono text-xs font-bold uppercase tracking-widest text-[#00f0ff]">
                // COMPILER_STACK_ENV
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-cyber-mono flex items-center gap-1 border border-red-500/20 bg-red-500/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-red-300 hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-300"
                  >
                    <Terminal className="h-3 w-3 text-red-400" />
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Footer action button */}
          <motion.div variants={childVariants} className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="font-cyber-title relative overflow-hidden border border-red-500/30 bg-red-500/10 hover:bg-red-500/25 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-red-200 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              style={{
                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              }}
            >
              TERMINATE_SESSION //
            </button>
          </motion.div>
          
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectIntelModal = ({ item, index, color = { accent: "#00f0ff", glow: "rgba(0, 240, 255, 0.25)" }, onClose }) => {
  if (!item) return null;

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md cursor-pointer"
    >
      <motion.div
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden border border-white/15 bg-[#070b0c]/98 p-6 md:p-8 text-white select-none cursor-default"
        style={{
          clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
          boxShadow: `0 0 40px ${color.glow}`,
          borderColor: `${color.accent}30`,
        }}
      >
        {/* Futuristic Grid Scanner Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,27,0.92)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,27,0.92)_1px,transparent_1px)] bg-[size:10px_10px] opacity-30 pointer-events-none" />
        
        {/* Hologram edge overlay pulse lines */}
        <span className="absolute left-0 top-0 h-[2px] w-[50%] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent animate-pulse" />
        <span className="absolute right-0 bottom-0 h-[2px] w-[50%] bg-gradient-to-l from-transparent via-[#ff3b3b] to-transparent animate-pulse" />

        {/* Diagonal Notch Accents */}
        <span className="absolute right-0 top-0 h-[30px] w-px bg-red-500/40" />
        <span className="absolute right-0 top-0 h-px w-[30px] bg-red-500/40" />
        <span className="absolute left-0 bottom-0 h-[30px] w-px bg-red-500/40" />
        <span className="absolute left-0 bottom-0 h-px w-[30px] bg-red-500/40" />

        {/* Modal Close Icon */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-red-500 hover:rotate-90 transition-all duration-300 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal Content */}
        <div className="relative flex flex-col gap-5 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
          
          {/* Header section */}
          <motion.div variants={childVariants} className="border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span 
                className="font-cyber-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#00f0ff] glitch-wrapper"
                data-text={`PROJECT REPORT // ARC_SEGMENT_0${index + 1}`}
              >
                PROJECT REPORT // ARC_SEGMENT_0{index + 1}
              </span>
              <div className="flex items-center gap-1.5 font-cyber-mono text-[9px] text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" />
                COGNITIVE_ESTABLISHED
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-cyber-title mt-1.5 text-2xl font-black uppercase tracking-wide text-white md:text-3xl">
                  {item.Title}
                </h3>
              </div>
              
              {/* Dynamic Action Buttons */}
              <div className="flex gap-2 font-cyber-mono text-xs">
                {item.Link && (
                  <a
                    href={item.Link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 border border-[#00f0ff]/30 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#00f0ff] transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> LIVE DEMO
                  </a>
                )}
                {item.Github && (
                  <a
                    href={item.Github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-red-300 transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                    style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                  >
                    <Github className="h-3.5 w-3.5" /> SOURCE
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Project Image Preview inside the Modal */}
          {item.Img && (
            <motion.div 
              variants={childVariants} 
              className="relative w-full h-44 md:h-56 overflow-hidden border border-white/10 bg-[#080d0e]"
              style={{
                clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-85 hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundImage: `url(${item.Img})` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,27,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,27,0.4)_1px,transparent_1px)] bg-[size:8px_8px] opacity-30 pointer-events-none" />
              <span className="absolute bottom-2 left-2 font-cyber-mono text-[8px] bg-black/60 px-2 py-0.5 border border-white/5 uppercase tracking-wider text-zinc-400">
                [visual_telemetry_loaded // {item.Title}]
              </span>
            </motion.div>
          )}

          {/* Description summary */}
          <motion.div variants={childVariants} className="flex flex-col gap-2">
            <h4 className="font-cyber-mono text-xs font-bold uppercase tracking-widest text-[#00f0ff]">
              // PROJECT_SPECIFICATION
            </h4>
            <p className="font-cyber-sans text-sm leading-relaxed text-zinc-300">
              {item.Description}
            </p>
          </motion.div>

          {/* Key Features / Highlights */}
          {item.Features && item.Features.length > 0 && (
            <motion.div variants={childVariants} className="flex flex-col gap-3">
              <h4 className="font-cyber-mono text-xs font-bold uppercase tracking-widest text-[#00f0ff]">
                // SYSTEM_MODULES_INTEGRATED
              </h4>
              <ul className="space-y-2">
                {item.Features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    variants={childVariants}
                    className="flex items-start gap-3 font-cyber-sans text-sm text-zinc-300 hover:text-white transition-colors duration-300"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.8)]" style={{ backgroundColor: color.accent }} />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Tech Stack used */}
          {item.TechStack && item.TechStack.length > 0 && (
            <motion.div variants={childVariants} className="flex flex-col gap-3">
              <h4 className="font-cyber-mono text-xs font-bold uppercase tracking-widest text-[#00f0ff]">
                // COMPILED_DEPENDENCIES_LIST
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.TechStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-cyber-mono flex items-center gap-1 border border-red-500/20 bg-red-500/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-300 hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-300"
                    style={{
                      borderColor: `${color.accent}30`,
                      color: color.accent,
                      backgroundColor: `${color.accent}05`,
                    }}
                  >
                    <Terminal className="h-3 w-3" style={{ color: color.accent }} />
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Footer action button */}
          <motion.div variants={childVariants} className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="font-cyber-title relative overflow-hidden border border-red-500/30 bg-red-500/10 hover:bg-red-500/25 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-red-200 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              style={{
                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                borderColor: `${color.accent}40`,
                color: color.accent,
                backgroundColor: `${color.accent}10`,
              }}
            >
              TERMINATE_SESSION //
            </button>
          </motion.div>
          
        </div>
      </motion.div>
    </motion.div>
  );
};

const CertificateIntelModal = ({ item, index, color = { accent: "#00f0ff", glow: "rgba(0, 240, 255, 0.25)" }, onClose }) => {
  if (!item) return null;

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md cursor-pointer"
    >
      <motion.div
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden border border-white/15 bg-[#070b0c]/98 p-6 md:p-8 text-white select-none cursor-default"
        style={{
          clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
          boxShadow: `0 0 40px ${color.glow}`,
          borderColor: `${color.accent}30`,
        }}
      >
        {/* Futuristic Grid Scanner Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,27,0.92)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,27,0.92)_1px,transparent_1px)] bg-[size:10px_10px] opacity-30 pointer-events-none" />
        
        {/* Hologram edge overlay pulse lines */}
        <span className="absolute left-0 top-0 h-[2px] w-[50%] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent animate-pulse" />
        <span className="absolute right-0 bottom-0 h-[2px] w-[50%] bg-gradient-to-l from-transparent via-[#ff3b3b] to-transparent animate-pulse" />

        {/* Diagonal Notch Accents */}
        <span className="absolute right-0 top-0 h-[30px] w-px bg-red-500/40" />
        <span className="absolute right-0 top-0 h-px w-[30px] bg-red-500/40" />
        <span className="absolute left-0 bottom-0 h-[30px] w-px bg-red-500/40" />
        <span className="absolute left-0 bottom-0 h-px w-[30px] bg-red-500/40" />

        {/* Modal Close Icon */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-red-500 hover:rotate-90 transition-all duration-300 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal Content */}
        <div className="relative flex flex-col gap-5 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
          
          {/* Header section */}
          <motion.div variants={childVariants} className="border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span 
                className="font-cyber-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#00f0ff] glitch-wrapper"
                data-text={`CERTIFICATION INTEL // SEC_AUTH_0${index + 1}`}
              >
                CERTIFICATION INTEL // SEC_AUTH_0{index + 1}
              </span>
              <div className="flex items-center gap-1.5 font-cyber-mono text-[9px] text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" />
                VERIFIED_SECURITY_CREDENTIAL
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-cyber-title mt-1.5 text-2xl font-black uppercase tracking-wide text-white md:text-3xl">
                  {item.title}
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Certificate Image Viewport */}
          <motion.div 
            variants={childVariants} 
            className="relative w-full overflow-hidden border border-white/10 bg-[#080d0e] flex items-center justify-center p-2"
            style={{
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
          >
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="max-w-full max-h-[55vh] object-contain rounded-md"
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,27,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,27,0.2)_1px,transparent_1px)] bg-[size:8px_8px] opacity-20 pointer-events-none" />
          </motion.div>

          {/* Footer action button */}
          <motion.div variants={childVariants} className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="font-cyber-title relative overflow-hidden border border-red-500/30 bg-red-500/10 hover:bg-red-500/25 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-red-200 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              style={{
                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                borderColor: `${color.accent}40`,
                color: color.accent,
                backgroundColor: `${color.accent}10`,
              }}
            >
              TERMINATE_SESSION //
            </button>
          </motion.div>
          
        </div>
      </motion.div>
    </motion.div>
  );
};

const CARD_THEMES = [
  { accent: "#00f0ff", glow: "rgba(0, 240, 255, 0.25)" },  // Neon Cyan
  { accent: "#ff0055", glow: "rgba(255, 0, 85, 0.25)" },   // Neon Magenta
  { accent: "#ffaa00", glow: "rgba(255, 170, 0, 0.25)" },  // Cyber Amber
  { accent: "#39ff14", glow: "rgba(57, 255, 20, 0.25)" },  // Toxic Green
  { accent: "#9d4edd", glow: "rgba(157, 78, 221, 0.25)" }, // Dark Violet
  { accent: "#ff5e00", glow: "rgba(255, 94, 0, 0.25)" },   // Plasma Orange
];

export default function CyberpunkPortfolio({ content }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#Home");
  const [logoClicks, setLogoClicks] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("projects");
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [hoveredCertId, setHoveredCertId] = useState(null);

  useEffect(() => {
    if (selectedExperience || selectedProject || selectedCertificate) {
      document.documentElement.classList.add("lenis-stopped");
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
  }, [selectedExperience, selectedProject, selectedCertificate]);

  const settings = content.settings?.cyberpunk || {};
  const accent = settings.accentColor || "#ff3b3b";
  const hero = content.hero || {};
  const about = content.about || {};
  const contact = content.contact || {};
  const projects = visibleItems(content.projects);
  const experiences = visibleItems(content.experiences);
  const skills = visibleItems(content.skills).slice(0, 18);
  const socialLinks = visibleItems(content.socialLinks);
  const certificates = useMemo(() => {
    return visibleItems(content.certificates).map((cert) => {
      if (typeof cert === "string") {
        return { id: cert, title: "Certificate", imageUrl: cert };
      }
      return {
        id: cert.id || cert.imageUrl,
        title: cert.title || "Certificate",
        imageUrl: cert.imageUrl,
      };
    });
  }, [content.certificates]);
  const navItems = useMemo(() => {
    const items = content.layout?.navItems ? [...content.layout.navItems] : [
      { href: "#Home", label: "Home" },
      { href: "#About", label: "About" },
      { href: "#Experience", label: "Experience" },
      { href: "#Portofolio", label: "Portfolio" },
      { href: "#Contact", label: "Contact" },
    ];
    
    // Check if Skills is already in the items array
    const hasSkills = items.some(item => item.href === "#Skills");
    if (!hasSkills) {
      // Find the index of Contact to insert Skills right before it, or push it to the end
      const contactIdx = items.findIndex(item => item.href === "#Contact");
      if (contactIdx !== -1) {
        items.splice(contactIdx, 0, { href: "#Skills", label: "Skills" });
      } else {
        items.push({ href: "#Skills", label: "Skills" });
      }
    }
    
    // Normalize any potential case mismatch for Portofolio
    return items.map(item => {
      if (item.href === "#Portofolio") {
        return { ...item, label: "Portfolio" };
      }
      return item;
    });
  }, [content.layout?.navItems]);

  const modelUrl = settings.sketchfabEmbedUrl || "https://sketchfab.com/models/513c541b1508444eb30e62656e97e621/embed?ui_theme=dark&autostart=1";
  const stats = useMemo(() => ([
    { label: about.stats?.projectsLabel || "Projects", value: visibleItems(content.projects).length },
    { label: about.stats?.experienceLabel || "Experience", value: "3+" },
    { label: about.stats?.certificatesLabel || "Certificates", value: visibleItems(content.certificates).length },
  ]), [about.stats, content.certificates, content.projects]);

  const scrollToSection = (event, href) => {
    event.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      window.scrollTo({ top: section.offsetTop - 82, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setLogoClicks((current) => {
      const nextClicks = current + 1;
      if (nextClicks >= 5) {
        window.location.href = "/faraz-control-room";
        return 0;
      }
      return nextClicks;
    });
    scrollToSection(e, "#Home");
  };

  useEffect(() => {
    if (!logoClicks) return;
    const timer = setTimeout(() => {
      setLogoClicks(0);
    }, 1800);
    return () => clearTimeout(timer);
  }, [logoClicks]);

  useEffect(() => {
    let sectionOffsets = [];

    const cacheOffsets = () => {
      sectionOffsets = navItems.map((item) => {
        const el = document.querySelector(item.href);
        return el ? { href: item.href, offsetTop: el.offsetTop } : null;
      }).filter(Boolean);
    };

    cacheOffsets();
    const timer = setTimeout(cacheOffsets, 1000); // re-cache after images and content stabilize

    window.addEventListener("resize", cacheOffsets, { passive: true });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollPosition = scrollY + window.innerHeight * 0.35;
      
      if (scrollY < 50) {
        setActiveSection("#Home");
        return;
      }

      for (let i = sectionOffsets.length - 1; i >= 0; i--) {
        const sec = sectionOffsets[i];
        if (scrollPosition >= sec.offsetTop) {
          setActiveSection(sec.href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial trigger on mount

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", cacheOffsets);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navItems, showAllProjects]);


  return (
    <main
      className="min-h-screen overflow-hidden bg-transparent text-white custom-cyber-cursor-area"
      style={{
        "--cyber-accent": accent,
      }}
    >
      <CustomCursor color={accent} />
      <CyberWarriorScene />
      <CyberHUDOverlay />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 18%, rgba(255,59,59,0.2), transparent 28%), linear-gradient(180deg, rgba(5,7,7,0.2), rgba(5,7,7,0.92))",
        }}
      />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-px bg-white/30" />

      {/* ─── Vertical Dot Section Navigator ─────────────────────────────── */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-1 hidden md:flex">
        {/* Vertical connecting line */}
        <div className="absolute inset-y-0 w-px bg-white/10" />
        {navItems.map((item) => {
          const isActive = activeSection === item.href;
          return (
            <button
              key={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="group relative z-10 flex flex-col items-center py-4"
              aria-label={`Go to ${item.label}`}
            >
              {/* Dot */}
              <span
                className={`block rounded-full border-2 transition-all duration-500 ${
                  isActive
                    ? "h-5 w-5 border-red-500 bg-white shadow-[0_0_12px_rgba(239,68,68,0.7)]"
                    : "h-3.5 w-3.5 border-white/30 bg-transparent group-hover:border-white/70 group-hover:bg-white/20"
                }`}
              />
              {/* Label tooltip on hover (appears to the right of the dot) */}
              <span
                className={`absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap font-cyber-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? "text-white opacity-100 translate-x-0"
                    : "text-white/50 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050707]/95">
        {/* Subtle top horizontal neon border details */}
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent animate-cyber-pulse" />
        
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative">
          
          {/* Brand Logo inside a highly optimized skewed cyberpunk badge */}
          <a 
            href="#Home" 
            onClick={handleLogoClick} 
            className="font-cyber-title relative block transform -skew-x-12 border border-white/20 bg-white px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-black transition duration-300 hover:bg-black hover:text-white hover:border-red-500/50"
          >
            <span className="block transform skew-x-12">
              {content.layout?.brandName || "Faraz Haider"}
            </span>
          </a>

          {/* Skewed Tech Navigation Links */}
          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => scrollToSection(event, item.href)}
                  className={`font-cyber-mono relative block transform -skew-x-12 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? "bg-white text-black font-black"
                      : "text-zinc-400 hover:text-white border border-transparent hover:border-white/10 hover:bg-white/5"
                  }`}
                >
                  <span className="block transform skew-x-12">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>

          <button type="button" onClick={() => setMenuOpen((current) => !current)} className="rounded border border-white/15 p-2 text-white md:hidden">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Responsive Mobile Skewed Links */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-black/95 px-4 py-4 md:hidden flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => scrollToSection(event, item.href)}
                  className={`font-cyber-mono block transform -skew-x-12 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? "bg-white text-black font-black"
                      : "text-zinc-400 hover:text-white border border-white/5 bg-white/5"
                  }`}
                >
                  <span className="block transform skew-x-12">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>
        )}
      </nav>

      <section id="Home" className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-10 px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="font-cyber-mono mb-5 inline-flex items-center gap-2 border border-red-300/30 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-200">
            <Shield className="h-4 w-4" />
            <span className="glitch-wrapper" data-text={hero.statusBadge || "Ready to Innovate"}>
              <DecryptText text={hero.statusBadge || "Ready to Innovate"} delay={300} speed={25} />
            </span>
          </div>
          <h1 className="font-cyber-title text-5xl font-black uppercase leading-none tracking-wide text-white sm:text-6xl lg:text-7xl">
            <DecryptText text={hero.titleTop || "Full-Stack"} delay={600} speed={50} hover />
            <span className="block" style={{ color: "var(--cyber-accent)" }}>
              <DecryptText text={hero.titleBottom || "Developer"} delay={900} speed={50} hover />
            </span>
          </h1>
          <p className="font-cyber-sans mt-6 max-w-xl text-base leading-relaxed text-zinc-300 md:text-lg">
            {hero.intro || "Software Developer | Proficient in MERN Stack & DevOps | Crafting Quality Web Solutions"}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {(hero.techBadges || []).map((tech) => (
              <span key={tech} className="font-cyber-mono border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-200">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#Portofolio" onClick={(event) => scrollToSection(event, "#Portofolio")} className="font-cyber-title inline-flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white" style={{ backgroundColor: "var(--cyber-accent)", clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
              Projects <ExternalLink className="h-4 w-4" />
            </a>
            <a href="#Contact" onClick={(event) => scrollToSection(event, "#Contact")} className="font-cyber-title inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-white/10" style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
              Contact <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>


      <section id="About" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Identity" title={about.heading || "About Me"} text={about.subtitle || "Transforming ideas into digital experiences"} />
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <CyberPanel>
            {about.profilePhotoUrl && <img src={about.profilePhotoUrl} alt={about.name || "Profile"} className="h-80 w-full object-cover" />}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="border border-white/10 bg-white/5 p-3">
                  <p className="font-cyber-title text-2xl font-black text-white">{stat.value}</p>
                  <p className="font-cyber-mono mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </CyberPanel>
          <CyberPanel className="flex flex-col justify-center">
            <p className="font-cyber-mono text-sm uppercase tracking-[0.28em] text-red-200">{about.introPrefix || "Hey, I'm"}</p>
            <h3 className="font-cyber-title mt-2 text-4xl font-black uppercase text-white">
              <DecryptText text={about.name || "Faraz Haider"} delay={400} speed={40} hover />
            </h3>
            <div className="font-cyber-sans mt-6 space-y-4 text-sm leading-relaxed text-zinc-300 md:text-base">
              {(about.bio || []).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
            {about.resumeLink && (
              <a href={about.resumeLink} target="_blank" rel="noreferrer" className="font-cyber-title mt-7 inline-flex w-fit items-center gap-2 border border-red-300/40 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-red-100 hover:bg-red-500/10" style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                Resume <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </CyberPanel>
        </div>
      </section>

      <section id="Experience" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Timeline" title={content.experienceSection?.heading || "Professional Experience"} text={content.experienceSection?.subheading} delay={100} />
        <div className="grid gap-4 lg:grid-cols-3">
          {experiences.map((item) => (
            <CyberPanel
              key={item.id}
              onClick={() => setSelectedExperience(item)}
              className="cursor-pointer group hover:border-[#00f0ff]/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <BriefcaseBusiness className="mb-4 h-7 w-7 text-red-300 group-hover:text-[#00f0ff] group-hover:scale-110 transition-all duration-300" />
                <span className="font-cyber-mono text-[9px] uppercase tracking-wider text-zinc-500 opacity-60 group-hover:opacity-100 group-hover:text-[#00f0ff] transition-all duration-300">
                  [click for intel]
                </span>
              </div>
              <p className="font-cyber-mono text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300">{item.company}</p>
              <h3 className="font-cyber-title mt-2 text-2xl font-black uppercase text-white group-hover:text-[#00f0ff] transition-colors duration-300">{item.role}</h3>
              <p className="font-cyber-mono mt-2 text-xs uppercase tracking-[0.16em] text-red-200">{item.duration}</p>
              <p className="font-cyber-sans mt-4 text-sm leading-relaxed text-zinc-300 group-hover:text-white transition-colors duration-300">{item.summary}</p>
            </CyberPanel>
          ))}
        </div>
      </section>

      <section id="Portofolio" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Archive" title={content.portfolio?.heading || "Portfolio Showcase"} text={content.portfolio?.subheading} delay={200} />
        
        {/* Cybersecurity / Cyberpunk themed Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button 
            onClick={() => setActiveTab("projects")}
            className={`font-cyber-mono relative transform -skew-x-12 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border cursor-pointer ${
              activeTab === "projects"
                ? "text-white font-black"
                : "text-zinc-400 hover:text-white border-white/10 hover:border-white/20 bg-white/5"
            }`}
            style={{
              backgroundColor: activeTab === "projects" ? accent : "transparent",
              borderColor: activeTab === "projects" ? accent : "rgba(255, 255, 255, 0.1)",
              boxShadow: activeTab === "projects" ? `0 0 15px ${accent}60` : "none",
            }}
          >
            <span className="block transform skew-x-12">
              // ACTIVE_MISSIONS
            </span>
          </button>
          <button 
            onClick={() => setActiveTab("certificates")}
            className={`font-cyber-mono relative transform -skew-x-12 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border cursor-pointer ${
              activeTab === "certificates"
                ? "text-white font-black"
                : "text-zinc-400 hover:text-white border-white/10 hover:border-white/20 bg-white/5"
            }`}
            style={{
              backgroundColor: activeTab === "certificates" ? accent : "transparent",
              borderColor: activeTab === "certificates" ? accent : "rgba(255, 255, 255, 0.1)",
              boxShadow: activeTab === "certificates" ? `0 0 15px ${accent}60` : "none",
            }}
          >
            <span className="block transform skew-x-12">
              // SEC_CREDENTIALS
            </span>
          </button>
        </div>

        {activeTab === "projects" ? (
          (() => {
            const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);
            const leftColProjects = visibleProjects.slice(0, Math.ceil(visibleProjects.length / 2));
            const rightColProjects = visibleProjects.slice(Math.ceil(visibleProjects.length / 2));
            return (
              <>
                <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 max-w-5xl mx-auto py-10 px-2">
                  {/* Column 1 */}
                  <div className="flex flex-col gap-8">
                    {leftColProjects.map((project) => {
                      const globalIdx = projects.indexOf(project);
                      const color = CARD_THEMES[globalIdx % CARD_THEMES.length];
                      const isHovered = hoveredId === project.id;
                      return (
                        <div
                          key={project.id}
                          onMouseEnter={() => setHoveredId(project.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onClick={() => setSelectedProject({ project, index: globalIdx, color })}
                          className="relative h-48 overflow-hidden border bg-[#080d0e]/95 transition-all duration-500 hover:scale-[1.02] group cursor-pointer"
                          style={{
                            transform: "skewY(-6deg)",
                            borderColor: isHovered ? color.accent : "rgba(255, 255, 255, 0.12)",
                            boxShadow: isHovered ? `0 0 25px ${color.glow}` : "none",
                          }}
                        >
                          {/* Left glowing neon colored stripe */}
                          <span
                            className="absolute left-0 top-0 h-full w-[4px] transition-all duration-500"
                            style={{
                              backgroundColor: color.accent,
                              boxShadow: isHovered ? `0 0 15px ${color.accent}` : "none",
                            }}
                          />

                          {/* Technical corner notches */}
                          <span className="absolute top-0 right-0 h-2.5 w-2.5 border-t border-r border-white/20" />
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-white/20" />

                          {/* Background Image */}
                          {project.Img && (
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-20 group-hover:opacity-40 group-hover:scale-105"
                              style={{ backgroundImage: `url(${project.Img})` }}
                            />
                          )}

                          {/* Scanline / Grid overlay */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,27,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,27,0.85)_1px,transparent_1px)] bg-[size:8px_8px] opacity-25 pointer-events-none" />

                          {/* Dark/neon dynamic background gradient */}
                          <div
                            className="absolute inset-0 transition-all duration-500"
                            style={{
                              background: `linear-gradient(90deg, rgba(8,13,14,0.95) 0%, rgba(8,13,14,0.65) 50%, ${isHovered ? color.glow : "rgba(8,13,14,0.2)"} 100%)`,
                            }}
                          />

                          {/* Counter-Skewed Content Container */}
                          <div
                            className="relative h-full w-full flex flex-col justify-between p-6 transition-all duration-500 select-none"
                            style={{ transform: "skewY(6deg)" }}
                          >
                            <div>
                              {/* Top indicator tag */}
                              <div className="flex justify-between items-center">
                                <span className="font-cyber-mono text-[9px] font-bold uppercase tracking-[0.25em]" style={{ color: color.accent }}>
                                  SYS_ACTIVE // 0{globalIdx + 1}
                                </span>
                                <span className="font-cyber-mono text-[9px] uppercase tracking-wider text-zinc-500">
                                  GRID_LOCK // 2.7.01
                                </span>
                              </div>

                              {/* Project Title */}
                              <h3 className="font-cyber-title mt-3.5 text-lg font-black uppercase tracking-wide text-white group-hover:text-white transition-colors duration-300">
                                {project.Title}
                              </h3>

                              {/* Tech badges */}
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {(project.TechStack || []).slice(0, 3).map((tech) => (
                                  <span
                                    key={tech}
                                    className="font-cyber-mono border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-zinc-400"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Bottom: Link Buttons */}
                            <div className="flex justify-between items-end">
                              <div className="flex gap-4 font-cyber-mono text-xs">
                                {project.Link && (
                                  <a
                                    href={project.Link}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="font-cyber-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-300 hover:text-white"
                                    style={{ color: color.accent }}
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" /> DEMO
                                  </a>
                                )}
                                {project.Github && (
                                  <a
                                    href={project.Github}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="font-cyber-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-300 hover:text-white"
                                    style={{ color: color.accent }}
                                  >
                                    <Github className="h-3.5 w-3.5" /> SOURCE
                                  </a>
                                )}
                              </div>

                              <span className="font-cyber-mono text-[9px] uppercase text-zinc-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                [click for details]
                              </span>
                            </div>
                          </div>

                          {/* Absolute Hover specification panel */}
                          <div
                            className="absolute inset-0 flex flex-col justify-between p-6 transition-all duration-500 select-none pointer-events-none"
                            style={{
                              transform: isHovered ? "skewY(6deg) translateY(0)" : "skewY(6deg) translateY(105%)",
                              opacity: isHovered ? 1 : 0,
                              background: `linear-gradient(135deg, rgba(8,13,14,0.98) 0%, ${color.glow} 100%)`,
                              borderLeft: `3px solid ${color.accent}`,
                            }}
                          >
                            <div>
                              <p className="font-cyber-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: color.accent }}>
                                PROJECT_SPECIFICATION //
                              </p>
                              <p className="font-cyber-sans mt-3 text-xs leading-relaxed text-zinc-200">
                                {project.Description}
                              </p>
                            </div>

                            <div className="flex justify-between items-center pointer-events-auto">
                              <span className="font-cyber-mono text-[9px] uppercase text-zinc-500">
                                [click card for info]
                              </span>
                              <div className="flex gap-3">
                                {project.Link && (
                                  <a href={project.Link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-white hover:scale-110 transition-transform">
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                )}
                                {project.Github && (
                                  <a href={project.Github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-white hover:scale-110 transition-transform">
                                    <Github className="h-4 w-4" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Column 2 */}
                  <div className="flex flex-col gap-8">
                    {rightColProjects.map((project) => {
                      const globalIdx = projects.indexOf(project);
                      const color = CARD_THEMES[globalIdx % CARD_THEMES.length];
                      const isHovered = hoveredId === project.id;
                      return (
                        <div
                          key={project.id}
                          onMouseEnter={() => setHoveredId(project.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onClick={() => setSelectedProject({ project, index: globalIdx, color })}
                          className="relative h-48 overflow-hidden border bg-[#080d0e]/95 transition-all duration-500 hover:scale-[1.02] group cursor-pointer"
                          style={{
                            transform: "skewY(-6deg)",
                            borderColor: isHovered ? color.accent : "rgba(255, 255, 255, 0.12)",
                            boxShadow: isHovered ? `0 0 25px ${color.glow}` : "none",
                          }}
                        >
                          {/* Left glowing neon colored stripe */}
                          <span
                            className="absolute left-0 top-0 h-full w-[4px] transition-all duration-500"
                            style={{
                              backgroundColor: color.accent,
                              boxShadow: isHovered ? `0 0 15px ${color.accent}` : "none",
                            }}
                          />

                          {/* Technical corner notches */}
                          <span className="absolute top-0 right-0 h-2.5 w-2.5 border-t border-r border-white/20" />
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-white/20" />

                          {/* Background Image */}
                          {project.Img && (
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-20 group-hover:opacity-40 group-hover:scale-105"
                              style={{ backgroundImage: `url(${project.Img})` }}
                            />
                          )}

                          {/* Scanline / Grid overlay */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,27,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,27,0.85)_1px,transparent_1px)] bg-[size:8px_8px] opacity-25 pointer-events-none" />

                          {/* Dark/neon dynamic background gradient */}
                          <div
                            className="absolute inset-0 transition-all duration-500"
                            style={{
                              background: `linear-gradient(90deg, rgba(8,13,14,0.95) 0%, rgba(8,13,14,0.65) 50%, ${isHovered ? color.glow : "rgba(8,13,14,0.2)"} 100%)`,
                            }}
                          />

                          {/* Counter-Skewed Content Container */}
                          <div
                            className="relative h-full w-full flex flex-col justify-between p-6 transition-all duration-500 select-none"
                            style={{ transform: "skewY(6deg)" }}
                          >
                            <div>
                              {/* Top indicator tag */}
                              <div className="flex justify-between items-center">
                                <span className="font-cyber-mono text-[9px] font-bold uppercase tracking-[0.25em]" style={{ color: color.accent }}>
                                  SYS_ACTIVE // 0{globalIdx + 1}
                                </span>
                                <span className="font-cyber-mono text-[9px] uppercase tracking-wider text-zinc-500">
                                  GRID_LOCK // 2.7.01
                                </span>
                              </div>

                              {/* Project Title */}
                              <h3 className="font-cyber-title mt-3.5 text-lg font-black uppercase tracking-wide text-white group-hover:text-white transition-colors duration-300">
                                {project.Title}
                              </h3>

                              {/* Tech badges */}
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {(project.TechStack || []).slice(0, 3).map((tech) => (
                                  <span
                                    key={tech}
                                    className="font-cyber-mono border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-zinc-400"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Bottom: Link Buttons */}
                            <div className="flex justify-between items-end">
                              <div className="flex gap-4 font-cyber-mono text-xs">
                                {project.Link && (
                                  <a
                                    href={project.Link}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="font-cyber-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-300 hover:text-white"
                                    style={{ color: color.accent }}
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" /> DEMO
                                  </a>
                                )}
                                {project.Github && (
                                  <a
                                    href={project.Github}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="font-cyber-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-300 hover:text-white"
                                    style={{ color: color.accent }}
                                  >
                                    <Github className="h-3.5 w-3.5" /> SOURCE
                                  </a>
                                )}
                              </div>

                              <span className="font-cyber-mono text-[9px] uppercase text-zinc-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                [click for details]
                              </span>
                            </div>
                          </div>

                          {/* Absolute Hover specification panel */}
                          <div
                            className="absolute inset-0 flex flex-col justify-between p-6 transition-all duration-500 select-none pointer-events-none"
                            style={{
                              transform: isHovered ? "skewY(6deg) translateY(0)" : "skewY(6deg) translateY(105%)",
                              opacity: isHovered ? 1 : 0,
                              background: `linear-gradient(135deg, rgba(8,13,14,0.98) 0%, ${color.glow} 100%)`,
                              borderLeft: `3px solid ${color.accent}`,
                            }}
                          >
                            <div>
                              <p className="font-cyber-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: color.accent }}>
                                PROJECT_SPECIFICATION //
                              </p>
                              <p className="font-cyber-sans mt-3 text-xs leading-relaxed text-zinc-200">
                                {project.Description}
                              </p>
                            </div>

                            <div className="flex justify-between items-center pointer-events-auto">
                              <span className="font-cyber-mono text-[9px] uppercase text-zinc-500">
                                [click card for info]
                              </span>
                              <div className="flex gap-3">
                                {project.Link && (
                                  <a href={project.Link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-white hover:scale-110 transition-transform">
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                )}
                                {project.Github && (
                                  <a href={project.Github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-white hover:scale-110 transition-transform">
                                    <Github className="h-4 w-4" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {projects.length > 4 && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => {
                        setShowAllProjects(!showAllProjects);
                        setTimeout(() => {
                          window.dispatchEvent(new Event("resize"));
                        }, 80);
                      }}
                      className="font-cyber-title relative overflow-hidden border border-[#00f0ff]/30 bg-[#080d0e]/60 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-[#00f0ff] transition-all duration-300 hover:border-[#00f0ff] hover:bg-[#00f0ff]/15 hover:text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] active:scale-95 cursor-pointer"
                      style={{
                        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                        borderColor: `${accent}40`,
                        color: accent,
                      }}
                    >
                      <span className="flex items-center gap-2 font-black">
                        {showAllProjects ? "COLLAPSE ARCHIVE // <<" : "LOAD MORE INTEL // >>"}
                      </span>
                    </button>
                  </div>
                )}
              </>
            );
          })()
        ) : (
          (() => {
            const visibleCertificates = showAllCertificates ? certificates : certificates.slice(0, 6);
            return (
              <>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto py-10 px-2">
                  {visibleCertificates.map((cert, index) => {
                    const color = CARD_THEMES[index % CARD_THEMES.length];
                    const isHovered = hoveredCertId === cert.id;
                    return (
                      <div
                        key={cert.id}
                        onMouseEnter={() => setHoveredCertId(cert.id)}
                        onMouseLeave={() => setHoveredCertId(null)}
                        onClick={() => setSelectedCertificate({ cert, index, color })}
                        className="relative overflow-hidden border bg-[#080d0e]/95 transition-all duration-500 hover:scale-[1.02] group cursor-pointer"
                        style={{
                          transform: "skewY(-6deg)",
                          borderColor: isHovered ? color.accent : "rgba(255, 255, 255, 0.12)",
                          boxShadow: isHovered ? `0 0 25px ${color.glow}` : "none",
                        }}
                      >
                        {/* Left glowing neon colored stripe */}
                        <span
                          className="absolute left-0 top-0 h-full w-[4px] transition-all duration-500"
                          style={{
                            backgroundColor: color.accent,
                            boxShadow: isHovered ? `0 0 15px ${color.accent}` : "none",
                          }}
                        />

                        {/* Technical corner notches */}
                        <span className="absolute top-0 right-0 h-2.5 w-2.5 border-t border-r border-white/20" />
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-white/20" />

                        {/* Background Image */}
                        {cert.imageUrl && (
                          <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-[#080d0e]">
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-60 group-hover:opacity-90 group-hover:scale-105"
                              style={{ backgroundImage: `url(${cert.imageUrl})` }}
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,27,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,27,0.4)_1px,transparent_1px)] bg-[size:8px_8px] opacity-25 pointer-events-none" />
                          </div>
                        )}

                        {/* Counter-Skewed Content Container */}
                        <div
                          className="relative flex flex-col justify-between p-4 transition-all duration-500 select-none"
                          style={{ transform: "skewY(6deg)" }}
                        >
                          <div>
                            {/* Top indicator tag */}
                            <div className="flex justify-between items-center">
                              <span className="font-cyber-mono text-[8px] font-bold uppercase tracking-[0.25em]" style={{ color: color.accent }}>
                                SEC_VERIFIED // 0{index + 1}
                              </span>
                              <span className="font-cyber-mono text-[8px] uppercase tracking-wider text-zinc-500">
                                AUTH_DONE
                              </span>
                            </div>

                            {/* Certificate Title */}
                            <h3 className="font-cyber-title mt-2 text-sm font-black uppercase tracking-wide text-white transition-colors duration-300">
                              {cert.title}
                            </h3>
                          </div>

                          {/* Bottom action link */}
                          <div className="flex justify-between items-center mt-4">
                            <span 
                              className="font-cyber-mono text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 transition-colors duration-300"
                              style={{ color: color.accent }}
                            >
                              <ExternalLink className="h-3 w-3" /> VIEW INTEL
                            </span>
                            <span className="font-cyber-mono text-[8px] uppercase text-zinc-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                              [click to scan]
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {certificates.length > 6 && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => {
                        setShowAllCertificates(!showAllCertificates);
                        setTimeout(() => {
                          window.dispatchEvent(new Event("resize"));
                        }, 80);
                      }}
                      className="font-cyber-title relative overflow-hidden border border-[#00f0ff]/30 bg-[#080d0e]/60 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-[#00f0ff] transition-all duration-300 hover:border-[#00f0ff] hover:bg-[#00f0ff]/15 hover:text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] active:scale-95 cursor-pointer"
                      style={{
                        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                        borderColor: `${accent}40`,
                        color: accent,
                      }}
                    >
                      <span className="flex items-center gap-2 font-black">
                        {showAllCertificates ? "COLLAPSE ARCHIVE // <<" : "LOAD MORE CREDENTIALS // >>"}
                      </span>
                    </button>
                  </div>
                )}
              </>
            );
          })()
        )}
      </section>

      <section id="Skills" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Stack" title="Cyber Ops Toolkit" text="A compact scan of the tools and technologies behind the build." delay={300} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="border border-white/10 bg-white/[0.04] p-4 text-center"
              style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
            >
              {skill.icon ? <img src={resolveAsset(skill.icon)} alt={skill.language} className="mx-auto mb-3 h-9 w-9 object-contain" /> : <Code2 className="mx-auto mb-3 h-9 w-9 text-red-300" />}
              <p className="font-cyber-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">{skill.language}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="Contact" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Signal" title={contact.heading || "Contact Me"} text={contact.subheading} delay={400} />
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <CyberPanel>
            <h3 className="font-cyber-title text-3xl font-black uppercase text-white">
              <DecryptText text={contact.cardTitle || "Get in Touch"} delay={500} speed={35} hover />
            </h3>
            <p className="font-cyber-sans mt-4 text-sm leading-relaxed text-zinc-300">{contact.cardText || "Have something to discuss? Send me a message and let's talk."}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="font-cyber-mono border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300 hover:bg-white/10" style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}>
                  {link.name}
                </a>
              ))}
            </div>
          </CyberPanel>
          <CyberPanel>
            <form action={contact.formAction || "https://formsubmit.co/ayanalihaider9@gmail.com"} method="POST" className="space-y-4">
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input name="name" required placeholder="Name" className="font-cyber-sans w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-300" />
              <input name="email" required type="email" placeholder="Email" className="font-cyber-sans w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-300" />
              <textarea name="message" required placeholder="Message" className="font-cyber-sans h-36 w-full resize-none border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-300" />
              <button type="submit" className="font-cyber-title inline-flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white" style={{ backgroundColor: "var(--cyber-accent)", clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                Send <Send className="h-4 w-4" />
              </button>
            </form>
          </CyberPanel>
        </div>
      </section>

      <AnimatePresence>
        {selectedExperience && (
          <ExperienceIntelModal
            item={selectedExperience}
            onClose={() => setSelectedExperience(null)}
          />
        )}
        {selectedProject && (
          <ProjectIntelModal
            item={selectedProject.project}
            index={selectedProject.index}
            color={selectedProject.color}
            onClose={() => setSelectedProject(null)}
          />
        )}
        {selectedCertificate && (
          <CertificateIntelModal
            item={selectedCertificate.cert}
            index={selectedCertificate.index}
            color={selectedCertificate.color}
            onClose={() => setSelectedCertificate(null)}
          />
        )}
      </AnimatePresence>

      <footer className="font-cyber-mono relative z-10 border-t border-white/10 px-4 py-8 text-center text-xs uppercase tracking-[0.18em] text-zinc-500">
        <a href={content.layout?.footerLink || "#"} className="hover:text-white">{content.layout?.footerText || "© 2025 THUNDER BLOOD. All Rights Reserved."}</a>
      </footer>
    </main>
  );
}
