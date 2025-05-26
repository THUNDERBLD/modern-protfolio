'use client'

import { useState } from "react";
import Home from "@/app/(Pages)/home/page"
import About from "@/app/(Pages)/about/page";
import AnimatedBackground from "@/app/_components/AnimatedBackground";
import Navbar from "@/app/_components/Navbar";
import Portofolio from "@/app/(Pages)/portofolio/page";
import ContactPage from "@/app/(Pages)/contact/page";
import WelcomeScreen from "@/app/(Pages)/welcome-screen/page";
import { AnimatePresence } from 'framer-motion';

const page = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    
    return (
        <>
            <AnimatePresence mode="wait">
                {showWelcome && (
                    <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
                )}
            </AnimatePresence>
            {!showWelcome && (
                <>
                    <div className="bg-black">
                        <Navbar />
                        <AnimatedBackground />
                        <Home />
                        <About />
                        <Portofolio />
                        <ContactPage />
                        <footer className="text-center">
                            <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6" />
                            <span className="block text-sm pb-4 text-gray-500 dark:text-gray-400">
                                © 2025{" "}
                                <a href="https://flowbite.com/" className="hover:underline">
                                    THUNDER BLOOD
                                </a>
                                . All Rights Reserved.
                            </span>
                        </footer>
                    </div>
                </>
            )}
        </>
    );
}

export default page