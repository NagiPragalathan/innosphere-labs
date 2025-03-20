"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
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

// Animation variants for blog cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// Tech pattern background
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

// Binary digits animation effect
const BinaryEffect = () => (
  <div className="absolute inset-0 overflow-hidden opacity-5 font-mono text-[8px] text-cyan-500 pointer-events-none">
    {Array(15).fill(0).map((_, i) => (
      <div key={i} className="whitespace-nowrap">
        {Array(200).fill(0).map((_, j) => (
          <span key={j}>{Math.round(Math.random())}</span>
        ))}
      </div>
    ))}
  </div>
);

// Blog post card component
const BlogCard = ({ 
  title, 
  excerpt, 
  category,
  index,
  gradient = "from-cyan-400 to-purple-600" 
}: { 
  title: string; 
  excerpt: string; 
  category: string;
  index: number;
  gradient?: string;
}) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group relative overflow-hidden"
    >
      <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden h-full hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02] group-hover:border-gray-700">
        <div className="relative p-6">
          <BinaryEffect />
          
          <div className="relative z-10">
            <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${gradient} bg-opacity-10 text-white mb-4`}>
              {category}
            </div>
            
            <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
              <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                {title}
              </span>
            </h3>
            
            <p className="text-gray-400 text-sm line-clamp-3 mb-4">
              {excerpt}
            </p>
            
            <div className="flex items-center space-x-2 text-sm">
              <div className={`h-8 w-8 rounded-md bg-gradient-to-r ${gradient} flex items-center justify-center text-white`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <span className="text-gray-400 group-hover:text-white transition-colors duration-300">Read More</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Featured blog post (larger card)
const FeaturedBlogCard = ({ 
  title, 
  excerpt,
  gradient = "from-cyan-400 to-purple-600" 
}: { 
  title: string; 
  excerpt: string;
  gradient?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="group relative overflow-hidden"
    >
      <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.01] group-hover:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative p-8 flex flex-col justify-center">
            <BinaryEffect />
            
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 text-cyan-400 mb-4">
                FEATURED
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {title}
                </span>
              </h2>
              
              <p className="text-gray-300 mb-6">
                {excerpt}
              </p>
              
              <div className="flex items-center space-x-2">
                <div className={`h-10 w-10 rounded-md bg-gradient-to-r ${gradient} flex items-center justify-center text-white`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">Read Full Article</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20"></div>
            
            {/* Abstract tech graphic */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-full animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute inset-4 border-2 border-dashed border-purple-500/30 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
                <div className="absolute inset-8 border-2 border-dashed border-blue-500/30 rounded-full animate-[spin_30s_linear_infinite]"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl rotate-12">
                    💡
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Blog categories component
const BlogCategories = () => {
  const categories = [
    "All", "AI & Blockchain", "Healthcare", "Education", 
    "Supply Chain", "Manufacturing", "Retail", "Digital Transformation"
  ];
  
  return (
    <div className="flex flex-wrap gap-2 mb-12">
      {categories.map((category, i) => (
        <button 
          key={i}
          className={`px-4 py-2 rounded-full text-sm ${
            i === 0 
              ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white" 
              : "bg-gray-900 border border-gray-800 text-gray-300 hover:border-gray-700"
          } transition-colors duration-300`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default function BlogPage() {
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

  // Blog post data
  const blogPosts = [
    {
      title: "The Future is Here: AI and Blockchain Integration",
      excerpt: "At ISLABS, we harness the analytical capabilities of AI and the transparency of blockchain technology to transform industries. For instance, our healthcare solution, CareSync, integrates AI-driven nurse scheduling with blockchain-secured medical records, significantly enhancing patient outcomes and operational efficiency.",
      category: "AI & Blockchain",
      gradient: "from-cyan-400 to-blue-600"
    },
    {
      title: "Blockchain Beyond Cryptocurrency: Real-World Business Applications",
      excerpt: "Blockchain technology at ISLABS reshapes business operations by offering transparent, secure, and immutable solutions. One notable example is our Halal Blockchain platform, which authenticates halal certifications securely and increases transparency throughout the supply chain.",
      category: "Blockchain",
      gradient: "from-blue-400 to-purple-600"
    },
    {
      title: "Intelligent Document Management: The Power of AI",
      excerpt: "Our AI-powered document management solutions at ISLABS automate and streamline the handling of contracts, medical records, educational credentials, and logistics documentation. By utilizing intelligent data extraction and automated compliance checks, we help businesses reduce manual efforts.",
      category: "AI",
      gradient: "from-purple-400 to-pink-600"
    },
    {
      title: "AI-Powered Healthcare: Enhancing Patient Outcomes",
      excerpt: "ISLABS leverages advanced AI technology to optimize healthcare processes, automate clinical workflows, and ensure compliance with HIPAA and GDPR. Our AI solutions, including nurse scheduling, patient acuity prediction, and intelligent document systems, significantly boost operational efficiency.",
      category: "Healthcare",
      gradient: "from-teal-400 to-cyan-600"
    },
    {
      title: "Blockchain in Healthcare: Trust, Transparency, and Compliance",
      excerpt: "At ISLABS, blockchain technology ensures secure and transparent management of sensitive medical records and clinical documentation. By offering tamper-proof data management solutions, we establish a new standard of trust, compliance, and stakeholder confidence within the healthcare industry.",
      category: "Healthcare",
      gradient: "from-cyan-400 to-blue-600"
    },
    {
      title: "Smart Education Systems: AI and Blockchain in Action",
      excerpt: "ISLABS supports educational institutions with innovative solutions for securely managing academic records, student processes, and certifications. Our AI-QGEN platform automates exam creation, distribution, and certification, greatly reducing administrative workload and enhancing academic integrity.",
      category: "Education",
      gradient: "from-indigo-400 to-purple-600"
    },
    {
      title: "AI-Driven Exam Management: Future-Proofing Education",
      excerpt: "ISLABS' state-of-the-art AI-driven platforms ensure fairness, efficiency, and security in educational assessments and certifications. By streamlining processes and maintaining credibility, we enable educational institutions to significantly enhance both student performance and institutional efficiency.",
      category: "Education",
      gradient: "from-purple-400 to-indigo-600"
    },
    {
      title: "Supply Chain Efficiency: AI and Blockchain Synergy",
      excerpt: "Our advanced AI and blockchain solutions offer real-time insights, detailed tracking, and seamless compliance throughout supply chains. ISLABS technology helps businesses mitigate risks, lower costs, and significantly enhance operational transparency and efficiency.",
      category: "Supply Chain",
      gradient: "from-green-400 to-cyan-600"
    },
    {
      title: "Real-Time Logistics Visibility with Blockchain",
      excerpt: "ISLABS provides specialized blockchain solutions designed for logistics, offering real-time shipment tracking with instant updates on location, status, and conditions. Additionally, blockchain-secured audit trails enable accurate record-keeping, simplify regulatory compliance, and quickly resolve disputes.",
      category: "Supply Chain",
      gradient: "from-cyan-400 to-green-600"
    },
    {
      title: "Intelligent Manufacturing: Achieving Operational Excellence",
      excerpt: "Manufacturers rely on ISLABS solutions to streamline processes, automate compliance tasks, and boost productivity. Our AI analytics combined with blockchain-backed traceability enhance production quality, minimize downtime, and ensure strict adherence to industry standards.",
      category: "Manufacturing",
      gradient: "from-blue-400 to-teal-600"
    },
    {
      title: "Digital Transformation in Manufacturing",
      excerpt: "ISLABS empowers manufacturers through digital transformation with AI-driven analytics and blockchain technologies. Our solutions enable businesses to significantly cut costs, enhance productivity, and improve operational agility.",
      category: "Manufacturing",
      gradient: "from-teal-400 to-blue-600"
    },
    {
      title: "Reinventing Retail with AI and Blockchain",
      excerpt: "Our retail solutions at ISLABS utilize AI-powered analytics and blockchain-secured transactions to deliver personalized customer experiences, optimize inventory management, and safeguard transaction security. We enable retailers to thrive in a modern, digitally enhanced retail environment.",
      category: "Retail",
      gradient: "from-pink-400 to-purple-600"
    },
    {
      title: "Smart E-commerce: AI-Enhanced Growth and Security",
      excerpt: "ISLABS' intelligent e-commerce platforms integrate AI analytics with blockchain security, driving customer engagement, operational efficiency, and data-driven decision-making. Our solutions enable e-commerce businesses to achieve sustained growth and enhanced transaction security.",
      category: "Retail",
      gradient: "from-purple-400 to-pink-600"
    },
    {
      title: "Successful Digital Transformation: A Practical Roadmap",
      excerpt: "ISLABS brings extensive expertise to support organizations in achieving strategic goals through digital transformation. Our approach includes detailed methodologies, compelling case studies, and strategic insights crucial for innovation and competitive advantage.",
      category: "Digital Transformation",
      gradient: "from-yellow-400 to-orange-600"
    },
    {
      title: "Agile and Lean Methodologies: Accelerating Innovation",
      excerpt: "At ISLABS, Agile and Lean methodologies guide our rapid development and scaling of innovative, customer-centric solutions. Our agile approach ensures faster results, scalability, and continuous improvement, facilitating successful digital transformations for businesses of all sizes.",
      category: "Digital Transformation",
      gradient: "from-orange-400 to-red-600"
    }
  ];

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
      
      <main className="overflow-x-hidden pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-8 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
          <TechPattern />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4 inline-flex h-8 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 px-4 items-center"
                >
                  <span className="font-medium text-xs text-cyan-400">INSIGHTS & INNOVATION</span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    ISLABS Insights Blog
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-xl text-gray-300 mb-8"
                >
                  Revolutionizing Industries with AI and Blockchain
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href="#blog-posts"
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium 
                              hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center"
                    >
                      <span>Explore Articles</span>
                      <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    
                    <Link 
                      href="/contact"
                      className="px-6 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white font-medium 
                              hover:bg-gray-800 hover:border-gray-600 transition-all duration-300"
                    >
                      Subscribe to Newsletter
                    </Link>
                  </div>
                </motion.div>
              </div>
              
              <div className="hidden lg:block relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative"
                >
                  {/* Abstract blog illustration */}
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-gradient-to-br from-gray-900 to-black border border-gray-800">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-80 h-80">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent animate-pulse"></div>
                          <div className="w-60 h-60 rounded-full border border-dashed border-cyan-500/30 absolute animate-[spin_60s_linear_infinite]"></div>
                          <div className="w-72 h-72 rounded-full border border-dashed border-purple-500/20 absolute animate-[spin_90s_linear_infinite_reverse]"></div>
                        </div>
                        
                        {/* Center icon */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                          <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl rotate-12">
                              <span className="text-3xl">✍️</span>
                            </div>
                            
                            {/* Floating elements */}
                            <div className="absolute -top-8 -right-8 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white animate-float1">
                              <span className="text-xs">AI</span>
                            </div>
                            <div className="absolute -bottom-10 left-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white animate-float2">
                              <span className="text-xs">ML</span>
                            </div>
                            <div className="absolute top-2 -left-12 w-12 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center text-white animate-float3">
                              <span className="text-xs">Blockchain</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Code-like elements */}
                    <div className="absolute bottom-4 left-4 text-[8px] text-cyan-500/60 font-mono">
                      <div>{"{id: 'blog', status: 'active'}"}</div>
                      <div>{"console.log('Welcome to ISLABS Insights');"}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog Content */}
        <section id="blog-posts" className="py-16 px-4 sm:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-black to-black"></div>
          <TechPattern />
          
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Featured post */}
            <div className="mb-16">
              <FeaturedBlogCard
                title="The Future is Here: AI and Blockchain Integration"
                excerpt="At ISLABS, we harness the analytical capabilities of AI and the transparency of blockchain technology to transform industries. For instance, our healthcare solution, CareSync, integrates AI-driven nurse scheduling with blockchain-secured medical records, significantly enhancing patient outcomes and operational efficiency. Our comprehensive solutions span healthcare, education, supply chain, manufacturing, and retail, driving unprecedented efficiency, security, and compliance."
              />
            </div>
            
            {/* Categories */}
            <BlogCategories />
            
            {/* Blog posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post, i) => (
                <BlogCard
                  key={i}
                  title={post.title}
                  excerpt={post.excerpt}
                  category={post.category}
                  gradient={post.gradient}
                  index={i}
                />
              ))}
            </div>
            
            {/* Load more button */}
            <div className="mt-12 text-center">
              <button className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:text-white hover:border-gray-700 transition-colors duration-300 inline-flex items-center space-x-2">
                <span>Load More Articles</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </section>
        
        {/* Newsletter CTA */}
        <section className="py-20 px-4 sm:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
          <TechPattern />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-lg border border-gray-800 rounded-2xl overflow-hidden p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    Stay Updated with ISLABS Insights
                  </span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Subscribe to our newsletter and receive the latest industry insights, technology updates, and exclusive content directly to your inbox.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg px-6 py-3 font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 whitespace-nowrap">
                  Subscribe Now
                </button>
              </div>
              
              <div className="mt-4 text-center text-gray-500 text-sm">
                We respect your privacy. Unsubscribe at any time.
              </div>
            </div>
          </div>
        </section>
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
