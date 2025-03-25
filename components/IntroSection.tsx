"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const IntroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Set a timeout to ensure the component is mounted
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section 
      id="intro" 
      className="py-20 px-4 sm:px-8 bg-gray-900/30"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Introduction
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            At InnoSphere, we don't just innovate we orchestrate ecosystems of possibility. By bridging visionary ideas with collaborative execution, we turn raw potential into scalable breakthroughs. Our creators, technologists, and industry disruptors exists to fuel your next leap not just through tools, but through transformative partnerships.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection; 