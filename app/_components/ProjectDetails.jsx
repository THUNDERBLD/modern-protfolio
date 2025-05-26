"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from 'sweetalert2';

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];

  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
        <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
          <Code2 className="text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-blue-200">{techStackCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Total Technologies</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-lg">
        <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
          <Layers className="text-purple-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-purple-200">{featuresCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Primary Feature</div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Source Code Private',
      text: 'Maaf, source code untuk proyek ini bersifat privat.',
      confirmButtonText: 'Mengerti',
      confirmButtonColor: '#3085d6',
      background: '#030014',
      color: '#ffffff'
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { ProjectID } = useParams();
  const router = useRouter(); // Changed from navigate to router
  const [project, setProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedProjects = [
      {
        id: "1",
        Title: "TeraFortress",
        Description: "TeraFortress is a full-stack eCommerce web app featuring a seamless shopping experience with user authentication, product management, and secure checkout. It includes an admin panel for managing orders, inventory, and user roles efficiently.",
        Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1746984806/yl43fbq4hbcjix2yrfdy.png",
        Link: "https://tera-fortress.vercel.app/",
        TechStack: ["React", "Tailwind", "MongoDB", "Nodejs", "Express", "Vercel", "Cloudinary", "Context API", "JWT"],
        Features: [
          "User Authentication (JWT)",
          "Admin Panel for Inventory & Orders",
          "Product Management (CRUD)",
          "Secure Checkout Integration",
          "Role-Based Access Control",
          "Responsive & Clean UI",
          "Cloud Image Hosting with Cloudinary"
        ],
        Github: "https://github.com/THUNDERBLD/TeraFortress"
      },
      {
        id: "2",
        Title: "My Old Portfolio",
        Description: " I've launched my portfolio website, crafted meticulously with the MERN stack! Building this site has been an incredible journey, allowing me to merge creativity with technical expertise. Check it out to explore my work, learn more about my background, and connect with me!",
        Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245607/huu3i5szttza33cjj0r8.png",
        Link: "https://main--bespoke-pastelito-f356ea.netlify.app/",
        TechStack: ["GSAP", "React", "Javascript", "Nodejs", "Netlify", "TailwindCss"],
        Features: [
          "Animated GSAP Transitions",
          "Responsive Layout",
          "Smooth Scrolling Experience",
          "Interactive Project Showcases",
          "Netlify Deployment",
          "Custom Cursor Effects"
        ],
        Github: "https://github.com/THUNDERBLD/PortfolioWebsite"
      },
      {
        id: "3",
        Title: "My New Portfolio",
        Description: "A dynamic portfolio built with Next.js, Express.js, and MongoDB, showcasing my journey of learning SSR, API routes, and full-stack integration. Features seamless media handling via Cloudinary and reflects my growth in mastering modern web technologies",
        Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1748264079/rmj2kcbu5gsghmg0mw57.png",
        // Link: "https://github.com/THUNDERBLD/Nasa",
        TechStack: ["Nextjs", "Nodejs", "MongoDB", "Express", "TailwindCss", "Cloudinary", "Material UI"],
        Features: [
          "Server-Side Rendering (SSR) for Faster Load Times",
          "Dynamic Project Showcase from MongoDB",
          "Secure Media Uploads via Cloudinary Integration",
          "API-Driven Content with Express.js & Node.js",
          "Responsive UI Built with Next.js",
          "Custom Admin Panel to Manage Projects",
          "SEO-Friendly Routing and Metadata",
          "Authentication for Editing Projects (if implemented)",
          "Lazy Loading & Image Optimization",
        ],
        Github: "https://github.com/THUNDERBLD/modern-protfolio"
      },
      {
        id: "4",
        Title: "3D Solar System Simulation and Orrery Web App",
        Description: "Created a Solar System Simulation and Orrery Web App using Three.js and the MERN stack. Our app provides a real-time 3D simulation of the solar system, highlighting Near-Earth Objects (NEOs) such as meteors and asteroids. It offers interactive features where users can explore planets and stars, view detailed information, and gain a deeper understanding of the cosmos.",
        Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245606/pytluwg0ftaulthpkddv.png",
        // Link: "https://github.com/THUNDERBLD/Nasa",
        TechStack: ["React", "Javascript", "Nodejs", "3Js", "Express", "TailwindCss"],
        Features: [
          "3D Simulation with Three.js",
          "Real-Time Display of NEOs (Meteors & Asteroids)",
          "Planetary Interactions & Data Popups",
          "Cosmic Navigation Controls",
          "Informational UI for Each Celestial Body",
          "Optimized Performance for Complex Renders"
        ],
        Github: "https://github.com/THUNDERBLD/Nasa"
      },
      {
        id: "5",
        Title: "AmazTrade Suite",
        Description: "Indian small and medium-sized businesses (SMBs) face numerous challenges in entering global markets. AmazTrade Suite provides tools to simplify export processes, offering secure and intelligent solutions for businesses.",
        Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245606/icrc0qx1glkcmlyarz0z.png",
        // Link: "https://github.com/THUNDERBLD/Amazon_Hackathon_Submission",
        TechStack: ["React", "TypeScript", "Nodejs", "Netlify", "MongoDB", "Express", "TailwindCss"],
        Features: [
          "Export Process Management Tools",
          "Secure Business Data Handling",
          "Dashboard for Indian SMBs",
          "Tailored B2B/B2C Tools for Trade",
          "Interactive Forms & Panels",
          "Multi-Step Form Integration"
        ],
        Github: "https://github.com/THUNDERBLD/Amazon_Hackathon_Submission"
      },
      {
        id: "6",
        Title: "Advista",
        Description: "Advista is your go-to hub for everything gaming and console information. With a sleek, clean design and a user-friendly interface, Advista provides the latest updates, reviews, and insights on all things gaming. Whether you're a casual gamer or a hardcore enthusiast, Advista is here to keep you informed and entertained.",
        Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245605/mnrvyhb5vyursy8kvhgm.png",
        // Link: "https://github.com/THUNDERBLD/Advista",
        TechStack: ["React", "Javascript", "Express", "MongoDB", "Vercel", "Nodejs", "TailwindCss"],
        Features: [
          "Gaming Console & Game Info Aggregator",
          "Real-Time Reviews & Updates",
          "Responsive UI/UX Design",
          "Express API for Game Listings",
          "Interactive Category Filters",
          "Dark Mode Friendly UI"
        ],
        Github: "https://github.com/THUNDERBLD/Advista"
      },
      {
        id: "7",
        Title: "Chemical Kinetics Helper GUI Project",
        Description: "The Chemical Kinetics Helper GUI is a dynamic solution crafted with Python's Tkinter for the GUI and Seaborn for advanced graph plotting. Tailored for students, researchers, and professionals, this tool simplifies the intricate world of chemical kinetics by providing an interactive and visually-rich environment for data analysis.",
        Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245602/y98hv0utav0hhdv9r2nn.png",
        // Link: "https://github.com/THUNDERBLD/GUI",
        TechStack: ["Python", "Kinter", "Seaborn", "Matplotlib", "ttkbootstrap"],
        Features: [
          "Tkinter-Based GUI for Reactions",
          "Advanced Graph Plotting with Seaborn & Matplotlib",
          "User Input Handling for Reaction Rates",
          "Theme Support via ttkbootstrap",
          "Real-Time Data Visualization",
          "Exportable Graphs for Research"
        ],
        Github: "https://github.com/THUNDERBLD/GUI"
      },
      {
        id: "8",
        Title: "OXZ-THUNDER",
        Description: "OXZ Thunder is a sleek music streaming web app built with JavaScript. It features real-time audio playback, custom playlists, and a responsive UI, offering a smooth and engaging user experience.",
        Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747247811/svrtuj8aqwvq2yxpfici.png",
        // Link: "https://github.com/THUNDERBLD/OXZ-Thunder",
        TechStack: ["Javascript", "Nodejs", "TailwindCss", "HTML"],
        Features: [
          "Music Streaming with Custom Playlists",
          "Real-Time Audio Playback",
          "Interactive Track Controls",
          "Responsive Mobile-Friendly UI",
          "Minimalist Design Aesthetic",
          "Local Playlist Storage via JavaScript"
        ],
        Github: "https://github.com/THUNDERBLD/OXZ-Thunder"
      },
    ];
    const selectedProject = storedProjects.find((p) => String(p.id) === ProjectID[0]);

    if (selectedProject) {
      const enhancedProject = {
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Github: selectedProject.Github || 'https://github.com/THUNDERBLD',
      };
      setProject(enhancedProject);
    }
  }, [ProjectID]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      {/* Background animations remain unchanged */}
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button
              onClick={() => router.back()} // Changed from navigate(-1) to router.back()
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
              <span>Projects</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-white/90 truncate">{project.Title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                  {project.Title}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm" />
                </div>
              </div>

              {/* Fixed: Removed prose wrapper that was causing the div inside p issue */}
              <div className="text-base md:text-lg text-gray-300/90 leading-relaxed">
                {project.Description}
              </div>

              <ProjectStats project={project} />

              <div className="flex flex-wrap gap-3 md:gap-4">
                {/* Action buttons */}
                {
                  project.Link ? (
                    <a
                      href={project.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                    >
                      <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                      <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                      <span className="relative font-medium">Live Demo</span>
                    </a>
                  ) : (
                    <div className="group cursor-default relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base">
                      <span className="relative font-medium">Not Live</span>
                    </div>
                  )}

                <a
                  href={project.Github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                  onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <Github className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="relative font-medium">Github</span>
                </a>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-white/90 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  Technologies Used
                </h3>
                {project.TechStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.TechStack.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base text-gray-400 opacity-50">No technologies added.</p>
                )}
              </div>
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">

                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={project.Img}
                  alt={project.Title}
                  className="w-full  object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                  onLoad={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
              </div>

              {/* Fitur Utama */}
              <div className="bg-white/[0.02] cursor-default backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6 hover:border-white/20 transition-colors duration-300 group">
                <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400 group-hover:rotate-[20deg] transition-transform duration-300" />
                  Key Features
                </h3>
                {project.Features.length > 0 ? (
                  <ul className="list-none space-y-2">
                    {project.Features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 opacity-50">No features added.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;