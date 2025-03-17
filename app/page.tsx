"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ImageHero from "@/components/ImageHero";
import IntroSection from "@/components/IntroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import Footer from "@/components/Footer";
import AICursor from "@/components/AICursor";
import ScrollIndicator from "@/components/ScrollIndicator";
import Contact from "@/components/Contact";
import Link from "next/link";

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    }
  }
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Check if device is mobile/touch (don't show custom cursor on touch devices)
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || 
                 'ontouchstart' in window || 
                 navigator.maxTouchPoints > 0);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Add smooth scrolling behavior to the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-black text-white overflow-x-hidden">
      {isLoaded && !isMobile && <AICursor />}
      
      {/* Hide default cursor when custom cursor is active */}
      {isLoaded && !isMobile && (
        <style jsx global>{`
          body {
            cursor: none !important;
          }
          a, button, [role="button"], input[type="submit"], input[type="button"] {
            cursor: none !important;
          }
        `}</style>
      )}
      
      <Header />
      <ScrollIndicator />
      
      <main className="overflow-x-hidden">
        {/* <HeroSection /> */}
        <ImageHero />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <IntroSection />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <ServicesSection />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <WhyUsSection />
        </motion.div>
        
        <section className="py-20 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Explore Our Products
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10">
              Discover our comprehensive suite of innovative solutions designed to transform your business
            </p>
            <Link 
              href="/products"
              className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              View All Products
            </Link>
          </div>
        </section>
      </main>
      
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Contact />
        <Footer />
      </motion.footer>
    </div>
  );
}
