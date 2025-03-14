"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

const IntroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (!sectionRef.current || !isInView) return;
    
    // Animate code blocks in the background
    const codeBlocks = document.querySelectorAll('.code-line');
    
    gsap.fromTo(codeBlocks, 
      { opacity: 0, x: -20 },
      { 
        opacity: 0.7, 
        x: 0, 
        stagger: 0.1, 
        duration: 0.5,
        ease: "power2.out"
      }
    );
  }, [isInView]);
  
  return (
    <section 
      id="intro" 
      className="relative py-16 sm:py-24 px-4 sm:px-8 md:px-16 overflow-hidden bg-black/50 backdrop-blur-sm"
    >
      {/* Background code effect */}
      <div className="absolute -left-10 top-0 bottom-0 w-1/3 opacity-10 font-mono text-xs overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="code-line my-2 text-cyan-400">
            {`import { AI, Blockchain } from '@innosphere/core';`}
          </div>
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Introduction
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              At InnoSphere, we don't just innovate—we orchestrate ecosystems of possibility. By bridging visionary ideas with collaborative execution, we turn raw potential into scalable breakthroughs.
            </p>
          </div>
          
          <div>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              Our creators, technologists, and industry disruptors exists to fuel your next leap—not just through tools, but through transformative partnerships.
            </p>
          </div>
        </div>
        
        {/* Simple separator */}
        <div className="my-12 sm:my-16 h-px w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
      </div>
    </section>
  );
};

export default IntroSection; 