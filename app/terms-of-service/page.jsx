"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import AICursor from "@/components/AICursor";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

// Tech pattern background component
const TechPattern = () => (
  <div className="absolute inset-0 opacity-10 z-0 pointer-events-none overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full opacity-30">
        <defs>
          <pattern id="tech-grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(100, 200, 255, 0.3)" strokeWidth="0.5"/>
          </pattern>
          <radialGradient id="tech-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(76, 201, 240, 0.1)" />
            <stop offset="100%" stopColor="rgba(67, 97, 238, 0)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-grid)" />
        <circle cx="50" cy="50" r="40" fill="url(#tech-glow)" />
      </svg>
    </div>
    <div className="absolute top-0 left-0 right-0 bottom-0">
      <div className="absolute w-1/2 h-1/2 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full filter blur-3xl"></div>
    </div>
  </div>
);


export default function TermsOfService() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || 
                 'ontouchstart' in window || 
                 navigator.maxTouchPoints > 0);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-black text-white overflow-x-hidden">
      {isLoaded && !isMobile && <AICursor />}
      
      {isLoaded && !isMobile && (
        <style jsx global>{`
          body {
            cursor: none !important;
          }
          a, button, [role="button"] {
            cursor: none !important;
          }
        `}</style>
      )}
      
      <Header />
      
      <main className="relative pt-24 pb-16 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
        <TechPattern />
        
        {/* Digital particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array(10).fill(0).map((_, i) => (
            <div 
              key={i} 
              className="absolute bg-cyan-500 rounded-full opacity-20"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: '0 0 8px 2px rgba(76, 201, 240, 0.3)',
                animation: `float ${Math.random() * 8 + 12}s linear infinite`
              }}
            ></div>
          ))}
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="text-center mb-12 relative"
          >
            {/* Decorative tech elements */}
            <div className="absolute -left-16 top-1/4 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -right-16 bottom-1/4 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl"></div>

            <motion.div 
              className="mb-6 inline-flex h-8 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 px-4 items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-medium text-xs text-cyan-400">LEGAL AGREEMENT</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Terms of Service
              </span>
            </h1>
            <p className="text-gray-400">Effective Date: 31/03/2025</p>
          </motion.div>

          {/* Content sections */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="space-y-8 text-gray-300"
          >
            {/* Acceptance of Terms */}
            <section className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing InnoSphere Labs' services, products, or website, you agree to be bound by these Terms of Service.
              </p>
            </section>

            {/* Services Provided */}
            <section className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Services Provided</h2>
              <p className="leading-relaxed">
                InnoSphere Labs provides AI, Blockchain, Software Development, and Consulting services as detailed in agreements or service contracts.
              </p>
            </section>

            {/* User Responsibilities */}
            <section className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">User Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Maintain accurate and current account information</li>
                <li>Comply with applicable laws and regulations</li>
                <li>Refrain from unauthorized access or interference with our services</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Intellectual Property</h2>
              <p className="leading-relaxed">
                All content, technology, software, and materials provided by InnoSphere Labs are protected by intellectual property rights and remain the exclusive property of InnoSphere Labs.
              </p>
            </section>

            {/* Termination */}
            <section className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Termination</h2>
              <p className="leading-relaxed">
                We reserve the right to terminate or suspend access to our services for violation of terms or for operational or legal reasons.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Limitation of Liability</h2>
              <p className="leading-relaxed">
                InnoSphere Labs is not liable for indirect, incidental, or consequential damages arising from your use of our services.
              </p>
            </section>

            {/* Governing Law */}
            <section className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Governing Law</h2>
              <p className="leading-relaxed">
                These Terms are governed by the laws applicable in the jurisdiction of Chennai, India.
              </p>
            </section>
          </motion.div>
        </div>

        {/* Add animation keyframes */}
        <style jsx>{`
          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-100vh);
            }
            100% {
              transform: translateY(-200vh);
            }
          }
        `}</style>
      </main>
      
      <Footer />
    </div>
  );
}
