"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navItems = [
    { name: "Solutions", href: "#services" },
    { name: "About", href: "#intro" },
    { name: "Why Us", href: "#why-us" },
    { name: "Contact", href: "#contact" }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Add smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
        
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          // Smooth scroll to the target
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100, // Offset for header
            behavior: 'smooth'
          });
          
          // Update URL without causing page jump
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [isMobileMenuOpen]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            InnoSphere Labs
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="text-gray-300 hover:text-cyan-400 transition-colors py-2"
            >
              {item.name}
            </a>
          ))}
          
          <button className="ml-4 px-4 lg:px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md">
          <div className="px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 