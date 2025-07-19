"use client";

import React from 'react';
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import AICursor from "@/components/AICursor";
import Contact from "@/components/Contact";
import Link from "next/link";
import Image from "next/image";

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

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Tech-themed digital counter component
const DigitalCounter = ({ number, label }: { number: string; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="!p-[4px] text-base sm:text-lg md:text-xl font-mono bg-gradient-to-b from-gray-800 to-gray-900 
                  border border-gray-700 rounded-md px-2 py-1 shadow-inner shadow-cyan-500/10
                  relative overflow-hidden w-full text-center">
      <span className="relative z-10 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent font-bold">
        {number}
      </span>
      <div className="absolute inset-0 grid grid-cols-8 opacity-20 pointer-events-none">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="h-full w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
        ))}
      </div>
    </div>
    <span className="text-[10px] sm:text-xs text-gray-400 mt-1 font-mono uppercase tracking-wider">{label}</span>
  </div>
);

// Abstract tech background pattern
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

// Updated industry section with less code styling but some tech elements
const IndustrySection = ({ 
  title, 
  subtitle, 
  description, 
  features,
  impact = "",
  gradient = "from-cyan-400 to-purple-600",
  bgGradient = "from-gray-900/40 to-black/40",
  icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>,
  index = 1
}: {
  title: string;
  subtitle: string;
  description?: string;
  features: string[];
  impact?: string;
  gradient?: string;
  bgGradient?: string;
  icon?: React.ReactNode;
  index?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.section 
      ref={ref}
      className="py-24 px-4 sm:px-8 relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      {/* Tech-themed background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
      <TechPattern />
      
      {/* Subtle gradient borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-cyan-500/40"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-purple-500/40 via-cyan-500/40 to-purple-500/40"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      {/* Simple section indicator */}
      <div className="absolute left-4 lg:left-8 top-4 lg:top-8 font-sans text-xs lg:text-sm px-3 py-1 bg-gray-900/80 border-l-2 border-cyan-500 rounded-r-md">
        <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent font-medium`}>
          {index.toString().padStart(2, '0')}
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left sidebar with tech elements - improved layout */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-24 flex flex-col space-y-8">
              {/* Icon display */}
              <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${gradient} p-0.5 shadow-lg shadow-purple-500/20 hidden lg:block mx-auto`}>
                <div className="h-full w-full flex items-center justify-center bg-gray-900 rounded-[10px] text-3xl">
                  {icon}
                </div>
              </div>
              
              {/* Tech metrics - side by side with proper spacing */}
              <div className="hidden lg:block p-4 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-800">
                <div className="grid grid-cols-3 gap-4">
                  <DigitalCounter number="99%" label="EFFICIENCY" />
                  <DigitalCounter number="10+" label="PARTNERS" />
                  <DigitalCounter number="24/7" label="SUPPORT" />
                </div>
              </div>
              
              {/* Feature highlights - less code-like, more business-oriented */}
              <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-lg p-5 shadow-lg hidden lg:block">
                <h4 className="text-lg font-medium mb-3 text-white">Key Benefits</h4>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} mr-2`}></div>
                    <span>Enhanced Efficiency</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} mr-2`}></div>
                    <span>Secure Operations</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} mr-2`}></div>
                    <span>Seamless Integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div className="relative">
              {/* Decorative tech elements */}
              <div className="absolute -left-16 top-1/4 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-3xl hidden lg:block"></div>
              <div className="absolute -right-16 bottom-1/4 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl hidden lg:block"></div>
              
              {/* Title area with digital design elements */}
              <div className="relative mb-12">
                <div className="flex flex-wrap items-center mb-3">
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center lg:hidden mr-3`}>
                    <span className="text-xl">{icon}</span>
                  </div>
                  
                  <div className="flex-1">
                    <motion.h2 
                      className="text-3xl sm:text-4xl font-bold"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent inline-block`}>
                        {title}
                      </span>
                    </motion.h2>
                  </div>
                  
                  {/* Mobile tech metrics - improved spacing */}
                  <div className="w-full mt-6 lg:hidden">
                    <div className="grid grid-cols-3 gap-3">
                      <DigitalCounter number="99%" label="EFFICIENCY" />
                      <DigitalCounter number="247+" label="CLIENTS" />
                      <DigitalCounter number="24/7" label="SUPPORT" />
                    </div>
                  </div>
                </div>
                
                <motion.h3 
                  className="text-xl sm:text-2xl text-gray-100 font-medium mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {subtitle}
                </motion.h3>
                
                {/* Simple underline */}
                <div className="flex items-center space-x-2 mb-8">
                  <div className={`h-0.5 w-16 bg-gradient-to-r ${gradient}`}></div>
                  <div className="h-px flex-1 bg-gray-800"></div>
                </div>
              </div>
              
              {/* Description with tech styling */}
              {description && (
                <motion.div 
                  className="mb-12 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
                  <p className="text-lg text-gray-300 pl-6 leading-relaxed max-w-4xl">
                    {description}
                  </p>
                </motion.div>
              )}
              
              {/* Features list - simplified styling */}
              <motion.div 
                className="space-y-6 mb-12"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {features.map((feature, i) => (
                  <motion.div 
                    key={i}
                    className="relative group"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        transition: { duration: 0.5, delay: i * 0.1 }
                      }
                    }}
                  >
                    <div className="absolute -left-2 -top-2 -bottom-2 -right-2 bg-gradient-to-r from-gray-900 to-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="flex items-start relative z-10 group-hover:translate-y-0.5 transition-transform duration-300">
                      {/* Feature bullet - simplified */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-md mr-4 bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-medium`}>
                        {i + 1}
                      </div>
                      
                      {/* Feature content */}
                      <div className="flex-1 pt-1">
                        <p className="text-lg text-gray-200 group-hover:text-white transition-colors duration-300">
                          {feature}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Impact section - simplified styling */}
              {impact && (
                <motion.div 
                  className="relative mt-12 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <div className={`bg-gradient-to-r ${bgGradient} backdrop-blur-md border border-gray-800 rounded-lg overflow-hidden shadow-xl p-6`}>
                    <h4 className={`text-xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-3`}>
                      Impact
                    </h4>
                    <p className="text-white">{impact}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// Modern tech hero with some code elements, but more balanced
const TechHero = () => {
  return (
    <section className="relative py-32 px-4 sm:px-8 overflow-hidden">
      {/* Tech-themed background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black z-0"></div>
      <TechPattern />
      
      {/* Grid decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
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
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          {/* Digital badge */}
          <motion.div 
            className="mb-6 inline-flex h-8 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 px-4 items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-medium text-xs text-cyan-400">INNOVATION • TECHNOLOGY • SOLUTIONS</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent inline-block">
              Industry Solutions
            </span>
          </motion.h1>
          
          <motion.div 
            className="max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
              Revolutionizing industries with cutting-edge
              <span className="mx-2 inline-block px-2 py-1 bg-cyan-900/30 text-cyan-400 font-medium rounded border border-cyan-800/50">AI</span>
              &
              <span className="ml-2 inline-block px-2 py-1 bg-purple-900/30 text-purple-400 font-medium rounded border border-purple-800/50">blockchain</span>
              technology solutions
            </p>
          </motion.div>
          
          {/* Metrics cards */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Industries</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">10+</div>
            </div>
            
            <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Solutions</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">25+</div>
            </div>
            
            <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Clients</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">50+</div>
            </div>
          </motion.div>
          
          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link 
              href="/#contact"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium 
                      hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Schedule a Consultation</span>
              <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_200%] bg-[position:0%_0%] group-hover:bg-[position:100%_100%]`}></div>
            </Link>
            
            <Link 
              href="/product"
              className="px-8 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-medium 
                      hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 relative group overflow-hidden"
            >
              <span className="relative z-10">View All Products</span>
              <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/80 to-purple-600/0 
                            transform translate-y-full group-hover:translate-y-0 transition-transform duration-300`}></div>
            </Link>
          </motion.div>
        </div>
        
        {/* Feature highlights with some code elements */}
        <motion.div 
          className="relative max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-lg overflow-hidden shadow-xl">
            {/* Feature header */}
            <div className="bg-gray-800 px-4 py-2 flex items-center">
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center text-xs text-gray-400 font-medium">Core Technologies</div>
            </div>
            
            {/* Feature content */}
            <div className="p-6 relative">
              <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full flex flex-wrap content-center text-[8px] text-cyan-500 overflow-hidden">
                  {Array(20).fill(0).map((_, i) => (
                    <div key={i} className="whitespace-nowrap">
                      01001010 10101110 01001010 10101110 01001010 10101110
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-900/30 flex items-center justify-center text-cyan-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Artificial Intelligence</h3>
                      <p className="text-gray-400 text-sm">Smart automation & insights</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-900/30 flex items-center justify-center text-purple-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Blockchain</h3>
                      <p className="text-gray-400 text-sm">Security & traceability</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Cloud Architecture</h3>
                      <p className="text-gray-400 text-sm">Scalable & reliable</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-green-900/30 flex items-center justify-center text-green-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Data Analytics</h3>
                      <p className="text-gray-400 text-sm">Actionable insights</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* SVG connection lines */}
          <svg className="absolute -bottom-10 left-1/2 transform -translate-x-1/2" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0V40" stroke="url(#grad1)" strokeWidth="1" strokeDasharray="4 4" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4CC9F0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4CC9F0" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-scroll-indicator"></div>
        </div>
      </div>
      
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
        @keyframes scroll-indicator {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          75% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 0;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

// Modern CTA with some tech elements
const TechCTA = () => (
  <section className="py-24 px-4 sm:px-8 relative overflow-hidden">
    {/* Tech-themed background */}
    <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
    <TechPattern />
    
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left content section */}
          <div className="p-8 lg:p-12">
            <div className="mb-6 inline-flex h-8 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 px-4 items-center">
              <span className="text-xs text-cyan-400 font-medium">TRANSFORM YOUR BUSINESS</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Start Your Digital Transformation
              </span>
            </h2>
            
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
              Our team of experts is ready to help you implement cutting-edge technology solutions tailored to your specific industry needs and challenges.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/#contact"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium 
                        hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center"
              >
                <span>Schedule a Consultation</span>
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Right image/graphic section */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-pink-500/5 to-orange-500/5"></div>
            
            {/* Modern geometric pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-96 h-96">
                {/* Hexagonal grid pattern */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 border-2 border-indigo-500/20"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      transform: `rotate(${i * 60}deg) scale(${0.8 + i * 0.1})`,
                      animation: `pulse ${3 + i}s ease-in-out infinite alternate`
                    }}
                  ></div>
                ))}

                {/* Central element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-xl transform rotate-45 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      {/* Innovation/Tech Icon */}
                      <svg
                        className="w-12 h-12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float ${5 + i * 2}s ease-in-out infinite alternate`,
                      opacity: 0.6
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Modern code snippet */}
            <div className="absolute bottom-8 right-8 p-4 bg-black/5 rounded-xl backdrop-blur-sm">
              <div className="text-xs font-mono space-y-1">
                <div className="text-pink-500/70">{"async function innovateIndustry() {"}</div>
                <div className="text-indigo-500/70">{"  const future = await transform();"}</div>
                <div className="text-pink-500/70">{"  return future.optimize();"}</div>
                <div className="text-indigo-500/70">{"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <style jsx>{`
      @keyframes orbit {
        0% {
          transform: rotate(0deg) translateX(120px) rotate(0deg);
        }
        100% {
          transform: rotate(360deg) translateX(120px) rotate(-360deg);
        }
      }
    `}</style>
  </section>
);

export default function IndustryPage() {
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
    
    return () => {
      window.removeEventListener('resize', checkMobile);
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
        <TechHero />
        
        {/* Healthcare Section */}
        <IndustrySection
          title="Healthcare Industry"
          subtitle="AI & Blockchain-Powered Innovations"
          description="At InnoSphere Labs (ISLABS), we are revolutionizing healthcare IT with AI-driven automation, blockchain security, and next-gen interoperability solutions. Our expertise extends across hospitals, diagnostic labs, and healthcare providers, ensuring efficiency, compliance, and patient-centric innovations."
          features={[]}
          gradient="from-cyan-400 to-blue-600"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>}
          index={1}
        />

        {/* CareSync Section */}
        <IndustrySection
          title="CareSync"
          subtitle="AI-Driven Nurse Acuity & Scheduling"
          features={[
            "AI-powered shift scheduling based on patient acuity & nurse skill levels.",
            "Predictive workload balancing to reduce burnout & improve patient care.",
            "Real-time integration with HIS, EMR, and Payroll systems via FHIR & HL7 APIs."
          ]}
          gradient="from-cyan-500 to-teal-600"
          bgGradient="from-teal-900/20 to-black/50"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>}
          index={2}
        />

        {/* DocChain Section */}
        <IndustrySection
          title="AI-Powered Medical Document Management (DocChain)"
          subtitle="Intelligent Document Processing for Healthcare"
          features={[
            "OCR-based digital transformation of prescriptions, patient records, and medical reports.",
            "Blockchain-powered EHR security ensuring tamper-proof records & patient data privacy.",
            "Automated AI-driven document classification, tagging, and summarization."
          ]}
          gradient="from-teal-400 to-blue-600"
          bgGradient="from-blue-900/20 to-black/50"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>}
          index={3}
        />

        {/* Education Section */}
        <IndustrySection
          title="Education"
          subtitle="AI & Blockchain-Powered Smart Learning Solutions"
          description="We empower educational institutions with intelligent automation and blockchain-secured systems to modernize learning and administration"
          features={[
            "AI-Powered Exam Generation & Grading (AI-QGEN)",
            "Blockchain-Based Digital Certificates & Academic Records",
            "Student Access & Gate Pass Management (UniPass)",
            "Personalized Learning & AI-Powered Chatbots"
          ]}
          impact="Streamlined administration, improved student engagement, and enhanced security of academic credentials."
          gradient="from-purple-400 to-indigo-600"
          bgGradient="from-indigo-900/20 to-black/50"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>}
          index={4}
        />

        {/* CTA Section */}
        <TechCTA />
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
