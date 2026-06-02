# Modern Portfolio — Faraz Haider

Comprehensive portfolio built with Next.js (App Router), React, Tailwind CSS and a set of UI helpers (Framer Motion, AOS, MUI components). This repository is a full single-page portfolio application that demonstrates component-driven UI, project showcases, and polished interactive effects.

--

## Quick Start

Install and run locally:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the site.

To build for production:

```bash
npm run build
npm start
```

--

## High-level Overview

- **Purpose:** Personal portfolio website for showcasing projects, certificates, and technical skills.
- **Framework:** Next.js (App Router) — see [app/layout.jsx](app/layout.jsx#L1).
- **Styling:** Tailwind CSS (configured via `tailwind.config.mjs`).
- **Other libs:** Framer Motion, AOS, Lucide icons, MUI components for some widgets, Swiper for carousels, DotLottie for animation.

--

## Main Features

- Landing page with animated Lottie artwork and typing headline (see [app/(Pages)/home/page.jsx](app/(Pages)/home/page.jsx#L1)).
- Smooth scroll sections: Home, About, Portfolio, Contact (navigation handled in [app/_components/Navbar.jsx](app/_components/Navbar.jsx#L1)).
- Project showcase with cards, modal/details and per-project page ([app/(Pages)/portofolio/page.jsx](app/(Pages)/portofolio/page.jsx#L1) and [app/_components/CardProject.jsx](app/_components/CardProject.jsx#L1)).
- Detailed project view with tech badges, features and links ([app/_components/ProjectDetails.jsx](app/_components/ProjectDetails.jsx#L1)).
- Certificates carousel/grid and tech-stack grid ([app/(Pages)/portofolio/page.jsx](app/(Pages)/portofolio/page.jsx#L1)).
- Animated backgrounds and visual polish via [app/_components/AnimatedBackground.jsx](app/_components/AnimatedBackground.jsx#L1).

--

## Project Structure (important files)

- [package.json](package.json#L1) — scripts and dependencies.
- [app/layout.jsx](app/layout.jsx#L1) — global layout, metadata and font setup.
- [app/globals.css](app/globals.css#L1) — global Tailwind imports and overrides.
- [app/page.jsx](app/page.jsx#L1) — root page that forwards to the landing page.
- [app/(Pages)/landing/page.jsx](app/(Pages)/landing/page.jsx#L1) — orchestrates navbar, background and sections.
- [app/(Pages)/home/page.jsx](app/(Pages)/home/page.jsx#L1) — hero / Lottie animation and initial CTA.
- [app/(Pages)/about/page.jsx](app/(Pages)/about/page.jsx#L1) — about & stats.
- [app/(Pages)/portofolio/page.jsx](app/(Pages)/portofolio/page.jsx#L1) — projects, certificates and tech stack.
- [app/_components/Navbar.jsx](app/_components/Navbar.jsx#L1) — header + smooth scroll logic.
- [app/_components/CardProject.jsx](app/_components/CardProject.jsx#L1) — individual project card used across the portfolio.
- [app/_components/ProjectDetails.jsx](app/_components/ProjectDetails.jsx#L1) — per-project detail viewer component used by route [app/(Pages)/project/[...ProjectID]/page.jsx](app/(Pages)/project/[...ProjectID]/page.jsx#L1).
- [app/_components/AnimatedBackground.jsx](app/_components/AnimatedBackground.jsx#L1) — decorative moving blobs.
- [app/_components/SocialLinks.jsx](app/_components/SocialLinks.jsx#L1) — contact/connect UI block.
- [public/*] — assets and technology icons (see [public](public) folder).

--

## Data sources and editing content

- Projects displayed in the Portfolio slide come from the `projectsData` array inside [app/(Pages)/portofolio/page.jsx](app/(Pages)/portofolio/page.jsx#L1). Edit that file to add, remove or update projects.
- The per-project details page (component: `ProjectDetails`) uses a `storedProjects` array built inside the component code — that array is the source for the `/project/[...ProjectID]` route. Update it in [app/_components/ProjectDetails.jsx](app/_components/ProjectDetails.jsx#L1) to keep details in sync.
- Certificate images are listed in `certificatesData` inside [app/(Pages)/portofolio/page.jsx](app/(Pages)/portofolio/page.jsx#L1).

Notes: Projects are currently hard-coded in JavaScript files; if you plan to move to a CMS or API, replace those arrays with fetches to your endpoint and adapt the components that read them.

--

## How routing works

- App Router: pages are files inside `app/`.
- Landing page is served by the root [app/page.jsx](app/page.jsx#L1) which imports the landing composition from [app/(Pages)/landing/page.jsx](app/(Pages)/landing/page.jsx#L1).
- Project detail pages use a catch-all route at [app/(Pages)/project/[...ProjectID]/page.jsx](app/(Pages)/project/[...ProjectID]/page.jsx#L1) that mounts `ProjectDetails`.

--

## Development notes and gotchas

- This project uses client-side code extensively (`"use client"`): many components rely on `window`, AOS, local state and effects. Be sure to run in a proper browser environment when testing.
- Lottie animation files are referenced from `/public` (see `NLbpVqGegK.lottie`).
- The `public/Coding.json` file in this repository is empty — some UI code expects external icons and static assets inside `public/`.
- The repository depends on Node 18+/npm that supports the Next.js version specified. Check `package.json` for exact versions.

--

## Build & Deployment

Recommended: Vercel (Next.js native). Connect your Git repository to Vercel and the default settings will detect this Next.js app.

Manual steps:

```bash
npm run build
npm run start
```

If you use environment variables for future APIs, configure them in Vercel or set them in `.env.local` for local development.

--

## Accessibility & Performance

- Keyboard navigation is supported for buttons and links, but some interactive widgets rely on third-party libraries — test keyboard and screen-reader flows when adding new components.
- Images & Lottie animations are loaded from public CDN or `/public` — consider adding `priority` or Next/Image optimizations when moving to production.

--

## Where to change things (quick pointers)

- Edit site's metadata and default icon in [app/layout.jsx](app/layout.jsx#L1).
- Update navigation labels in [app/_components/Navbar.jsx](app/_components/Navbar.jsx#L1).
- Add/modify projects: [app/(Pages)/portofolio/page.jsx](app/(Pages)/portofolio/page.jsx#L1) and [app/_components/ProjectDetails.jsx](app/_components/ProjectDetails.jsx#L1).
- Change hero Lottie animation: [app/(Pages)/home/page.jsx](app/(Pages)/home/page.jsx#L1) (uses `DotLottieReact` with `NLbpVqGegK.lottie`).

--

## Tests & tooling

- No test harness is included. Add your preferred testing stack (Jest/React Testing Library / Playwright) if you want CI coverage.
- ESLint is available via `next lint` (script in `package.json`).

--

## Recommendations / Next steps

- Move projects and certificates data into an API (Express/MongoDB are already part of the stack in other projects referenced by the author) for easier editing without code changes.
- Add server-side rendering or static generation for project lists if SEO and initial load performance matter.
- Add unit and e2e tests for key components (Navbar, CardProject, ProjectDetails).

--

## Contact & author

Author: Faraz Mohammad Haider

Connect: see in-app Social links or edit [app/_components/SocialLinks.jsx](app/_components/SocialLinks.jsx#L1).

--

If you want, I can now:

- run a deeper automatic scan to extract every component prop and generate a component map, or
- commit this README and open a PR in your repo.

--

File: [README.md](README.md#L1)
