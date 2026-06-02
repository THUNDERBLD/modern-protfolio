'use client'

import { useState, useEffect } from "react";
import Home from "@/app/(Pages)/home/page"
import About from "@/app/(Pages)/about/page";
import Experience from "@/app/(Pages)/experience/page";
import AnimatedBackground from "@/app/_components/AnimatedBackground";
import Navbar from "@/app/_components/Navbar";
import Portofolio from "@/app/(Pages)/portofolio/page";
import ContactPage from "@/app/(Pages)/contact/page";
import WelcomeScreen from "@/app/(Pages)/welcome-screen/page";
import { AnimatePresence } from 'framer-motion';
import { usePortfolioContent } from "@/lib/usePortfolioContent";
import CyberpunkPortfolio from "@/app/_themes/cyberpunk/CyberpunkPortfolio";
import CardtreeWidget from "@/app/_components/CardtreeWidget";
import Lenis from "lenis";

const page = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    const { content } = usePortfolioContent();

    useEffect(() => {
        if (showWelcome) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        });

        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            cancelAnimationFrame(rafId);
        };
    }, [showWelcome]);
    
    return (
        <>
            <AnimatePresence mode="wait">
                {showWelcome && (
                    <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
                )}
            </AnimatePresence>
            {!showWelcome && (
                <>
                    {content.settings?.cardtreeWidgetEnabled && <CardtreeWidget />}
                    {content.settings?.activeMode === "cyberpunk" ? (
                        <CyberpunkPortfolio content={content} />
                    ) : (
                        <div className="bg-black">
                            <Navbar />
                            <AnimatedBackground />
                            <Home />
                            <About />
                            <Experience />
                            <Portofolio />
                            <ContactPage />
                            <footer className="text-center">
                                <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6" />
                                <span className="block text-sm pb-4 text-gray-500 dark:text-gray-400">
                                    <a href={content.layout?.footerLink || "#"} className="hover:underline">
                                        {content.layout?.footerText || "© 2025 THUNDER BLOOD. All Rights Reserved."}
                                    </a>
                                </span>
                            </footer>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default page
