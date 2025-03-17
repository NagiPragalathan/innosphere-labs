"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AICursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [targetElement, setTargetElement] = useState<Element | null>(null);
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over a clickable element
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const clickable = 
        element?.tagName === 'A' || 
        element?.tagName === 'BUTTON' ||
        element?.closest('a') || 
        element?.closest('button') ||
        element?.getAttribute('role') === 'button' ||
        element?.closest('[role="button"]');
      
      setLinkHovered(!!clickable);
      setTargetElement(clickable ? element : null);
    };
    
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    // Hide cursor when it leaves the window
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);
    
    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    
    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);
  
  // AI-themed cursor variants
  const cursorVariants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      opacity: hidden ? 0 : 1,
      height: 32,
      width: 32,
      backgroundColor: "rgba(0, 0, 0, 0)",
      mixBlendMode: "difference" as "difference",
    },
    hover: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
      opacity: hidden ? 0 : 0.8,
      backgroundColor: "rgba(34, 211, 238, 0.1)",
      mixBlendMode: "normal" as "normal",
      borderColor: "rgba(34, 211, 238, 0.6)",
    },
    click: {
      x: position.x - 16,
      y: position.y - 16,
      scale: 0.8,
      opacity: hidden ? 0 : 1,
      backgroundColor: "rgba(34, 211, 238, 0.2)",
    }
  };
  
  // Determine current cursor state
  const cursorState = clicked ? "click" : linkHovered ? "hover" : "default";
  
  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-cyan-400 z-50 pointer-events-none z-100"
        variants={cursorVariants}
        animate={cursorState}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      
      {/* Inner cursor dot */}
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 z-50 pointer-events-none z-100"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: hidden ? 0 : 1,
          scale: clicked ? 0.5 : linkHovered ? 2 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 35,
          mass: 0.2
        }}
      />
      
      {/* AI data particles that follow cursor */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-1 h-1 rounded-full bg-cyan-400 z-50 pointer-events-none z-100"
          animate={{
            x: position.x + Math.cos(i * (Math.PI / 3)) * (linkHovered ? 30 : 20) - 2,
            y: position.y + Math.sin(i * (Math.PI / 3)) * (linkHovered ? 30 : 20) - 2,
            opacity: hidden ? 0 : (clicked ? 0.8 : linkHovered ? 0.6 : 0.4),
            scale: clicked ? 1.5 : linkHovered ? 1.2 : 1
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.8,
            delay: i * 0.02
          }}
        />
      ))}
      
      {/* Hover text indicator for buttons/links */}
      {linkHovered && targetElement && (
        <motion.div
          className="fixed text-xs font-mono text-cyan-400 z-50 pointer-events-none bg-black/80 px-2 py-1 rounded"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.9, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          style={{
            x: position.x + 16,
            y: position.y + 16,
          }}
        >
          {targetElement.tagName === 'A' || targetElement.closest('a') ? 'Click' : 'Action'}
        </motion.div>
      )} 
    </>
  );
};

export default AICursor; 