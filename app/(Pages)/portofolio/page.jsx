"use client";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "@/app/_components/CardProject";
import TechStackIcon from "@/app/_components/TechStackIcon";
import Certificate from "@/app/_components/Certificate";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes } from "lucide-react";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// Define your projects data here
const projectsData = [
  {
    id: "1",
    Title: "TeraFortress",
    Description: "TeraFortress is a full-stack eCommerce web app featuring a seamless shopping experience with user authentication, product management, and secure checkout. It includes an admin panel for managing orders, inventory, and user roles efficiently.",
    Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1746984806/yl43fbq4hbcjix2yrfdy.png",
    Link: "https://tera-fortress.vercel.app/",
    TechStack: ["React", "Tailwind", "MongoDB", "Nodejs", "Express", "Vercel", "Cloudinary", "Context API", "JWT"]
  },
  {
    id: "2",
    Title: "My Old Portfolio",
    Description: " I've launched my portfolio website, crafted meticulously with the MERN stack! Building this site has been an incredible journey, allowing me to merge creativity with technical expertise. Check it out to explore my work, learn more about my background, and connect with me!",
    Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245607/huu3i5szttza33cjj0r8.png",
    Link: "https://main--bespoke-pastelito-f356ea.netlify.app/",
    TechStack: ["GSAP", "React", "Javascript", "Nodejs", "Netlify", "TailwindCss"]
  },
  {
    id: "3",
    Title: "My New Portfolio",
    Description: "A dynamic portfolio built with Next.js, Express.js, and MongoDB, showcasing my journey of learning SSR, API routes, and full-stack integration. Features seamless media handling via Cloudinary and reflects my growth in mastering modern web technologies",
    Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1748264079/rmj2kcbu5gsghmg0mw57.png",
    Link: "https://github.com/THUNDERBLD/modern-protfolio",
    TechStack: ["Nextjs", "Nodejs", "MongoDB", "Express", "TailwindCss", "Cloudinary", "Material UI"],
  },
  {
    id: "4",
    Title: "3D Solar System Simulation and Orrery Web App",
    Description: "Created a Solar System Simulation and Orrery Web App using Three.js and the MERN stack. Our app provides a real-time 3D simulation of the solar system, highlighting Near-Earth Objects (NEOs) such as meteors and asteroids. It offers interactive features where users can explore planets and stars, view detailed information, and gain a deeper understanding of the cosmos.",
    Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245606/pytluwg0ftaulthpkddv.png",
    Link: "https://github.com/THUNDERBLD/Nasa",
    TechStack: ["React", "Javascript", "Nodejs", "3Js", "Express", "TailwindCss"]
  },
  {
    id: "5",
    Title: "AmazTrade Suite",
    Description: "Indian small and medium-sized businesses (SMBs) face numerous challenges in entering global markets. AmazTrade Suite provides tools to simplify export processes, offering secure and intelligent solutions for businesses.",
    Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245606/icrc0qx1glkcmlyarz0z.png",
    Link: "https://github.com/THUNDERBLD/Amazon_Hackathon_Submission",
    TechStack: ["React", "TypeScript", "Nodejs", "Netlify", "MongoDB", "Express", "TailwindCss"]
  },
  {
    id: "6",
    Title: "Advista",
    Description: "Advista is your go-to hub for everything gaming and console information. With a sleek, clean design and a user-friendly interface, Advista provides the latest updates, reviews, and insights on all things gaming. Whether you're a casual gamer or a hardcore enthusiast, Advista is here to keep you informed and entertained.",
    Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245605/mnrvyhb5vyursy8kvhgm.png",
    Link: "https://github.com/THUNDERBLD/Advista",
    TechStack: ["React", "Javascript", "Express", "MongoDB", "Vercel", "Nodejs", "TailwindCss"]
  },
  {
    id: "7",
    Title: "Chemical Kinetics Helper GUI Project",
    Description: "The Chemical Kinetics Helper GUI is a dynamic solution crafted with Python's Tkinter for the GUI and Seaborn for advanced graph plotting. Tailored for students, researchers, and professionals, this tool simplifies the intricate world of chemical kinetics by providing an interactive and visually-rich environment for data analysis.",
    Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747245602/y98hv0utav0hhdv9r2nn.png",
    Link: "https://github.com/THUNDERBLD/GUI",
    TechStack: ["Python", "Kinter", "Seaborn", "Matplotlib", "ttkbootstrap"]
  },
  {
    id: "8",
    Title: "OXZ-THUNDER",
    Description: "OXZ Thunder is a sleek music streaming web app built with JavaScript. It features real-time audio playback, custom playlists, and a responsive UI, offering a smooth and engaging user experience.",
    Img: "https://res.cloudinary.com/dx5umjy5q/image/upload/v1747247811/svrtuj8aqwvq2yxpfici.png",
    Link: "https://github.com/THUNDERBLD/OXZ-Thunder",
    TechStack: ["Javascript", "Nodejs", "TailwindCss", "HTML"]
  },
];

// Define your certificates data here
const certificatesData = [
  "https://res.cloudinary.com/dx5umjy5q/image/upload/v1746978681/skv6cmwbtl0hedzgpztf.jpg",
  "https://res.cloudinary.com/dx5umjy5q/image/upload/v1746980730/dxq0hodfdu5rnesorbwh.png",
  "https://res.cloudinary.com/dx5umjy5q/image/upload/v1748279088/wjjv7wghakalza13ghan.png",
  "https://res.cloudinary.com/dx5umjy5q/image/upload/v1748264424/rarhkdwtchm39cuaejpu.png",
  "https://res.cloudinary.com/dx5umjy5q/image/upload/v1748278709/ofkpptoakgy1bkp7vddc.png",
  "https://res.cloudinary.com/dx5umjy5q/image/upload/v1748279527/x7tem6ty8t9dil1ch7xy.png",
  // Add more certificates as needed
];

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "mongodb.svg", language: "MongoDB" },
  { icon: "express.svg", language: "Express" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "nextjs.svg", language: "Next.js" },
  { icon: "typescript.svg", language: "TypeScript" },
  { icon: "vite.svg", language: "Vite" },
  // { icon: "firebase.svg", language: "Firebase" },
  { icon: "python.svg", language: "Python" },
  { icon: "java.svg", language: "Java" },
  // { icon: "go.svg", language: "GO Lang" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "postgresql.svg", language: "PostgreSQL" },
  { icon: "docker.svg", language: "Docker" },
  // { icon: "kubernetes.svg", language: "Kubernetes" },
  { icon: "git.svg", language: "Git" },
  { icon: "github.svg", language: "Github" },
  { icon: "netlify.svg", language: "Netlify" },
  { icon: "postman.svg", language: "postman" },
  { icon: "notion.svg", language: "Notion" },
  { icon: "linux.svg", language: "Linux" },
  // { icon: "figma.svg", language: "Figma" },
  { icon: "vscode.svg", language: "VSCode" },
  { icon: "MUI.svg", language: "Material UI" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState(projectsData);
  const [certificates, setCertificates] = useState(certificatesData);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [initialItems, setInitialItems] = useState(6); // Default to desktop value

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        setInitialItems(mobile ? 4 : 6);
      };

      // Set initial value
      checkMobile();

      // Add resize listener
      window.addEventListener('resize', checkMobile);

      // Initialize AOS
      AOS.init({
        once: false,
      });

      // Cleanup
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = (type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  };

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#000000] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificateUrl, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificateUrl} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}