export const fallbackContent = {
  slug: "main",
  settings: {
    activeMode: "classic",
    availableModes: ["classic", "cyberpunk"],
    cyberpunk: {
      modelProvider: "sketchfab",
      sketchfabEmbedUrl: "https://sketchfab.com/models/513c541b1508444eb30e62656e97e621/embed?ui_theme=dark&autostart=1",
      modelCredit: "Cyber Warrior by Jiaxing on Sketchfab",
      modelCreditUrl: "https://sketchfab.com/3d-models/cyber-warrior-513c541b1508444eb30e62656e97e621",
      accentColor: "#ff3b3b",
    },
  },
  layout: {
    brandName: "Faraz Haider",
    navItems: [
      { href: "#Home", label: "Home" },
      { href: "#About", label: "About" },
      { href: "#Experience", label: "Experience" },
      { href: "#Portofolio", label: "Portofolio" },
      { href: "#Contact", label: "Contact" },
    ],
    footerText: "© 2025 THUNDER BLOOD. All Rights Reserved.",
    footerLink: "https://flowbite.com/",
  },
  hero: {
    titleTop: "Full-Stack",
    titleBottom: "Developer",
    typingWords: ["Computer Science Student", "Tech Enthusiast | Problem-Solver"],
    intro: "Software Developer | Proficient in MERN Stack & DevOps | Crafting Quality Web Solutions",
    techBadges: ["Node.js", "Tailwind", "Typescript", "MongoDB", "Next.js"],
    statusBadge: "Ready to Innovate",
  },
  about: {
    heading: "About Me",
    subtitle: "Transforming ideas into digital experiences",
    introPrefix: "Hey, I'm",
    name: "Faraz Haider",
    bio: [
      "I have a strong foundation in both frontend and backend development, Using these technologies to build scalable and user-friendly web applications.",
      "I've gained industry experience through 2 internships one is at Banyan Tee, I worked as a frontend developer and mostly my work was focused on react.js and second one is in LetsProgressify, it was a full stack internship and I worked on Nextjs and react flow.",
      "Additionally, I was a finalist in both the NASA Space Apps Challenge and the Amazon Sambhav Hackathon, demonstrating my problem-solving abilities and passion for technology in the development feild.",
    ],
    profilePhotoUrl: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1748287257/h7elu32z8c9lkrqdilb9.jpg",
    resumeLink: "https://drive.google.com/file/d/18A2F2xCEBwNrRgTzHsNs2PvuPuLf2hoC/view",
    experienceStartDate: "2022-11-06",
    stats: {
      projectsLabel: "Total Projects",
      projectsDescription: "Innovative web solutions crafted",
      certificatesLabel: "Certificates",
      certificatesDescription: "Professional skills validated",
      experienceLabel: "Years of Experience",
      experienceDescription: "Continuous learning journey",
    },
  },
  portfolio: {
    heading: "Portfolio Showcase",
    subheading: "Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.",
  },
  experienceSection: {
    heading: "Professional Experience",
    subheading: "A focused timeline of the teams, systems, and production work that shaped my engineering practice.",
  },
  contact: {
    heading: "Contact Me",
    subheading: "Got a question? Send me a message, and I'll get back to you soon.",
    cardTitle: "Get in Touch",
    cardText: "Have something to discuss? Send me a message and let's talk.",
    formAction: "https://formsubmit.co/ayanalihaider9@gmail.com",
  },
  socialLinks: [
    {
      id: "linkedin",
      name: "LinkedIn",
      displayName: "Let's Connect",
      subText: "on LinkedIn",
      url: "https://www.linkedin.com/in/faraz-mohammed-162289227/",
      color: "#0A66C2",
      gradient: "from-[#0A66C2] to-[#0077B5]",
      isPrimary: true,
      visible: true,
      order: 1,
    },
    {
      id: "instagram",
      name: "Instagram",
      displayName: "Instagram",
      subText: "@thunder_blood_9",
      url: "https://www.instagram.com/thunder_blood_9/",
      color: "#E4405F",
      gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]",
      visible: true,
      order: 2,
    },
    {
      id: "github",
      name: "GitHub",
      displayName: "Github",
      subText: "@THUNDERBLD",
      url: "https://github.com/THUNDERBLD",
      color: "#ffffff",
      gradient: "from-[#333] to-[#24292e]",
      visible: true,
      order: 3,
    },
  ],
  projects: [
    {
      id: "1",
      Title: "TeraFortress",
      Description: "TeraFortress is a full-stack eCommerce web app featuring a seamless shopping experience with user authentication, product management, and secure checkout. It includes an admin panel for managing orders, inventory, and user roles efficiently.",
      Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1746984806/yl43fbq4hbcjix2yrfdy.png",
      Link: "https://tera-fortress.vercel.app/",
      Github: "https://github.com/THUNDERBLD/TeraFortress",
      TechStack: ["React", "Tailwind", "MongoDB", "Nodejs", "Express", "Vercel", "Cloudinary", "Context API", "JWT"],
      Features: ["User Authentication (JWT)", "Admin Panel for Inventory & Orders", "Product Management (CRUD)", "Secure Checkout Integration", "Role-Based Access Control", "Responsive & Clean UI", "Cloud Image Hosting with Cloudinary"],
      visible: true,
      order: 1,
    },
    {
      id: "2",
      Title: "My Old Portfolio",
      Description: " I've launched my portfolio website, crafted meticulously with the MERN stack! Building this site has been an incredible journey, allowing me to merge creativity with technical expertise. Check it out to explore my work, learn more about my background, and connect with me!",
      Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245607/huu3i5szttza33cjj0r8.png",
      Link: "https://main--bespoke-pastelito-f356ea.netlify.app/",
      Github: "https://github.com/THUNDERBLD/PortfolioWebsite",
      TechStack: ["GSAP", "React", "Javascript", "Nodejs", "Netlify", "TailwindCss"],
      Features: ["Animated GSAP Transitions", "Responsive Layout", "Smooth Scrolling Experience", "Interactive Project Showcases", "Netlify Deployment", "Custom Cursor Effects"],
      visible: true,
      order: 2,
    },
    {
      id: "3",
      Title: "My New Portfolio",
      Description: "A dynamic portfolio built with Next.js, Express.js, and MongoDB, showcasing my journey of learning SSR, API routes, and full-stack integration. Features seamless media handling via Cloudinary and reflects my growth in mastering modern web technologies",
      Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1748264079/rmj2kcbu5gsghmg0mw57.png",
      Link: "https://github.com/THUNDERBLD/modern-protfolio",
      Github: "https://github.com/THUNDERBLD/modern-protfolio",
      TechStack: ["Nextjs", "Nodejs", "MongoDB", "Express", "TailwindCss", "Cloudinary", "Material UI"],
      Features: ["Server-Side Rendering (SSR) for Faster Load Times", "Dynamic Project Showcase from MongoDB", "Secure Media Uploads via Cloudinary Integration", "API-Driven Content with Express.js & Node.js", "Responsive UI Built with Next.js", "Custom Admin Panel to Manage Projects", "SEO-Friendly Routing and Metadata", "Authentication for Editing Projects (if implemented)", "Lazy Loading & Image Optimization"],
      visible: true,
      order: 3,
    },
    {
      id: "4",
      Title: "3D Solar System Simulation and Orrery Web App",
      Description: "Created a Solar System Simulation and Orrery Web App using Three.js and the MERN stack. Our app provides a real-time 3D simulation of the solar system, highlighting Near-Earth Objects (NEOs) such as meteors and asteroids. It offers interactive features where users can explore planets and stars, view detailed information, and gain a deeper understanding of the cosmos.",
      Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245606/pytluwg0ftaulthpkddv.png",
      Link: "https://github.com/THUNDERBLD/Nasa",
      Github: "https://github.com/THUNDERBLD/Nasa",
      TechStack: ["React", "Javascript", "Nodejs", "3Js", "Express", "TailwindCss"],
      Features: ["3D Simulation with Three.js", "Real-Time Display of NEOs (Meteors & Asteroids)", "Planetary Interactions & Data Popups", "Cosmic Navigation Controls", "Informational UI for Each Celestial Body", "Optimized Performance for Complex Renders"],
      visible: true,
      order: 4,
    },
    {
      id: "5",
      Title: "AmazTrade Suite",
      Description: "Indian small and medium-sized businesses (SMBs) face numerous challenges in entering global markets. AmazTrade Suite provides tools to simplify export processes, offering secure and intelligent solutions for businesses.",
      Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245606/icrc0qx1glkcmlyarz0z.png",
      Link: "https://github.com/THUNDERBLD/Amazon_Hackathon_Submission",
      Github: "https://github.com/THUNDERBLD/Amazon_Hackathon_Submission",
      TechStack: ["React", "TypeScript", "Nodejs", "Netlify", "MongoDB", "Express", "TailwindCss"],
      Features: ["Export Process Management Tools", "Secure Business Data Handling", "Dashboard for Indian SMBs", "Tailored B2B/B2C Tools for Trade", "Interactive Forms & Panels", "Multi-Step Form Integration"],
      visible: true,
      order: 5,
    },
    {
      id: "6",
      Title: "Advista",
      Description: "Advista is your go-to hub for everything gaming and console information. With a sleek, clean design and a user-friendly interface, Advista provides the latest updates, reviews, and insights on all things gaming. Whether you're a casual gamer or a hardcore enthusiast, Advista is here to keep you informed and entertained.",
      Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245605/mnrvyhb5vyursy8kvhgm.png",
      Link: "https://github.com/THUNDERBLD/Advista",
      Github: "https://github.com/THUNDERBLD/Advista",
      TechStack: ["React", "Javascript", "Express", "MongoDB", "Vercel", "Nodejs", "TailwindCss"],
      Features: ["Gaming Console & Game Info Aggregator", "Real-Time Reviews & Updates", "Responsive UI/UX Design", "Express API for Game Listings", "Interactive Category Filters", "Dark Mode Friendly UI"],
      visible: true,
      order: 6,
    },
    {
      id: "7",
      Title: "Chemical Kinetics Helper GUI Project",
      Description: "The Chemical Kinetics Helper GUI is a dynamic solution crafted with Python's Tkinter for the GUI and Seaborn for advanced graph plotting. Tailored for students, researchers, and professionals, this tool simplifies the intricate world of chemical kinetics by providing an interactive and visually-rich environment for data analysis.",
      Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245602/y98hv0utav0hhdv9r2nn.png",
      Link: "https://github.com/THUNDERBLD/GUI",
      Github: "https://github.com/THUNDERBLD/GUI",
      TechStack: ["Python", "Kinter", "Seaborn", "Matplotlib", "ttkbootstrap"],
      Features: ["Tkinter-Based GUI for Reactions", "Advanced Graph Plotting with Seaborn & Matplotlib", "User Input Handling for Reaction Rates", "Theme Support via ttkbootstrap", "Real-Time Data Visualization", "Exportable Graphs for Research"],
      visible: true,
      order: 7,
    },
    {
      id: "8",
      Title: "OXZ-THUNDER",
      Description: "OXZ Thunder is a sleek music streaming web app built with JavaScript. It features real-time audio playback, custom playlists, and a responsive UI, offering a smooth and engaging user experience.",
      Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747247811/svrtuj8aqwvq2yxpfici.png",
      Link: "https://github.com/THUNDERBLD/OXZ-Thunder",
      Github: "https://github.com/THUNDERBLD/OXZ-Thunder",
      TechStack: ["Javascript", "Nodejs", "TailwindCss", "HTML"],
      Features: ["Music Streaming with Custom Playlists", "Real-Time Audio Playback", "Interactive Track Controls", "Responsive Mobile-Friendly UI", "Minimalist Design Aesthetic", "Local Playlist Storage via JavaScript"],
      visible: true,
      order: 8,
    },
  ],
  experiences: [
    {
      id: "cardtree-ai",
      company: "Cardtree AI",
      role: "SDE Intern (Full Stack)",
      duration: "Jan 2026 - Present",
      location: "Remote",
      summary: "Building secure backend infrastructure and production-ready APIs for Cardtree's core platform.",
      highlights: [
        "Architected secure server-side configurations with TypeScript and Node.js, including environment and asset management through AWS S3.",
        "Developed scalable REST APIs for the core cardtree-server, improving data retrieval paths for lower-latency user experiences.",
        "Collaborated with the founding team to debug runtime issues, strengthen safety checks, and reduce production failure risk.",
      ],
      stack: ["TypeScript", "Node.js", "AWS S3", "REST APIs", "Production Debugging"],
      visible: true,
      order: 1,
    },
    {
      id: "letsprogressify",
      company: "LetsProgressify",
      role: "Full Stack Developer Intern",
      duration: "Oct 2024 - Dec 2024",
      location: "Remote",
      summary: "Worked across frontend performance, API reliability, and visual workflow tools for business logic.",
      highlights: [
        "Engineered dynamic React.js interfaces and reduced First Contentful Paint by 25% through code splitting and lazy loading.",
        "Built RESTful APIs with Node.js and Express, adding rate limiting and JWT authentication for 500+ daily requests.",
        "Integrated React Flow to help users design custom drag-and-drop workflows for complex business processes.",
      ],
      stack: ["React.js", "Node.js", "Express", "JWT", "React Flow"],
      visible: true,
      order: 2,
    },
    {
      id: "the-banyan-tee",
      company: "The Banyan Tee",
      role: "Frontend Developer Intern",
      duration: "Jan 2024 - Mar 2024",
      location: "Bhopal, India",
      summary: "Focused on production frontend debugging, responsive UI behavior, and browser compatibility.",
      highlights: [
        "Resolved critical rendering bottlenecks in production and improved page-load speed by 40% by optimizing the critical rendering path.",
        "Improved cross-browser compatibility across Chrome, Safari, and Edge using responsive design and automated UI testing practices.",
        "Translated frontend issues into maintainable fixes while preserving the existing product experience.",
      ],
      stack: ["React.js", "Responsive UI", "Performance", "Cross-Browser QA"],
      visible: true,
      order: 3,
    },
  ],
  certificates: [
    { id: "cert-1", title: "JavaScript Course", imageUrl: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1746978681/skv6cmwbtl0hedzgpztf.jpg", visible: true, order: 1 },
    { id: "cert-2", title: "NASA Space Apps", imageUrl: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1746980730/dxq0hodfdu5rnesorbwh.png", visible: true, order: 2 },
    { id: "cert-3", title: "Vityarthi Certificate", imageUrl: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1748279088/wjjv7wghakalza13ghan.png", visible: true, order: 3 },
    { id: "cert-4", title: "NPTEL Cloud Computing", imageUrl: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1748264424/rarhkdwtchm39cuaejpu.png", visible: true, order: 4 },
    { id: "cert-5", title: "Vityarthi Certificate", imageUrl: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1748278709/ofkpptoakgy1bkp7vddc.png", visible: true, order: 5 },
    { id: "cert-6", title: "React JS Course", imageUrl: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1748279527/x7tem6ty8t9dil1ch7xy.png", visible: true, order: 6 },
  ],
  skills: [
    { id: "html", icon: "html.svg", language: "HTML", visible: true, order: 1 },
    { id: "css", icon: "css.svg", language: "CSS", visible: true, order: 2 },
    { id: "tailwind", icon: "tailwind.svg", language: "Tailwind CSS", visible: true, order: 3 },
    { id: "javascript", icon: "javascript.svg", language: "JavaScript", visible: true, order: 4 },
    { id: "mongodb", icon: "mongodb.svg", language: "MongoDB", visible: true, order: 5 },
    { id: "express", icon: "express.svg", language: "Express", visible: true, order: 6 },
    { id: "reactjs", icon: "reactjs.svg", language: "ReactJS", visible: true, order: 7 },
    { id: "nodejs", icon: "nodejs.svg", language: "Node JS", visible: true, order: 8 },
    { id: "nextjs", icon: "nextjs.svg", language: "Next.js", visible: true, order: 9 },
    { id: "typescript", icon: "typescript.svg", language: "TypeScript", visible: true, order: 10 },
    { id: "vite", icon: "vite.svg", language: "Vite", visible: true, order: 11 },
    { id: "python", icon: "python.svg", language: "Python", visible: true, order: 12 },
    { id: "java", icon: "java.svg", language: "Java", visible: true, order: 13 },
    { id: "vercel", icon: "vercel.svg", language: "Vercel", visible: true, order: 14 },
    { id: "postgresql", icon: "postgresql.svg", language: "PostgreSQL", visible: true, order: 15 },
    { id: "docker", icon: "docker.svg", language: "Docker", visible: true, order: 16 },
    { id: "git", icon: "git.svg", language: "Git", visible: true, order: 17 },
    { id: "github", icon: "github.svg", language: "Github", visible: true, order: 18 },
    { id: "netlify", icon: "netlify.svg", language: "Netlify", visible: true, order: 19 },
    { id: "postman", icon: "postman.svg", language: "postman", visible: true, order: 20 },
    { id: "notion", icon: "notion.svg", language: "Notion", visible: true, order: 21 },
    { id: "linux", icon: "linux.svg", language: "Linux", visible: true, order: 22 },
    { id: "vscode", icon: "vscode.svg", language: "VSCode", visible: true, order: 23 },
    { id: "mui", icon: "MUI.svg", language: "Material UI", visible: true, order: 24 },
  ],
};

const mergeObject = (base, incoming) => {
  if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) {
    return base;
  }

  return Object.keys(base).reduce((result, key) => {
    if (Array.isArray(base[key])) {
      result[key] = Array.isArray(incoming[key]) ? incoming[key] : base[key];
      return result;
    }

    if (base[key] && typeof base[key] === "object") {
      result[key] = mergeObject(base[key], incoming[key]);
      return result;
    }

    result[key] = incoming[key] ?? base[key];
    return result;
  }, { ...incoming });
};

export const normalizeContent = (content) => {
  const merged = mergeObject(fallbackContent, content || {});
  return {
    ...merged,
    layout: {
      ...merged.layout,
      navItems: ensureExperienceNavItem(merged.layout?.navItems),
    },
    projects: normalizeList(merged.projects),
    experiences: normalizeList(merged.experiences),
    certificates: normalizeList(merged.certificates),
    skills: normalizeList(merged.skills),
    socialLinks: normalizeList(merged.socialLinks),
  };
};

const ensureExperienceNavItem = (navItems = []) => {
  const items = Array.isArray(navItems) ? [...navItems] : fallbackContent.layout.navItems;
  if (items.some((item) => item.href === "#Experience")) {
    return items;
  }

  const aboutIndex = items.findIndex((item) => item.href === "#About");
  const insertIndex = aboutIndex >= 0 ? aboutIndex + 1 : items.length;
  items.splice(insertIndex, 0, { href: "#Experience", label: "Experience" });
  return items;
};

export const normalizeList = (items = []) => {
  return [...items]
    .map((item, index) => ({
      ...item,
      id: String(item.id || `${Date.now()}-${index}`),
      visible: item.visible !== false,
      order: Number.isFinite(Number(item.order)) ? Number(item.order) : index + 1,
    }))
    .sort((a, b) => a.order - b.order);
};

export const visibleItems = (items = []) => {
  return normalizeList(items).filter((item) => item.visible !== false);
};
