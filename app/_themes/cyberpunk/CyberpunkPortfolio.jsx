"use client";

import { useMemo, useState, useEffect } from "react";
import { BriefcaseBusiness, Code2, ExternalLink, Github, Mail, Menu, Send, Shield, X } from "lucide-react";
import { visibleItems } from "@/lib/fallbackContent";
import CyberWarriorScene from "@/app/_components/CyberWarriorScene";
import CyberHUDOverlay from "@/app/_components/CyberHUDOverlay";
import DecryptText from "@/app/_components/DecryptText";

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

const CyberPanel = ({ children, className = "" }) => (
  <div
    className={`relative border border-white/10 bg-[#080b0c]/90 p-5 ${className}`}
    style={{
      clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
    }}
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

export default function CyberpunkPortfolio({ content }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#Home");

  const settings = content.settings?.cyberpunk || {};
  const accent = settings.accentColor || "#ff3b3b";
  const hero = content.hero || {};
  const about = content.about || {};
  const contact = content.contact || {};
  const projects = visibleItems(content.projects).slice(0, 6);
  const experiences = visibleItems(content.experiences);
  const skills = visibleItems(content.skills).slice(0, 18);
  const socialLinks = visibleItems(content.socialLinks);
  const navItems = content.layout?.navItems || [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Experience", label: "Experience" },
    { href: "#Portofolio", label: "Portfolio" },
    { href: "#Contact", label: "Contact" },
  ];

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

  useEffect(() => {
    const handleScroll = () => {
      // Direct scroll position check with viewport bias offset
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      
      // Auto-reset to Home at the top of the viewport
      if (window.scrollY < 50) {
        setActiveSection("#Home");
        return;
      }

      // Check each section bottom-up to determine the most active visible target
      const sections = navItems.map((item) => ({
        href: item.href,
        element: document.querySelector(item.href),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.element) {
          const top = sec.element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sec.href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial trigger on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <main
      className="min-h-screen overflow-hidden bg-transparent text-white"
      style={{
        "--cyber-accent": accent,
      }}
    >
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

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050707]/95">
        {/* Subtle top horizontal neon border details */}
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent animate-cyber-pulse" />
        
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative">
          
          {/* Brand Logo inside a highly optimized skewed cyberpunk badge */}
          <a 
            href="#Home" 
            onClick={(event) => scrollToSection(event, "#Home")} 
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
            <DecryptText text={hero.statusBadge || "Ready to Innovate"} delay={300} speed={25} />
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
            {about.profilePhotoUrl && <img src={about.profilePhotoUrl} alt={about.name || "Profile"} className="h-80 w-full object-cover grayscale contrast-125" />}
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
            <CyberPanel key={item.id}>
              <BriefcaseBusiness className="mb-4 h-7 w-7 text-red-300" />
              <p className="font-cyber-mono text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">{item.company}</p>
              <h3 className="font-cyber-title mt-2 text-2xl font-black uppercase text-white">{item.role}</h3>
              <p className="font-cyber-mono mt-2 text-xs uppercase tracking-[0.16em] text-red-200">{item.duration}</p>
              <p className="font-cyber-sans mt-4 text-sm leading-relaxed text-zinc-300">{item.summary}</p>
            </CyberPanel>
          ))}
        </div>
      </section>

      <section id="Portofolio" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Archive" title={content.portfolio?.heading || "Portfolio Showcase"} text={content.portfolio?.subheading} delay={200} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <CyberPanel key={project.id} className="flex min-h-[360px] flex-col">
              {project.Img && <img src={project.Img} alt={project.Title} className="mb-5 h-40 w-full object-cover grayscale contrast-125" />}
              <h3 className="font-cyber-title text-2xl font-black uppercase text-white">{project.Title}</h3>
              <p className="font-cyber-sans mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{project.Description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(project.TechStack || []).slice(0, 4).map((tech) => (
                  <span key={tech} className="font-cyber-mono border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-zinc-300">{tech}</span>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                {project.Link && <a href={project.Link} target="_blank" rel="noreferrer" className="text-red-200 hover:text-white"><ExternalLink className="h-5 w-5" /></a>}
                {project.Github && <a href={project.Github} target="_blank" rel="noreferrer" className="text-red-200 hover:text-white"><Github className="h-5 w-5" /></a>}
              </div>
            </CyberPanel>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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

      <footer className="font-cyber-mono relative z-10 border-t border-white/10 px-4 py-8 text-center text-xs uppercase tracking-[0.18em] text-zinc-500">
        <a href={content.layout?.footerLink || "#"} className="hover:text-white">{content.layout?.footerText || "© 2025 THUNDER BLOOD. All Rights Reserved."}</a>
      </footer>
    </main>
  );
}
