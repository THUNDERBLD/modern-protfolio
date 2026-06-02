"use client";

import { useEffect } from "react";
import { BriefcaseBusiness, CalendarDays, MapPin, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePortfolioContent } from "@/lib/usePortfolioContent";
import { visibleItems } from "@/lib/fallbackContent";

const ExperienceCard = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className="relative grid gap-5 md:grid-cols-[minmax(0,0.9fr)_56px_minmax(0,1.6fr)] md:gap-8"
      data-aos={isEven ? "fade-up-right" : "fade-up-left"}
      data-aos-duration="900"
    >
      <div className="hidden md:flex md:items-start md:justify-end">
        <div className="max-w-sm text-right">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <CalendarDays className="h-4 w-4 text-purple-300" />
            {item.duration}
          </div>
          <div className="mt-3 flex items-center justify-end gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            {item.location}
          </div>
        </div>
      </div>

      <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-purple-500/0 via-purple-500/60 to-purple-500/0 md:relative md:left-auto md:top-auto md:flex md:w-full md:justify-center md:bg-none">
        <span className="hidden md:block absolute top-0 h-full w-px bg-gradient-to-b from-purple-500/0 via-purple-500/60 to-purple-500/0" />
        <div className="relative z-10 ml-[-9px] flex h-9 w-9 items-center justify-center rounded-full border border-purple-400/30 bg-[#09031b] shadow-[0_0_35px_rgba(168,85,247,0.35)] md:ml-0">
          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7]" />
        </div>
      </div>

      <article className="ml-12 overflow-hidden rounded-2xl border border-white/10 bg-[#05000d]/45 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-purple-500/10 md:ml-0 md:p-6">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#6366f1]/10 via-transparent to-[#a855f7]/10 opacity-60" />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-300">{item.company}</p>
            <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">{item.role}</h3>
          </div>
          <div className="flex flex-wrap gap-2 md:hidden">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{item.duration}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{item.location}</span>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">
          {item.summary}
        </p>

        <ul className="mt-5 space-y-3">
          {(item.highlights || []).map((highlight, highlightIndex) => (
            <li key={highlightIndex} className="flex gap-3 text-sm leading-relaxed text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-300 shadow-[0_0_12px_rgba(216,180,254,0.7)]" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {(item.stack || []).map((tech) => (
            <span key={tech} className="rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200">
              {tech}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
};

export default function ExperiencePage() {
  const { content } = usePortfolioContent();
  const section = content.experienceSection || {};
  const experiences = visibleItems(content.experiences);

  useEffect(() => {
    AOS.init({ once: false, offset: 80 });
  }, []);

  if (!experiences.length) {
    return null;
  }

  return (
    <section id="Experience" className="relative px-[5%] py-20 text-white sm:px-[6%] lg:px-[8%]">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center" data-aos="fade-up" data-aos-duration="800">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-purple-200">
            <BriefcaseBusiness className="h-4 w-4" />
            Work Timeline
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] md:text-5xl">
            {section.heading || "Professional Experience"}
          </h2>
          <p className="mx-auto mt-3 flex max-w-3xl items-center justify-center gap-2 text-sm leading-relaxed text-slate-400 md:text-base">
            <Sparkles className="hidden h-4 w-4 text-purple-300 sm:block" />
            {section.subheading || "A focused timeline of the teams, systems, and production work that shaped my engineering practice."}
            <Sparkles className="hidden h-4 w-4 text-purple-300 sm:block" />
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {experiences.map((item, index) => (
            <ExperienceCard key={item.id || index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
