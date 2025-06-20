"use client";

import { useEffect, useState, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AICursor from "@/components/AICursor";
import ScrollIndicator from "@/components/ScrollIndicator";
import Link from "next/link";
import services from "./details/documents";
import ReactMarkdown from 'react-markdown';

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

// Animation variants for service cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({ 
    opacity: 1, 
    scale: 1,
    transition: { 
      delay: i * 0.1,
      duration: 0.5, 
      ease: "easeOut" 
    }
  })
};

// Modal animation variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.3, 
      ease: "easeOut" 
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

interface MarkdownComponentProps {
  node?: any;
  children?: ReactNode;
  inline?: boolean;
  [key: string]: any;
}

// Custom components for ReactMarkdown with improved styling
const MarkdownComponents = {
  h1: ({node, ...props}: MarkdownComponentProps) => (
    <h1 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-3xl font-bold text-white mb-6 mt-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent scroll-mt-20" {...props} />
  ),
  h2: ({node, ...props}: MarkdownComponentProps) => (
    <h2 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-2xl font-bold text-white mb-5 mt-8 flex items-center scroll-mt-20">
      <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-cyan-500 to-purple-600 mr-3 rounded-full"></span>
      <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">{props.children}</span>
    </h2>
  ),
  h3: ({node, ...props}: MarkdownComponentProps) => (
    <h3 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-xl font-semibold text-white mb-4 mt-6 text-cyan-300 scroll-mt-20" {...props} />
  ),
  p: ({node, ...props}: MarkdownComponentProps) => (
    <p className="text-gray-300 mb-4 leading-relaxed text-base" {...props} />
  ),
  ul: ({node, ...props}: MarkdownComponentProps) => (
    <ul className="list-none pl-0 mb-6 space-y-3 text-gray-300" {...props} />
  ),
  li: ({node, ...props}: MarkdownComponentProps) => (
    <li className="flex items-start mb-2">
      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center mt-1 mr-3">
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span>{props.children}</span>
    </li>
  ),
  code: ({node, inline, ...props}: MarkdownComponentProps & { inline?: boolean }) => 
    inline ? (
      <code className="bg-black/40 px-1.5 py-0.5 rounded text-cyan-400 font-mono" {...props} />
    ) : (
      <code className="block bg-black/40 p-4 rounded-lg my-4 text-cyan-400 font-mono overflow-x-auto" {...props} />
    ),
  pre: ({node, ...props}: MarkdownComponentProps) => (
    <pre className="bg-black/40 p-5 rounded-xl my-6 border border-gray-700/30 overflow-x-auto shadow-lg" {...props} />
  ),
  strong: ({node, ...props}: MarkdownComponentProps) => (
    <strong className="font-semibold text-cyan-300" {...props} />
  ),
  em: ({node, ...props}: MarkdownComponentProps) => (
    <em className="text-purple-300 font-italic" {...props} />
  ),
  blockquote: ({node, ...props}: MarkdownComponentProps) => (
    <blockquote className="border-l-4 border-cyan-500 pl-4 py-2 my-4 bg-cyan-900/20 rounded-r-lg" {...props} />
  ),
};

// Function to extract main headings for table of contents
const extractMainHeadings = (markdown: string) => {
  const headingRegex = /^(#{1,2})\s+(.+)$/gm;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/\s+/g, '-');
    
    headings.push({ level, text, id });
  }
  
  return headings;
};

// Update the CodeBackground component with explicit canvas styling
const CodeBackground = ({ color }: { color: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size based on parent element
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    // Initial resize
    resizeCanvas();

    // Add resize listener
    window.addEventListener('resize', resizeCanvas);
    
    // Rest of your existing canvas code...
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]()<>/\\|=+-*&^%$#@!~';
    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(1);
    
    // Parse the color to get RGB values for the gradient
    const getColorValues = (colorStr: string) => {
      if (colorStr.includes('from-')) {
        const fromMatch = colorStr.match(/from-([a-z]+-\d+)/);
        const toMatch = colorStr.match(/to-([a-z]+-\d+)/);
        return { 
          from: fromMatch ? fromMatch[1] : 'cyan-500',
          to: toMatch ? toMatch[1] : 'purple-600'
        };
      }
      return { from: 'cyan-500', to: 'purple-600' };
    };
    
    const colors = getColorValues(color);
    
    // Create gradient based on the service color
    const getGradientColor = (y: number) => {
      const ratio = y / canvas.height;
      const fromColor = getTailwindColor(colors.from);
      const toColor = getTailwindColor(colors.to);
      return interpolateColor(fromColor, toColor, ratio);
    };
    
    function getTailwindColor(colorName: string) {
      const colorMap = {
        'blue-400': '#60a5fa',
        'blue-500': '#3b82f6',
        'blue-600': '#2563eb',
        'indigo-600': '#4f46e5',
        'cyan-400': '#22d3ee',
        'cyan-500': '#06b6d4',
        'cyan-600': '#0891b2',
        'purple-500': '#a855f7',
        'purple-600': '#9333ea',
        'green-400': '#4ade80',
        'green-500': '#22c55e',
        'teal-600': '#0d9488',
        'pink-500': '#ec4899',
        'pink-600': '#db2777',
        'yellow-400': '#facc15',
        'orange-600': '#ea580c',
        'red-400': '#f87171',
        'amber-500': '#f59e0b',
      };
      return colorMap[colorName as keyof typeof colorMap] || '#3b82f6';
    }
    
    function interpolateColor(color1: string, color2: string, factor: number) {
      const r1 = parseInt(color1.slice(1, 3), 16);
      const g1 = parseInt(color1.slice(3, 5), 16);
      const b1 = parseInt(color1.slice(5, 7), 16);
      
      const r2 = parseInt(color2.slice(1, 3), 16);
      const g2 = parseInt(color2.slice(3, 5), 16);
      const b2 = parseInt(color2.slice(5, 7), 16);
      
      const r = Math.round(r1 + factor * (r2 - r1));
      const g = Math.round(g1 + factor * (g2 - g1));
      const b = Math.round(b1 + factor * (b2 - b1));
      
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    
    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < drops.length; i++) {
        // Get a random character
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Get color based on position
        ctx.fillStyle = getGradientColor(drops[i] * 20);
        
        // Draw the character
        ctx.font = '15px monospace';
        ctx.fillText(text, i * 20, drops[i] * 20);
        
        // Reset if it's at the bottom or randomly
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move the drop down
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 50);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [color]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0" 
      style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  );
};

export default function Services() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  
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

  // Function to render markdown content with improved formatting and styling
  const renderMarkdown = (content: string) => {
    const sections = content.split('\n\n## ').map((section, index) => {
      if (index === 0) {
        // Handle the first section which includes the title
        const titleParts = section.split('\n\n');
        const title = titleParts[0].replace('# ', '');
        const overview = titleParts.slice(1).join('\n\n');
        
        return (
          <div key={`section-title`} className="mb-12">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">{overview}</p>
          </div>
        );
      } else {
        // Handle other sections
        const sectionParts = section.split('\n\n');
        const sectionTitle = sectionParts[0];
        const sectionContent = sectionParts.slice(1).join('\n\n');
        
        return (
          <div key={`section-${index}`} className="mb-16">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center mr-4 shadow-lg">
                {getSectionIcon(sectionTitle)}
              </div>
              <h2 className="text-2xl font-bold text-white">
                {sectionTitle}
              </h2>
            </div>
            <div className="ml-16">
              {renderSectionContent(sectionContent, sectionTitle)}
            </div>
          </div>
        );
      }
    });
    
    return <div className="space-y-8">{sections}</div>;
  };

  // Helper function to get appropriate icon for each section
  const getSectionIcon = (sectionTitle: string) => {
    switch (sectionTitle.toLowerCase()) {
      case 'overview':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'key capabilities':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'implementation process':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'success stories':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      case 'get started':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'technologies we work with':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'our services':
      case 'consulting services':
      case 'design capabilities':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'our design process':
      case 'development process':
      case 'our process':
      case 'our approach':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
        );
      case 'benefits':
      case 'why choose us':
      case 'why our design stands out':
      case 'success factors':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'cloud platforms':
      case 'transformation areas':
      case 'talent expertise':
      case 'engagement models':
      case 'design deliverables':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      case 'quality assurance':
      case 'implementation methodology':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Helper function to render section content based on section type
  const renderSectionContent = (content: string, sectionTitle: string) => {
    const lines = content.split('\n');
    
    // Check if this is a list section
    if (lines.some(line => line.trim().startsWith('-'))) {
      return (
        <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg">
          <ul className="space-y-4">
            {lines.filter(line => line.trim()).map((line, idx) => {
              if (line.trim().startsWith('-')) {
                const text = line.trim().substring(2);
                const parts = text.split(':');
                
                if (parts.length > 1) {
                  const [label, description] = parts;
                  return (
                    <li key={idx} className="flex items-start group">
                      <span className="text-cyan-400 mr-3 mt-1 transform group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <div>
                        <span className="text-cyan-300 font-medium">{label}:</span>
                        <span className="text-gray-300 ml-1">{description}</span>
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li key={idx} className="flex items-start group">
                      <span className="text-cyan-400 mr-3 mt-1 transform group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-300">{text}</span>
                    </li>
                  );
                }
              }
              return null;
            })}
          </ul>
        </div>
      );
    }
    
    // Check if this is a numbered list section
    if (lines.some(line => /^\d+\./.test(line.trim()))) {
      return (
        <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg">
          <ol className="space-y-5">
            {lines.filter(line => line.trim()).map((line, idx) => {
              const match = line.trim().match(/^(\d+)\.\s+(.*)/);
              if (match) {
                const [, number, text] = match;
                const parts = text.split(':');
                
                if (parts.length > 1) {
                  const [label, description] = parts;
                  return (
                    <li key={idx} className="flex items-start group">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center mr-4 text-white font-medium text-sm group-hover:scale-110 transition-transform">
                        {number}
                      </span>
                      <div>
                        <span className="text-cyan-300 font-medium">{label}:</span>
                        <span className="text-gray-300 ml-1">{description}</span>
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li key={idx} className="flex items-start group">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center mr-4 text-white font-medium text-sm group-hover:scale-110 transition-transform">
                        {number}
                      </span>
                      <span className="text-gray-300">{text}</span>
                    </li>
                  );
                }
              }
              return null;
            })}
          </ol>
        </div>
      );
    }
    
    // For regular text sections
    return (
      <div className="text-gray-300 leading-relaxed">
        {lines.map((line, idx) => (
          <p key={idx} className="mb-4">{line}</p>
        ))}
      </div>
    );
  };

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveService(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (activeService !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeService]);

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
        {/* Enhanced Hero Section with top spacing */}
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-black">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-black to-black"></div>
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-cyan-900/20 via-transparent to-transparent"></div>
            
            {/* Animated Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left Content */}
              <motion.div 
                className="lg:w-1/2 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-block mb-4 px-4 py-1.5 bg-gray-800/70 backdrop-blur-sm rounded-full border border-gray-700/50"
                >
                  <span className="flex items-center text-sm text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
                    Innovative Solutions
                  </span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                    Transform Your Business
                  </span>
                  <br />
                  <span className="text-white text-3xl sm:text-4xl lg:text-5xl">
                    With Our Services
                  </span>
                </h1>

                <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                  Innovative solutions designed to drive growth and digital transformation in the modern business landscape.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    href="/#contact"
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2"
                  >
                    <span>Get Started</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  
                  <Link 
                    href="/#contact"
                    className="bg-gray-800/80 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-700/80 transition-all duration-300 border border-gray-700/50 flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>Contact Sales</span>
                  </Link>
                </div>

                {/* Service Stats */}
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-cyan-400">10+</div>
                    <div className="text-sm text-gray-400">Services Offered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-400">100+</div>
                    <div className="text-sm text-gray-400">Projects Completed</div>
                  </div>
                  <div className="text-center hidden sm:block">
                    <div className="text-2xl sm:text-3xl font-bold text-cyan-400">100%</div>
                    <div className="text-sm text-gray-400">Client Satisfaction</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Content - Decorative Element */}
              <motion.div 
                className="lg:w-1/2 relative hidden lg:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="relative z-10 grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center mb-4">
                          {/* Add different icons for each box */}
                        </div>
                        <div className="h-2 w-20 bg-gray-700/50 rounded-full mb-2"></div>
                        <div className="h-2 w-16 bg-gray-700/50 rounded-full"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Services Grid Section with Tech Vibe and Animated Code Background */}
        <section className="py-16 px-4 sm:px-8 relative bg-gray-900/30">
          <div className="absolute top-0 right-0 w-1/3 h-1/2 opacity-30 pointer-events-none z-0 bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/3 opacity-20 pointer-events-none z-0 bg-gradient-to-tr from-cyan-600/20 to-transparent rounded-full blur-3xl"></div>
          
          {/* Tech circuit board pattern overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-5"></div>
          
          <div className="max-w-7xl mx-auto relative z-10" id="services">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="mb-16 text-center sm:text-left"
            >
              {/* <div className="inline-block mb-4 px-4 py-1.5 bg-gray-800/70 backdrop-blur-sm rounded-full border border-gray-700 text-sm text-cyan-400">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
                  Innovative Solutions
                </span>
              </div> */}
              
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Our Services
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto sm:mx-0">
                Comprehensive solutions tailored to meet your business needs and drive innovation in the digital era
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={cardVariants}
                  className="relative overflow-hidden group rounded-2xl h-[340px] sm:h-[320px] border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-900/10 cursor-pointer"
                  onClick={() => setActiveService(service.id)}
                >
                  {/* Animated code background */}
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
                    <CodeBackground color={service.color} />
                  </div>
                  
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-black/90 z-10"></div>
                  
                  {/* Tech pattern overlay */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/tech-pattern.png')] opacity-5 z-10"></div>
                  
                  {/* Glowing accent */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 group-hover:duration-500 z-0`}></div>
                  
                  {/* Content */}
                  <div className="relative p-8 h-full flex flex-col z-20">
                    <div className="mb-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl bg-gradient-to-br ${service.color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        {service.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{service.title}</h3>
                    <p className="text-sm text-white/80 mb-2">{service.description}</p>
                    
                    {/* Add a subtle "View Details" indicator */}
                    <div className="mt-auto flex items-center text-sm text-cyan-400">
                      <span>View Details</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="py-20 px-4 sm:px-8 bg-gradient-to-b from-black to-gray-900 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-transparent"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Ready to Transform Your Business?
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10">
              Let's discuss how our services can help you achieve your business goals and drive innovation
            </p>
            <Link 
              href="/#contact"
              className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </Link>
          </div>
        </motion.section>
      </main>
      
      {/* Modal - Updated with 90% width and close button */}
      <AnimatePresence>
        {activeService !== null && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-start justify-center overflow-y-auto py-4"
            onClick={() => setActiveService(null)}
          >
            <motion.div 
              className="relative bg-gradient-to-b from-gray-900 to-black w-[90%] min-h-screen rounded-xl overflow-hidden border border-gray-800 shadow-2xl my-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button - Repositioned */}
              <button 
                onClick={() => setActiveService(null)}
                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 border border-gray-700/50 backdrop-blur-sm"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Header - Minimal height */}
              <div className="bg-gradient-to-r from-purple-600 to-cyan-500 p-2 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/10"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-lg rotate-45"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-full"></div>
                  <div className="absolute -top-10 -right-10 w-48 h-48 mix-blend-screen opacity-40">
                    <img 
                      src="https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LWVsZW1lbnQtcGgtMDE2YS5wbmc.png" 
                      alt="Pink gradient fluid blob" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-lg font-bold text-white mb-1">
                    {services.find(s => s.id === activeService)?.title}
                  </h2>
                  <p className="text-white/90 text-sm max-w-3xl">
                    {services.find(s => s.id === activeService)?.description}
                  </p>
                </div>
              </div>
              
              {/* Updated scrollable content area */}
              <div className="overflow-y-auto custom-scrollbar h-[calc(100vh-100px)]">
                <div className="p-6">
                  {/* Main Content with ReactMarkdown */}
                  {services.find(s => s.id === activeService)?.readme && (
                    <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm border border-gray-700/30 shadow-lg">
                      <ReactMarkdown components={MarkdownComponents}>
                        {services.find(s => s.id === activeService)?.readme || ''}
                      </ReactMarkdown>
                    </div>
                  )}
                  
                  {/* Enhanced Call to Action */}
                  <div className="mt-12 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 p-8 rounded-xl border border-cyan-500/20 shadow-lg">
                    <h3 className="text-2xl font-semibold mb-6 text-center text-white">Ready to Get Started?</h3>
                    <p className="text-xl text-center text-gray-300 mb-8">Transform your business with our cutting-edge solutions</p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Link 
                        href="/#contact"
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Schedule a Demo
                      </Link>
                      <button
                        onClick={() => setActiveService(null)}
                        className="bg-gray-700 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-600 transition-all hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Footer />
      </motion.footer>
    </div>
  );
}
