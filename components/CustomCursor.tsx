"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;
    const cursorTrail = cursorTrailRef.current;
    
    if (!cursor || !cursorRing || !cursorTrail) return;
    
    // Create trail effect
    const trailElements: HTMLDivElement[] = [];
    const trailCount = 5;
    
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = 'absolute rounded-full bg-cyan-400 opacity-0';
      trail.style.width = '4px';
      trail.style.height = '4px';
      cursorTrail.appendChild(trail);
      trailElements.push(trail);
    }
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      // Main cursor dot
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
      
      // Cursor ring
      gsap.to(cursorRing, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Trail effect
      trailElements.forEach((trail, index) => {
        gsap.to(trail, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3 + (index * 0.08),
          ease: "power2.out",
          opacity: 0.7 - (index * 0.1),
          scale: 1 - (index * 0.15)
        });
      });
    };
    
    // Handle hover states
    const handleMouseEnter = () => {
      gsap.to(cursorRing, {
        scale: 1.5,
        opacity: 0.5,
        duration: 0.3
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(cursorRing, {
        scale: 1,
        opacity: 1,
        duration: 0.3
      });
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-cursor-interactive]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      trailElements.forEach(trail => trail.remove());
    };
  }, []);
  
  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div 
        ref={cursorRingRef} 
        className="fixed w-10 h-10 border-2 border-cyan-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div
        ref={cursorTrailRef}
        className="fixed pointer-events-none z-40"
      />
    </>
  );
};

export default CustomCursor; 