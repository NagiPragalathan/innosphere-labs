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

// Updated TechPattern component with blue blur circles
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

export default function PrivacyPolicy() {
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
        {/* Updated background elements */}
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
          {/* Header section with enhanced styling */}
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
              <span className="font-medium text-xs text-cyan-400">PRIVACY & SECURITY</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Privacy Policy
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
            {/* Introduction */}
            <section className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Introduction</h2>
              <p className="leading-relaxed">
                InnoSphere Labs ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy describes our practices regarding the collection, use, disclosure, and safeguarding of your personal information when you interact with our website, applications, products, and services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-cyan-400 mb-2">Personal Information</h3>
                  <p>Name, email address, phone number, job title, company name, and payment information when applicable.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-400 mb-2">Technical Information</h3>
                  <p>IP address, browser type, device type, access times, pages visited, and other relevant analytics data.</p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Providing, maintaining, and improving our services</li>
                <li>Communicating with you regarding our products, updates, and promotional offers</li>
                <li>Ensuring compliance with legal obligations</li>
                <li>Enhancing security and preventing fraud</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Information Sharing</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>We do not sell personal information.</li>
                <li>We may share information with trusted third-party service providers necessary to deliver our services, under strict confidentiality agreements.</li>
                <li>We may disclose your information if required by law or to protect our rights and property.</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Data Security</h2>
              <p className="leading-relaxed">
                We implement industry-standard security measures, including encryption, firewalls, and secure authentication mechanisms, to safeguard your information.
              </p>
            </section>

            {/* Data Retention */}
            <section className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Data Retention</h2>
              <p className="leading-relaxed">
                We retain personal data only as long as necessary to fulfill the purposes outlined or as required by law.
              </p>
            </section>

            {/* Your Rights */}
            <section className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Your Rights</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Access, update, or delete your personal information</li>
                <li>Withdraw consent at any time</li>
                <li>Request information regarding data processing</li>
              </ul>
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
