"use client";

import { motion } from "framer-motion";

const Footer = () => {
  const footerLinks = {
    solutions: ["AI Integration", "Blockchain", "Custom Software", "Cloud Services", "Data Analytics"],
    company: ["About", "Team", "Careers", "Contact", "Blog"],
    resources: ["Documentation", "Case Studies", "Whitepapers", "API", "Support"]
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
              Pioneering the next generation of digital solutions with cutting-edge innovation and transformative technology.
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
                  <a href="#" className="text-sm sm:text-base text-gray-400 hover:text-cyan-400 transition-colors">
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
                  <a href="#" className="text-sm sm:text-base text-gray-400 hover:text-cyan-400 transition-colors">
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
                  <a href="#" className="text-sm sm:text-base text-gray-400 hover:text-cyan-400 transition-colors">
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
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact Us"].map((item, i) => (
              <a 
                key={i}
                href="#" 
                className="text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 