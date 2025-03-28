"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const footerLinks = {
    solutions: ["AI Integration", "Blockchain", "Plugins", "Cloud Services", "Data Analytics"],
    solutions_id: ["ai", "blockchain", "plugins", "cloud", "ai"],
    company: ["About", "Services", "Products", "Industries", "Blog"],
    company_id: ["/", "/services", "/product", "/industry", "/blog"],
    resources: ["AI services", "Blockchain services", "Plugins services", "UI/UX services", "Staff Augmentation services"],
    resources_id: ["/services#services", "/services#services", "/services#services", "/services#services", "/services#services"]
  };
  
  return (
    <footer className="py-12 sm:py-16 px-4 sm:px-8 md:px-16 border-t border-gray-800 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div>
            <div className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              InnoSphere Labs
            </div>
            
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                INNOSPHERELABS<br/>
                Headquarters<br/>
                Guindy Industrial Estate,<br/>
                Chennai 600032, India
            </p>
            
            <div className="flex space-x-3 sm:space-x-4">
              {["Twitter", "LinkedIn", "GitHub", "Instagram"].map((platform, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400 transition-colors"
                  aria-label={platform}
                >
                  {platform[0]}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 sm:mb-6">
              Solutions
            </h3>
            
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.solutions.map((link, i) => (
                <li key={i}>
                  <a href={"/product#"+footerLinks.solutions_id[i]} className="text-sm sm:text-base text-gray-400 hover:text-cyan-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 sm:mb-6">
              Company
            </h3>
            
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a href={footerLinks.company_id[i]} className="text-sm sm:text-base text-gray-400 hover:text-cyan-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 sm:mb-6">
              Resources
            </h3>
            
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  <a href={footerLinks.resources_id[i]} className="text-sm sm:text-base text-gray-400 hover:text-cyan-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-6 sm:pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-xs sm:text-sm mb-4 md:mb-0">
            © 2023 InnoSphere Labs. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link 
              href="/privacy-policy" 
              className="text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms-of-service" 
              className="text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/cookie-policy" 
              className="text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Cookie Policy
            </Link>
            <Link 
              href="/#contact" 
              className="text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 