"use client";

const ServiceCard = ({ title, description, icon }: { 
  title: string; 
  description: string; 
  icon: string;
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6 hover:border-cyan-500/50 transition-colors group">
      <div className="mb-4 text-2xl sm:text-3xl bg-gradient-to-br bg-[#75757563] backdrop-blur-sm w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center">
        <img src={icon} alt={title} className="w-full h-full object-contain" />
      </div>
      
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
      
      <p className="text-sm sm:text-base text-gray-400">
        {description}
      </p>
      
      <div className="mt-4 sm:mt-6 flex items-center text-cyan-400 font-medium">
        <span>Learn more</span>
        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Intelligent AI & Blockchain Solutions",
      description: "Leverage cutting-edge technology tailored for today's dynamic business landscape.",
      icon: "https://static.vecteezy.com/system/resources/previews/021/820/175/original/computer-chip-with-ai-letters-3d-artificial-intelligence-icon-png.png"
    },
    {
      title: "Custom Software Development",
      description: "Build tailor-made applications designed to meet your specific operational challenges and strategic goals.",
      icon: "https://static.vecteezy.com/system/resources/previews/027/124/913/original/interface-editing-software-color-2d-illustration-png.png"
    },
    {
      title: "Robust, Scalable & Compliance-Driven Platforms",
      description: "Engineered to adapt to your evolving needs while upholding the highest security standards.",
      icon: "https://static.vecteezy.com/system/resources/thumbnails/026/775/508/small/3d-render-of-purple-lock-key-side-icon-for-ui-ux-web-mobile-apps-social-media-ads-design-png.png"
    },
    {
      title: "Seamless Ecosystem Integration",
      description: "Easily connects with ERP, CRM, and cloud systems, ensuring a unified and efficient operational framework.",
      icon: "https://icons.veryicon.com/png/o/nature/environment-protection-1/016-reuse.png"
    },
    {
      title: "Digital Transformation Consulting",
      description: "Navigate the complexities of digital transformation with our seasoned consultants.",
      icon: "https://static.vecteezy.com/system/resources/previews/053/349/665/non_2x/research-data-insight-3d-icon-png.png"
    }
  ];
  
  return (
    <section 
      id="services" 
      className="py-16 sm:py-24 px-4 sm:px-8 md:px-16 bg-black overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            What We Offer
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions designed to transform your business through cutting-edge technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 