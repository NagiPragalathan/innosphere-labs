"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import productDocs from "./documentation/documents";
import type { Components } from 'react-markdown';
import type { ReactNode } from 'react';
import Image from "next/image";

// Product icons
// Short descriptions for each product
const productDescriptions = {
  "DocChain": "Secure document management and verification on blockchain technology",
  // "Halal Blockchain": "Transparent halal certification and tracking system",
  "Compliance Buddy": "AI-powered compliance monitoring and reporting solution",
  "ProcureSense": "Intelligent procurement analytics and optimization platform",
  "AI-QGEN": "Automated quality assessment and reporting system",
  "CareSync": "Healthcare coordination and patient management platform",
  "Enterprise SaaS Solutions": "Customizable enterprise software solutions",
  "Customized Cloud Solutions": "Tailored cloud infrastructure and services",
  // "Blockchain Document Vault": "Secure document storage with blockchain verification",
  // "AI-Powered Sales Assistant": "Intelligent sales automation and lead generation",
  "Compliance Buddy Plugin": "Seamless compliance integration for existing systems",
  "Zoho CRM Integration Plugin": "Enhanced Zoho CRM with compliance features",
  "SyncBridge for Zoho": "Compliance monitoring for Freshworks suite",
  // "Eduwallets: AI & Blockchain-Powered Fee Management": "AI-powered fee management and payment processing",
  "UNIPASS: Automated Student Gate Pass Management System": "Automated gate pass management system for universities",
};

// Define a more specific type for the component props
interface MarkdownComponentProps {
  node?: any;
  children?: ReactNode;
  [key: string]: any;
}

// Custom components for ReactMarkdown with improved styling
const MarkdownComponents: Components = {
  h1: ({node, ...props}: MarkdownComponentProps) => (
    <h1 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-3xl font-bold text-white mb-6 mt-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent scroll-mt-20" {...props} />
  ),
  h2: ({node, ...props}: MarkdownComponentProps) => (
    <h2 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-2xl font-bold text-white mb-5 mt-8 flex items-center scroll-mt-20">
      <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-blue-500 to-cyan-400 mr-3 rounded-full"></span>
      <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{props.children}</span>
    </h2>
  ),
  h3: ({node, ...props}: MarkdownComponentProps) => (
    <h3 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-xl font-semibold text-white mb-4 mt-6 text-blue-300 scroll-mt-20" {...props} />
  ),
  p: ({node, ...props}: MarkdownComponentProps) => (
    <p className="text-gray-300 mb-4 leading-relaxed text-base" {...props} />
  ),
  ul: ({node, ...props}: MarkdownComponentProps) => (
    <ul className="list-none pl-0 mb-6 space-y-3 text-gray-300" {...props} />
  ),
  li: ({node, ...props}: MarkdownComponentProps) => (
    <li className="flex items-start mb-2">
      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mt-1 mr-3">
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
    <strong className="font-semibold text-blue-300" {...props} />
  ),
  em: ({node, ...props}: MarkdownComponentProps) => (
    <em className="text-cyan-300 font-italic" {...props} />
  ),
  blockquote: ({node, ...props}: MarkdownComponentProps) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-900/20 rounded-r-lg" {...props} />
  ),
};

const ProductPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const openModal = (product: string) => {
    setSelectedProduct(product);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Product categories with styling from the reference
  const categories = [
    {
      id: "blockchain",
      title: "Blockchain Solutions",
      description: "Secure and transparent blockchain applications",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>,
      color: "from-purple-400 to-indigo-600",
      textColor: "text-purple-500",
      bgColor: "bg-purple-500/5",
      borderColor: "border-purple-500/20",
      products: ["DocChain"]
    },
    {
      id: "ai",
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by AI",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>,
      color: "from-blue-400 to-cyan-600",
      textColor: "text-blue-500",
      bgColor: "bg-blue-500/5",
      borderColor: "border-blue-500/20",
      products: ["ProcureSense", "AI-QGEN"]
    },
    {
      id: "cloud",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and services",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>,
      color: "from-cyan-400 to-blue-600",
      textColor: "text-cyan-500",
      bgColor: "bg-cyan-500/5",
      borderColor: "border-cyan-500/20",
      products: ["UNIPASS: Automated Student Gate Pass Management System"]
    },
    {
      id: "integration",
      title: "Integration Services",
      description: "Seamless system integration solutions",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>,
      color: "from-green-400 to-teal-600",
      textColor: "text-green-500",
      bgColor: "bg-green-500/5",
      borderColor: "border-green-500/20",
      products: [
        "Compliance Buddy",
        "CareSync",
        "SyncBridge for Zoho",
      ]
    }
  ];

  // Function to extract only main headings (h1 and h2) from markdown content
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

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative py-20 px-4 sm:px-8 md:px-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-[150px]"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500 opacity-10 rounded-full blur-[100px]"></div>
          
          {/* Background decorative elements */}
          <div className="absolute -top-20 -right-20 w-96 h-96 opacity-30 rotate-45 mix-blend-screen">
            <img 
              src="https://images.rawpixel.com/image_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LWVsZW1lbnQtcGgtMDE4Yy1sZDN4cmhncy5qcGc.jpg" 
              alt="Purple fluid blob" 
              className={`w-full h-full object-contain transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          <div className="absolute bottom-0 left-0 w-80 h-80 opacity-20 -rotate-12 mix-blend-screen">
            <img 
              src="https://cdn.prod.website-files.com/66e869fd281bc987a15d89a7/66f2cdf84eb53972dc1696ab_g-bg.png" 
              alt="Gradient background" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20">
          {/* Redesigned Hero Section with left content and right image */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-32">
            {/* Left content */}
            <motion.div
              className="lg:w-1/2 text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-block mb-6 px-6 py-2 border border-gray-700 rounded-full bg-gray-900/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-gray-300">Explore Our Product Suite</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Innovative Solutions
                </span>
                <br />
                <span className="text-white">for Modern Business</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-xl mt-8 mb-10">
                Cutting-edge technology designed to transform your operations, enhance efficiency, and drive growth in today's digital landscape.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-10">
                <a href="/#producthead">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                    <span>Explore Products</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </a>
              </div>
              
              <div className="flex flex-wrap gap-6 mt-12">
                {categories.map((category, index) => (
                  <a 
                    key={index}
                    href={`#${category.id}`}
                    className={`px-4 py-2 rounded-full ${category.bgColor} ${category.borderColor} border flex items-center gap-2 hover:opacity-80 transition-opacity`}
                  >
                    <span>{category.icon}</span>
                    <span className={category.textColor}>{category.title}</span>
                  </a>
                ))}
              </div>
            </motion.div>
            
            {/* Right image */}
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Animated background grid */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                </div>

                {/* Floating geometric shapes */}
                <motion.div
                  className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-transparent rounded-3xl z-0"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <motion.div
                  className="absolute -bottom-12 -right-8 w-32 h-32 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-full z-0"
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Main image container with glass effect */}
                <motion.div
                  className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-1 backdrop-blur-sm border border-white/10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {/* Glowing border effect */}
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-2xl z-[-1] opacity-30 group-hover:opacity-50 blur-[2px] transition-opacity"></div>

                  {/* Main image */}
                  <motion.div
                    className="relative rounded-xl overflow-hidden"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Image 
                      src="/images/products_hero.jpg" 
                      alt="3D abstract shape" 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      width={1000}
                      height={1000}
                      onLoad={() => setHeroImageLoaded(true)}
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-cyan-500/10"></div>
                  </motion.div>
                </motion.div>

                {/* Decorative dots */}
                <div className="absolute -right-4 top-1/4 flex flex-col gap-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-cyan-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                    />
                  ))}
                </div>

                <div className="absolute -left-4 bottom-1/4 flex flex-col gap-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-purple-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + (i * 0.1) }}
                    />
                  ))}
                </div>

                {/* Tech circuit lines */}
                <svg className="absolute -right-8 top-1/3 w-16 h-32 text-cyan-500/30" viewBox="0 0 100 200">
                  <motion.path
                    d="M 10 10 L 90 10 L 90 90 L 10 90"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                </svg>

                <svg className="absolute -left-8 bottom-1/3 w-16 h-32 text-purple-500/30" viewBox="0 0 100 200">
                  <motion.path
                    d="M 90 190 L 10 190 L 10 110 L 90 110"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Product Categories */}
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              id={category.id}
              className="mb-24 scroll-mt-32"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="mb-12 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6" id="producthead">
                  <div className={`text-4xl p-4 rounded-2xl ${category.bgColor} ${category.borderColor} border`}>
                    {category.icon}
                  </div>
                  <h2 className="text-3xl font-bold">
                    <span className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                      {category.title}
                    </span>
                  </h2>
                </div>
                <p className="text-gray-300 max-w-3xl text-lg">
                  {category.description}
                </p>
                <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-8"></div>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.products.map((product, idx) => (
                  <motion.div 
                    key={idx}
                    className={`${category.bgColor} backdrop-blur-sm border ${category.borderColor} rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -5, boxShadow: `0 20px 30px -10px rgba(0,0,0,0.3)` }}
                    onClick={() => openModal(product)}
                  >
                    <div className="p-8">
                      <div className="text-4xl mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center">
                        {category.icon}
                      </div>
                      <h3 className={`text-xl font-semibold mb-3 ${category.textColor} hover:opacity-80 transition-opacity`}>
                        {product}
                      </h3>
                      <p className="text-gray-300 mb-8 min-h-[60px]">
                        {productDescriptions[product as keyof typeof productDescriptions]}
                      </p>
                      <button
                        className={`bg-gradient-to-r ${category.color} text-white px-6 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2`}
                      >
                        <span>Learn More</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Documentation Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={closeModal}>
            <motion.div 
              className="relative w-[90%] h-[90vh] overflow-hidden bg-gray-900/90 backdrop-blur-md rounded-xl border border-gray-800"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-white z-20 bg-gray-800/90 p-2.5 rounded-full transition-all hover:bg-gray-700 shadow-lg border border-gray-700"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Reduced Header */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-16 relative overflow-hidden flex items-center">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-white/10"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-5 left-5 w-10 h-10 border border-white/10 rounded-lg rotate-45"></div>
                  <div className="absolute bottom-5 right-5 w-16 h-16 border border-white/10 rounded-full"></div>
                  <div className="absolute -top-5 -right-5 w-24 h-24 mix-blend-screen opacity-40">
                    <img 
                      src="https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LWVsZW1lbnQtcGgtMDE2YS5wbmc.png" 
                      alt="Pink gradient fluid blob" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="relative z-10 flex items-center px-4 space-x-4">
                    {/* Document icon */}
                    <div className="text-2xl bg-white/10 p-1.5 rounded-lg backdrop-blur-sm shadow-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {selectedProduct}
                    </h2>
                    <p className="text-white/90 text-sm max-w-3xl">
                      {productDescriptions[selectedProduct as keyof typeof productDescriptions]}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Documentation Content */}
              <div className="overflow-y-auto h-[calc(90vh-64px)]">
                <div className="p-8">
                  {/* Documentation Content with Improved Styling */}
                  <div className="space-y-8">
                    {/* Main content with styled markdown */}
                    <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm border border-gray-700/30 shadow-lg">
                      <ReactMarkdown components={MarkdownComponents}>
                        {productDocs[selectedProduct as keyof typeof productDocs]}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;
