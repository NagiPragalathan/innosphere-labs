"use client";

import { useState } from "react";

const ProcessStep = ({ number, title, description }: {
  number: number;
  title: string;
  description: string;
}) => {
  return (
    <div className="relative pl-10 sm:pl-12 pb-6 sm:pb-8">
      <div className="absolute left-0 top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-600">
        {number}
      </div>
      
      <div className="absolute left-3.5 sm:left-4 top-8 bottom-0 w-px bg-gray-800"></div>
      
      <h4 className="text-lg sm:text-xl font-bold mb-2 text-white">{title}</h4>
      <p className="text-sm sm:text-base text-gray-400">{description}</p>
    </div>
  );
};

const WhyUsSection = () => {
  // Use client-side only rendering to avoid hydration issues
  const [isMounted, setIsMounted] = useState(false);
  
  // Use useEffect to set isMounted to true after initial render
  if (typeof window !== 'undefined') {
    // Only run this code on the client side
    useState(() => {
      setIsMounted(true);
    });
  }
  
  return (
    <section 
      id="why-us" 
      className="relative py-16 sm:py-24 px-4 sm:px-8 md:px-16 overflow-hidden bg-black/50 backdrop-blur-sm"
    >
      {/* Static background with no dynamic elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-900/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-900/5 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Why InnoSphere?
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            From Concept to Completion in Weeks, Not Years
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div>
            <p className="text-base md:text-lg text-gray-300 mb-6 sm:mb-8">
              At InnoSphere Labs, we fast-track your digital transformation through a collaborative, agile methodology:
            </p>
            
            <div className="mt-6 sm:mt-8">
              <ProcessStep 
                number={1} 
                title="Discovery & Strategy" 
                description="Deep dive into your business needs and outline a custom roadmap."
              />
              
              <ProcessStep 
                number={2} 
                title="Design & Development" 
                description="Build scalable, secure solutions that integrate seamlessly with your existing systems."
              />
              
              <ProcessStep 
                number={3} 
                title="Implementation & Optimization" 
                description="Deploy with precision and continuously refine to maximize ROI."
              />
            </div>
          </div>
          
          <div className="relative">
            {/* Simple dashboard mockup without animations */}
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl p-1">
              <div className="bg-black rounded-lg p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="h-4 w-16 sm:w-24 bg-gray-800 rounded"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="h-16 sm:h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-80"></div>
                  </div>
                  <div className="h-16 sm:h-24 bg-gray-800 rounded-lg p-3">
                    <div className="h-2 sm:h-3 w-3/4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-2 sm:h-3 w-1/2 bg-gray-700 rounded mb-2"></div>
                    <div className="h-2 sm:h-3 w-5/6 bg-gray-700 rounded"></div>
                  </div>
                </div>
                
                <div className="h-24 sm:h-32 bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div className="h-2 sm:h-3 w-16 sm:w-20 bg-gray-700 rounded"></div>
                    <div className="h-2 sm:h-3 w-16 sm:w-20 bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-12 sm:h-16 flex items-end space-x-1 sm:space-x-2">
                    <div className="w-1/6 bg-cyan-500/70 rounded-t h-3 sm:h-4"></div>
                    <div className="w-1/6 bg-cyan-500/70 rounded-t h-6 sm:h-8"></div>
                    <div className="w-1/6 bg-cyan-500/70 rounded-t h-9 sm:h-12"></div>
                    <div className="w-1/6 bg-purple-500/70 rounded-t h-5 sm:h-6"></div>
                    <div className="w-1/6 bg-purple-500/70 rounded-t h-8 sm:h-10"></div>
                    <div className="w-1/6 bg-purple-500/70 rounded-t h-10 sm:h-14"></div>
                  </div>
                </div>
              </div>
              
              {/* Static glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection; 