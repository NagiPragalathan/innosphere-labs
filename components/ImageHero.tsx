"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";

const ImageHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (!heroRef.current || !headlineRef.current) return;
    
    // Split text for character animation
    const headlineText = new SplitType(headlineRef.current, { types: 'chars' });
    const chars = headlineText.chars;
    
    if (!chars) return;
    
    // GSAP timeline for hero animations
    const tl = gsap.timeline();
    
    // Animate headline characters
    tl.fromTo(chars, 
      { 
        y: 100, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.02, 
        duration: 0.8, 
        ease: "power3.out" 
      }
    );
    
    // Completely revamped typing effect
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
      const originalText = typewriterElement.textContent || '';
      
      // Clear the element and prepare for typing
      typewriterElement.innerHTML = '';
      
      // Create a container for the text with proper wrapping
      const textContainer = document.createElement('span');
      textContainer.className = 'typing-content';
      typewriterElement.appendChild(textContainer);
      
      // Add the cursor element
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      cursor.textContent = '|';
      typewriterElement.appendChild(cursor);
      
      // Initialize typing variables
      let i = 0;
      const typeSpeed = 30; // ms per character
      
      // Start cursor blinking animation
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
      
      // The typing function
      const typeEffect = () => {
        if (i < originalText.length) {
          // Add next character
          textContainer.textContent += originalText.charAt(i);
          i++;
          
          // Random slight variation in typing speed for realism
          const randomDelay = typeSpeed * (0.8 + Math.random() * 0.4);
          
          // Add brief pause at punctuation
          const currentChar = originalText.charAt(i-1);
          const pauseChars = ['.', ',', '!', '?', ';', ':'];
          const extraDelay = pauseChars.includes(currentChar) ? 300 : 0;
          
          setTimeout(typeEffect, randomDelay + extraDelay);
        } else {
          // Typing complete - remove cursor after a brief pause
          setTimeout(() => {
            gsap.to(cursor, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                cursor.remove();
              }
            });
          }, 1000);
        }
      };
      
      // Start typing effect after headline animation
      tl.call(typeEffect);
    }
    
    // Animate decorative elements
    gsap.fromTo('.hero-decoration', 
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 1, 
        ease: "elastic.out(1, 0.5)",
        delay: 0.5
      }
    );
    
    // Particle effect
    const createParticles = () => {
      const particleContainer = document.querySelector('.particle-container');
      if (!particleContainer) return;
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 rounded-full bg-cyan-400 opacity-0';
        
        // Random position around the headline
        const x = Math.random() * 800 - 400;
        const y = Math.random() * 400 - 200;
        
        gsap.set(particle, { x, y });
        particleContainer.appendChild(particle);
        
        // Animate particle
        gsap.to(particle, {
          x: x + (Math.random() * 200 - 100),
          y: y + (Math.random() * 200 - 100),
          opacity: Math.random() * 0.5,
          duration: 2 + Math.random() * 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 2
        });
      }
    };
    
    createParticles();
    
    return () => {
      tl.kill();
      gsap.killTweensOf('.hero-decoration');
      gsap.killTweensOf('.particle-container > div');
    };
  }, []);
  
  return (
    <>
      <style jsx global>{`
        .typewriter-text {
          position: relative;
          display: inline-block;
          width: 100%;
          max-width: 100%;
          text-align: center;
        }
        
        .typing-content {
          white-space: pre-wrap;
          word-break: break-word;
        }
        
        .typing-cursor {
          display: inline-block;
          color: #22d3ee; /* Cyan-400 color */
          font-weight: 400;
          margin-left: 1px;
          position: relative;
          animation: blink 0.7s infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .illustration-holder {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .main-illustration {
          width: 100%;
          height: auto;
          position: relative;
          z-index: 2;
        }

        .shapes {
          position: absolute;
          z-index: 1;
        }

        .shape-one {
          position: absolute;
          z-index: 2;
          top: -4vh;
          width: 140px;
          left: 21vh;
          animation: float 6s ease-in-out infinite, rotate 12s linear infinite;
        }

        .shape-two {
          bottom: -10%;
          left: -10%;
          width: 40%;
          height: auto;
          animation: float 8s ease-in-out infinite;
        }

        .shape-three {
          top: 40%;
          right: -20%;
          width: 35%;
          height: auto;
          animation: float 7s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      
      <section 
        ref={heroRef}
        id="hero" 
        className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-20"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hero-decoration absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-500/20 rounded-full"></div>
          <div className="hero-decoration absolute bottom-1/3 right-1/4 w-40 h-40 border border-purple-500/20 rounded-full"></div>
          <div className="hero-decoration absolute top-1/3 right-1/3 w-24 h-24 border border-cyan-500/20 rounded-full"></div>
          <div className="particle-container absolute inset-0 flex items-center justify-center"></div>
        </div>
        
        <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          {/* Left side - Content */}
          <div className="w-full lg:w-1/2 text-left lg:pr-8">
            <motion.div
              className="mb-4 inline-block !mt-[35px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="!text-[14px] !font-bold px-4 py-1 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-full text-sm font-medium border border-cyan-500/20">
                Where Innovation Meets Collective Genius
              </span>
            </motion.div>
            
            <h1 
              ref={headlineRef}
              className="text-5xl sm:text-7xl font-bold tracking-tight mb-6"
            >
            </h1>
            
            <motion.h3 
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Transforming Enterprise Solutions with 
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent ml-2">
                AI, Blockchain, & Custom Software
              </span>
            </motion.h3>
            
            <motion.div 
              className="typewriter-container mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <p className="typewriter-text text-lg sm:text-xl text-gray-300">
              Empower your business with Advanced AI-driven automation, robust blockchain security, and tailor-made software solutions.
              </p>
            </motion.div>
            
            <div className="flex gap-6 items-center flex-col sm:flex-row mt-10">
              <motion.a
                href="#services"
                className="relative overflow-hidden rounded-full border border-solid border-transparent flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-600 text-white gap-2 font-medium text-base sm:text-lg h-14 sm:h-16 px-8 sm:px-10 w-full sm:w-auto max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Explore Solutions</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.a>
              
              <motion.a
                href="#why-us"
                className="rounded-full border border-solid border-cyan-500/30 flex items-center justify-center hover:bg-cyan-950/30 transition-colors font-medium text-base sm:text-lg h-14 sm:h-16 px-8 sm:px-10 w-full sm:w-auto max-w-xs group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Why Choose Us</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </div>
          </div>
          
          {/* Right side - 3D Illustration */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="relative w-full max-w-md xl:max-w-lg">
              <div className="absolute -inset-1"></div>
              <div className="illustration-holder relative">
                <img 
                  src="https://eduwallets.com/images/assets/ils_13.svg" 
                  alt="Main Illustration" 
                  className="main-illustration w-full h-auto z-10"
                />
                <img 
                  src="https://eduwallets.com/images/assets/ils_13_1.svg" 
                  alt="Shape One" 
                  className="shapes shape-one absolute"
                  style={{
                    zIndex: 2,
                    width: '140px',
                    left: '21vh',
                    animation: 'float 6s ease-in-out infinite, rotate 12s linear infinite'
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span className="text-sm text-gray-400 mb-2">Discover More</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1 h-2 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full"
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default ImageHero; 