"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, ImagePlus, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { fallbackContent, normalizeContent } from "@/lib/fallbackContent";

const sections = ["Modes", "Hero", "About", "Experience", "Projects", "Certificates", "Skills", "Social", "Contact", "Layout"];

const blankProject = () => ({
  id: String(Date.now()),
  Title: "New Project",
  Description: "",
  Img: "",
  Link: "",
  Github: "",
  TechStack: [],
  Features: [],
  visible: true,
  order: 999,
});

const blankExperience = () => ({
  id: `experience-${Date.now()}`,
  company: "New Company",
  role: "Role Title",
  duration: "Month Year - Present",
  location: "Remote",
  summary: "",
  highlights: [],
  stack: [],
  visible: true,
  order: 999,
});

const blankCertificate = () => ({
  id: `cert-${Date.now()}`,
  title: "New Certificate",
  imageUrl: "",
  visible: true,
  order: 999,
});

const blankSkill = () => ({
  id: `skill-${Date.now()}`,
  icon: "",
  language: "New Skill",
  visible: true,
  order: 999,
});

const blankSocial = () => ({
  id: `social-${Date.now()}`,
  name: "GitHub",
  displayName: "Github",
  subText: "",
  url: "",
  color: "#ffffff",
  gradient: "from-[#333] to-[#24292e]",
  isPrimary: false,
  visible: true,
  order: 999,
});

const TextInput = ({ label, value, onChange, multiline = false, type = "text", placeholder = "" }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span>
    {multiline ? (
      <textarea
        value={value || ""}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-28 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none transition focus:border-purple-400"
      />
    ) : (
      <input
        type={type}
        value={value || ""}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none transition focus:border-purple-400"
      />
    )}
  </label>
);

const StringListEditor = ({ label, value = [], onChange, placeholder }) => (
  <TextInput
    label={label}
    value={value.join("\n")}
    multiline
    onChange={(next) => onChange(next.split("\n").map((item) => item.trim()).filter(Boolean))}
    placeholder={placeholder}
  />
);

const UploadField = ({ label, value, onChange, folder = "modern-portfolio" }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file) => {
    if (!file) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.message || "Upload failed.");
      setUploading(false);
      return;
    }

    const data = await response.json();
    onChange(data.url, data.publicId);
    setUploading(false);
  };

  return (
    <div className="space-y-3">
      <TextInput label={label} value={value} onChange={(next) => onChange(next)} />
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
          <ImagePlus className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload Image"}
          <input type="file" accept="image/*" className="hidden" onChange={(event) => upload(event.target.files?.[0])} />
        </label>
        {value && <img src={value} alt="" className="h-14 w-20 rounded-lg object-cover ring-1 ring-white/10" />}
        {error && <span className="text-sm text-red-300">{error}</span>}
      </div>
    </div>
  );
};

const Panel = ({ title, children }) => (
  <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl">
    <h2 className="mb-5 text-xl font-bold text-white">{title}</h2>
    <div className="space-y-5">{children}</div>
  </section>
);

export default function AdminDashboardPage() {
  const [content, setContent] = useState(() => normalizeContent(fallbackContent));
  const [active, setActive] = useState("Hero");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      const response = await fetch("/api/admin/content", { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        setContent(normalizeContent(data.content));
      }
      setLoading(false);
    };

    loadContent();
  }, []);

  useEffect(() => {
    const beforeUnload = (event) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [dirty]);

  const visibleCounts = useMemo(() => ({
    projects: content.projects.filter((item) => item.visible !== false).length,
    experiences: content.experiences.filter((item) => item.visible !== false).length,
    certificates: content.certificates.filter((item) => item.visible !== false).length,
    skills: content.skills.filter((item) => item.visible !== false).length,
  }), [content]);

  const updateContent = (updater) => {
    setContent((previous) => normalizeContent(typeof updater === "function" ? updater(previous) : updater));
    setDirty(true);
    setStatus("");
  };

  const updateSection = (section, key, value) => {
    updateContent((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [key]: value,
      },
    }));
  };

  const updateNested = (section, parentKey, key, value) => {
    updateContent((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [parentKey]: {
          ...previous[section]?.[parentKey],
          [key]: value,
        },
      },
    }));
  };

  const updateListItem = (listName, id, key, value) => {
    updateContent((previous) => ({
      ...previous,
      [listName]: previous[listName].map((item) => item.id === id ? { ...item, [key]: value } : item),
    }));
  };

  const addItem = (listName, item) => {
    updateContent((previous) => ({
      ...previous,
      [listName]: [...previous[listName], { ...item, order: previous[listName].length + 1 }],
    }));
  };

  const removeItem = (listName, id) => {
    updateContent((previous) => ({
      ...previous,
      [listName]: previous[listName].filter((item) => item.id !== id),
    }));
  };

  const moveItem = (listName, id, direction) => {
    updateContent((previous) => {
      const list = [...previous[listName]];
      const index = list.findIndex((item) => item.id === id);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= list.length) return previous;
      const [item] = list.splice(index, 1);
      list.splice(nextIndex, 0, item);
      return {
        ...previous,
        [listName]: list.map((entry, entryIndex) => ({ ...entry, order: entryIndex + 1 })),
      };
    });
  };

  const save = async () => {
    setSaving(true);
    setStatus("");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      setStatus(errorData.message || "Save failed. Check server logs and try again.");
      setSaving(false);
      return;
    }

    const data = await response.json();
    setContent(normalizeContent(data.content));
    setDirty(false);
    setSaving(false);
    setStatus("Saved.");
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/faraz-control-room/login";
  };

  if (loading) {
    return <main className="min-h-screen bg-[#030014] text-white flex items-center justify-center">Loading admin panel...</main>;
  }

  return (
    <main className="min-h-screen bg-[#030014] px-5 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-purple-300">Secret Control Room</p>
            <h1 className="mt-2 text-3xl font-bold">Portfolio Admin Panel</h1>
            <p className="mt-2 text-sm text-slate-400">
              Editing {visibleCounts.projects} projects, {visibleCounts.experiences} experiences, {visibleCounts.certificates} certificates, and {visibleCounts.skills} skills.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/" target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">
              Preview Site
            </a>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 px-4 py-2 text-sm text-red-200 hover:bg-red-500/10">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
            <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-5 py-2 text-sm font-semibold disabled:opacity-60">
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </header>

        {status && <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">{status}</div>}

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 lg:sticky lg:top-5 lg:h-fit">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActive(section)}
                className={`mb-2 w-full rounded-xl px-4 py-3 text-left text-sm transition ${active === section ? "bg-purple-500/20 text-white" : "text-slate-300 hover:bg-white/10"}`}
              >
                {section}
              </button>
            ))}
          </aside>

          <div className="space-y-6">
            {active === "Modes" && (
              <Panel title="Portfolio Modes">
                <div className="rounded-xl border border-red-400/20 bg-red-500/5 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-200">Current public mode</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {(content.settings?.availableModes || ["classic", "cyberpunk"]).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => updateSection("settings", "activeMode", mode)}
                        className={`rounded-xl border px-4 py-4 text-left transition ${content.settings?.activeMode === mode ? "border-red-300 bg-red-500/20 text-white" : "border-white/10 bg-black/20 text-slate-300 hover:bg-white/10"}`}
                      >
                        <span className="block text-lg font-semibold capitalize">{mode}</span>
                        <span className="mt-1 block text-sm text-slate-400">
                          {mode === "classic" ? "Existing portfolio theme." : "Cyberpunk layout with Sketchfab model embed."}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <TextInput label="Model provider" value={content.settings?.cyberpunk?.modelProvider} onChange={(value) => updateNested("settings", "cyberpunk", "modelProvider", value)} />
                  <TextInput label="Accent color" value={content.settings?.cyberpunk?.accentColor} onChange={(value) => updateNested("settings", "cyberpunk", "accentColor", value)} />
                </div>
                <TextInput label="Sketchfab embed URL" value={content.settings?.cyberpunk?.sketchfabEmbedUrl} onChange={(value) => updateNested("settings", "cyberpunk", "sketchfabEmbedUrl", value)} />
                <div className="grid gap-4 md:grid-cols-2">
                  <TextInput label="Model credit" value={content.settings?.cyberpunk?.modelCredit} onChange={(value) => updateNested("settings", "cyberpunk", "modelCredit", value)} />
                  <TextInput label="Model credit URL" value={content.settings?.cyberpunk?.modelCreditUrl} onChange={(value) => updateNested("settings", "cyberpunk", "modelCreditUrl", value)} />
                </div>
                <p className="text-sm text-slate-400">
                  V1 uses the Sketchfab iframe. The provider field is kept so this content can support native GLB rendering later.
                </p>
              </Panel>
            )}

            {active === "Hero" && (
              <Panel title="Hero">
                <div className="grid gap-4 md:grid-cols-2">
                  <TextInput label="Title top" value={content.hero.titleTop} onChange={(value) => updateSection("hero", "titleTop", value)} />
                  <TextInput label="Title bottom" value={content.hero.titleBottom} onChange={(value) => updateSection("hero", "titleBottom", value)} />
                </div>
                <TextInput label="Intro" value={content.hero.intro} onChange={(value) => updateSection("hero", "intro", value)} />
                <TextInput label="Status badge" value={content.hero.statusBadge} onChange={(value) => updateSection("hero", "statusBadge", value)} />
                <StringListEditor label="Typing words, one per line" value={content.hero.typingWords} onChange={(value) => updateSection("hero", "typingWords", value)} />
                <StringListEditor label="Hero tech badges, one per line" value={content.hero.techBadges} onChange={(value) => updateSection("hero", "techBadges", value)} />
              </Panel>
            )}

            {active === "About" && (
              <Panel title="About">
                <div className="grid gap-4 md:grid-cols-2">
                  <TextInput label="Section heading" value={content.about.heading} onChange={(value) => updateSection("about", "heading", value)} />
                  <TextInput label="Subtitle" value={content.about.subtitle} onChange={(value) => updateSection("about", "subtitle", value)} />
                  <TextInput label="Intro prefix" value={content.about.introPrefix} onChange={(value) => updateSection("about", "introPrefix", value)} />
                  <TextInput label="Name" value={content.about.name} onChange={(value) => updateSection("about", "name", value)} />
                  <TextInput label="Resume link" value={content.about.resumeLink} onChange={(value) => updateSection("about", "resumeLink", value)} />
                  <TextInput label="Experience start date" type="date" value={content.about.experienceStartDate} onChange={(value) => updateSection("about", "experienceStartDate", value)} />
                </div>
                <UploadField label="Profile photo URL" value={content.about.profilePhotoUrl} folder="modern-portfolio/profile" onChange={(value) => updateSection("about", "profilePhotoUrl", value)} />
                <StringListEditor label="Bio paragraphs, one per line" value={content.about.bio} onChange={(value) => updateSection("about", "bio", value)} />
                <div className="grid gap-4 md:grid-cols-2">
                  <TextInput label="Projects stat label" value={content.about.stats.projectsLabel} onChange={(value) => updateNested("about", "stats", "projectsLabel", value)} />
                  <TextInput label="Projects stat description" value={content.about.stats.projectsDescription} onChange={(value) => updateNested("about", "stats", "projectsDescription", value)} />
                  <TextInput label="Certificates stat label" value={content.about.stats.certificatesLabel} onChange={(value) => updateNested("about", "stats", "certificatesLabel", value)} />
                  <TextInput label="Certificates stat description" value={content.about.stats.certificatesDescription} onChange={(value) => updateNested("about", "stats", "certificatesDescription", value)} />
                  <TextInput label="Experience stat label" value={content.about.stats.experienceLabel} onChange={(value) => updateNested("about", "stats", "experienceLabel", value)} />
                  <TextInput label="Experience stat description" value={content.about.stats.experienceDescription} onChange={(value) => updateNested("about", "stats", "experienceDescription", value)} />
                </div>
              </Panel>
            )}

            {active === "Experience" && (
              <Panel title="Experience">
                <div className="grid gap-4 md:grid-cols-2">
                  <TextInput label="Section heading" value={content.experienceSection?.heading} onChange={(value) => updateSection("experienceSection", "heading", value)} />
                  <TextInput label="Section subheading" value={content.experienceSection?.subheading} onChange={(value) => updateSection("experienceSection", "subheading", value)} />
                </div>
                <button onClick={() => addItem("experiences", blankExperience())} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15">
                  <Plus className="h-4 w-4" />
                  Add Experience
                </button>
                {content.experiences.map((experience) => (
                  <details key={experience.id} className="rounded-xl border border-white/10 bg-black/20 p-4" open={false}>
                    <summary className="cursor-pointer text-lg font-semibold">{experience.company} - {experience.role}</summary>
                    <div className="mt-5 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => moveItem("experiences", experience.id, -1)} className="rounded-lg bg-white/10 p-2"><ArrowUp className="h-4 w-4" /></button>
                        <button onClick={() => moveItem("experiences", experience.id, 1)} className="rounded-lg bg-white/10 p-2"><ArrowDown className="h-4 w-4" /></button>
                        <button onClick={() => updateListItem("experiences", experience.id, "visible", experience.visible === false)} className="rounded-lg bg-white/10 p-2">{experience.visible === false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                        <button onClick={() => removeItem("experiences", experience.id)} className="rounded-lg bg-red-500/10 p-2 text-red-200"><Trash2 className="h-4 w-4" /></button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <TextInput label="ID" value={experience.id} onChange={(value) => updateListItem("experiences", experience.id, "id", value)} />
                        <TextInput label="Company" value={experience.company} onChange={(value) => updateListItem("experiences", experience.id, "company", value)} />
                        <TextInput label="Role" value={experience.role} onChange={(value) => updateListItem("experiences", experience.id, "role", value)} />
                        <TextInput label="Duration" value={experience.duration} onChange={(value) => updateListItem("experiences", experience.id, "duration", value)} />
                        <TextInput label="Location" value={experience.location} onChange={(value) => updateListItem("experiences", experience.id, "location", value)} />
                      </div>
                      <TextInput label="Summary" value={experience.summary} multiline onChange={(value) => updateListItem("experiences", experience.id, "summary", value)} />
                      <StringListEditor label="Highlights, one per line" value={experience.highlights || []} onChange={(value) => updateListItem("experiences", experience.id, "highlights", value)} />
                      <StringListEditor label="Tech stack, one per line" value={experience.stack || []} onChange={(value) => updateListItem("experiences", experience.id, "stack", value)} />
                    </div>
                  </details>
                ))}
              </Panel>
            )}

            {active === "Projects" && (
              <Panel title="Projects">
                <button onClick={() => addItem("projects", blankProject())} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15">
                  <Plus className="h-4 w-4" />
                  Add Project
                </button>
                {content.projects.map((project) => (
                  <details key={project.id} className="rounded-xl border border-white/10 bg-black/20 p-4" open={false}>
                    <summary className="cursor-pointer text-lg font-semibold">{project.Title}</summary>
                    <div className="mt-5 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => moveItem("projects", project.id, -1)} className="rounded-lg bg-white/10 p-2"><ArrowUp className="h-4 w-4" /></button>
                        <button onClick={() => moveItem("projects", project.id, 1)} className="rounded-lg bg-white/10 p-2"><ArrowDown className="h-4 w-4" /></button>
                        <button onClick={() => updateListItem("projects", project.id, "visible", project.visible === false)} className="rounded-lg bg-white/10 p-2">{project.visible === false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                        <button onClick={() => removeItem("projects", project.id)} className="rounded-lg bg-red-500/10 p-2 text-red-200"><Trash2 className="h-4 w-4" /></button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <TextInput label="ID" value={project.id} onChange={(value) => updateListItem("projects", project.id, "id", value)} />
                        <TextInput label="Title" value={project.Title} onChange={(value) => updateListItem("projects", project.id, "Title", value)} />
                        <TextInput label="Live link" value={project.Link} onChange={(value) => updateListItem("projects", project.id, "Link", value)} />
                        <TextInput label="GitHub link" value={project.Github} onChange={(value) => updateListItem("projects", project.id, "Github", value)} />
                      </div>
                      <TextInput label="Description" value={project.Description} multiline onChange={(value) => updateListItem("projects", project.id, "Description", value)} />
                      <UploadField label="Project image URL" value={project.Img} folder="modern-portfolio/projects" onChange={(value) => updateListItem("projects", project.id, "Img", value)} />
                      <StringListEditor label="Tech stack, one per line" value={project.TechStack || []} onChange={(value) => updateListItem("projects", project.id, "TechStack", value)} />
                      <StringListEditor label="Features, one per line" value={project.Features || []} onChange={(value) => updateListItem("projects", project.id, "Features", value)} />
                    </div>
                  </details>
                ))}
              </Panel>
            )}

            {active === "Certificates" && (
              <Panel title="Certificates">
                <button onClick={() => addItem("certificates", blankCertificate())} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15">
                  <Plus className="h-4 w-4" />
                  Add Certificate
                </button>
                <div className="grid gap-4 md:grid-cols-2">
                  {content.certificates.map((certificate) => (
                    <div key={certificate.id} className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-4">
                      <div className="flex gap-2">
                        <button onClick={() => moveItem("certificates", certificate.id, -1)} className="rounded-lg bg-white/10 p-2"><ArrowUp className="h-4 w-4" /></button>
                        <button onClick={() => moveItem("certificates", certificate.id, 1)} className="rounded-lg bg-white/10 p-2"><ArrowDown className="h-4 w-4" /></button>
                        <button onClick={() => updateListItem("certificates", certificate.id, "visible", certificate.visible === false)} className="rounded-lg bg-white/10 p-2">{certificate.visible === false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                        <button onClick={() => removeItem("certificates", certificate.id)} className="rounded-lg bg-red-500/10 p-2 text-red-200"><Trash2 className="h-4 w-4" /></button>
                      </div>
                      <TextInput label="Title" value={certificate.title} onChange={(value) => updateListItem("certificates", certificate.id, "title", value)} />
                      <UploadField label="Certificate image URL" value={certificate.imageUrl} folder="modern-portfolio/certificates" onChange={(value) => updateListItem("certificates", certificate.id, "imageUrl", value)} />
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {active === "Skills" && (
              <Panel title="Skills / Tech Stack">
                <button onClick={() => addItem("skills", blankSkill())} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15">
                  <Plus className="h-4 w-4" />
                  Add Skill
                </button>
                <div className="grid gap-4 md:grid-cols-2">
                  {content.skills.map((skill) => (
                    <div key={skill.id} className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-4">
                      <div className="flex gap-2">
                        <button onClick={() => moveItem("skills", skill.id, -1)} className="rounded-lg bg-white/10 p-2"><ArrowUp className="h-4 w-4" /></button>
                        <button onClick={() => moveItem("skills", skill.id, 1)} className="rounded-lg bg-white/10 p-2"><ArrowDown className="h-4 w-4" /></button>
                        <button onClick={() => updateListItem("skills", skill.id, "visible", skill.visible === false)} className="rounded-lg bg-white/10 p-2">{skill.visible === false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                        <button onClick={() => removeItem("skills", skill.id)} className="rounded-lg bg-red-500/10 p-2 text-red-200"><Trash2 className="h-4 w-4" /></button>
                      </div>
                      <TextInput label="Language" value={skill.language} onChange={(value) => updateListItem("skills", skill.id, "language", value)} />
                      <UploadField label="Icon URL or public filename" value={skill.icon} folder="modern-portfolio/skills" onChange={(value) => updateListItem("skills", skill.id, "icon", value)} />
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {active === "Social" && (
              <Panel title="Social Links">
                <button onClick={() => addItem("socialLinks", blankSocial())} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15">
                  <Plus className="h-4 w-4" />
                  Add Social Link
                </button>
                {content.socialLinks.map((link) => (
                  <div key={link.id} className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-4">
                    <div className="flex gap-2">
                      <button onClick={() => moveItem("socialLinks", link.id, -1)} className="rounded-lg bg-white/10 p-2"><ArrowUp className="h-4 w-4" /></button>
                      <button onClick={() => moveItem("socialLinks", link.id, 1)} className="rounded-lg bg-white/10 p-2"><ArrowDown className="h-4 w-4" /></button>
                      <button onClick={() => updateListItem("socialLinks", link.id, "visible", link.visible === false)} className="rounded-lg bg-white/10 p-2">{link.visible === false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                      <button onClick={() => removeItem("socialLinks", link.id)} className="rounded-lg bg-red-500/10 p-2 text-red-200"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextInput label="Name" value={link.name} onChange={(value) => updateListItem("socialLinks", link.id, "name", value)} />
                      <TextInput label="Display name" value={link.displayName} onChange={(value) => updateListItem("socialLinks", link.id, "displayName", value)} />
                      <TextInput label="Sub text" value={link.subText} onChange={(value) => updateListItem("socialLinks", link.id, "subText", value)} />
                      <TextInput label="URL" value={link.url} onChange={(value) => updateListItem("socialLinks", link.id, "url", value)} />
                      <TextInput label="Color" value={link.color} onChange={(value) => updateListItem("socialLinks", link.id, "color", value)} />
                      <TextInput label="Tailwind gradient classes" value={link.gradient} onChange={(value) => updateListItem("socialLinks", link.id, "gradient", value)} />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-slate-300">
                      <input type="checkbox" checked={Boolean(link.isPrimary)} onChange={(event) => updateListItem("socialLinks", link.id, "isPrimary", event.target.checked)} />
                      Primary contact card
                    </label>
                  </div>
                ))}
              </Panel>
            )}

            {active === "Contact" && (
              <Panel title="Contact">
                <TextInput label="Heading" value={content.contact.heading} onChange={(value) => updateSection("contact", "heading", value)} />
                <TextInput label="Subheading" value={content.contact.subheading} onChange={(value) => updateSection("contact", "subheading", value)} />
                <TextInput label="Card title" value={content.contact.cardTitle} onChange={(value) => updateSection("contact", "cardTitle", value)} />
                <TextInput label="Card text" value={content.contact.cardText} onChange={(value) => updateSection("contact", "cardText", value)} />
                <TextInput label="FormSubmit action URL" value={content.contact.formAction} onChange={(value) => updateSection("contact", "formAction", value)} />
              </Panel>
            )}

            {active === "Layout" && (
              <Panel title="Layout / Navbar / Footer">
                <TextInput label="Brand name" value={content.layout.brandName} onChange={(value) => updateSection("layout", "brandName", value)} />
                <TextInput label="Footer text" value={content.layout.footerText} onChange={(value) => updateSection("layout", "footerText", value)} />
                <TextInput label="Footer link" value={content.layout.footerLink} onChange={(value) => updateSection("layout", "footerLink", value)} />
                <TextInput
                  label="Navigation JSON"
                  multiline
                  value={JSON.stringify(content.layout.navItems, null, 2)}
                  onChange={(value) => {
                    try {
                      updateSection("layout", "navItems", JSON.parse(value));
                    } catch (error) {
                      setStatus("Navigation JSON is invalid.");
                    }
                  }}
                />
              </Panel>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
