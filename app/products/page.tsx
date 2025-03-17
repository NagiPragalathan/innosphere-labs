"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductModal from "@/components/ProductModal";

// Product data structure
interface Product {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  icon: string;
}

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Product categories
  const categories = [
    {
      id: "blockchain",
      name: "Blockchain Solutions",
      description: "Secure, transparent, and immutable blockchain solutions for enterprise needs.",
      color: "from-blue-500 to-cyan-400",
      textColor: "text-blue-500"
    },
    {
      id: "ai",
      name: "AI-Driven Solutions",
      description: "Intelligent automation and decision-making tools powered by advanced AI.",
      color: "from-purple-600 to-pink-500",
      textColor: "text-purple-500"
    },
    {
      id: "cloud",
      name: "Cloud & SaaS Platforms",
      description: "Scalable, flexible cloud solutions and software-as-a-service platforms.",
      color: "from-cyan-500 to-emerald-500",
      textColor: "text-cyan-500"
    },
    {
      id: "plugins",
      name: "Plugins",
      description: "Extend your existing systems with powerful integration plugins.",
      color: "from-amber-500 to-orange-500",
      textColor: "text-amber-500"
    }
  ];
  
  // Product data
  const products: Product[] = [
    {
      id: "docchain",
      name: "DocChain",
      category: "blockchain",
      shortDescription: "Secure document verification and management on blockchain",
      fullDescription: "DocChain provides an immutable, secure platform for document verification, storage, and management using blockchain technology. It ensures document integrity, prevents tampering, and creates a transparent audit trail for all document activities.",
      features: [
        "Immutable document verification",
        "Secure digital signatures",
        "Transparent audit trails",
        "Automated compliance verification",
        "Seamless integration with existing document management systems"
      ],
      icon: "📄"
    },
    {
      id: "halal-blockchain",
      name: "Halal Blockchain",
      category: "blockchain",
      shortDescription: "Blockchain solution for Halal supply chain verification",
      fullDescription: "Our Halal Blockchain solution ensures the integrity of Halal supply chains by tracking and verifying each step of the process on an immutable blockchain. It provides consumers, regulators, and businesses with transparent verification of Halal compliance.",
      features: [
        "End-to-end supply chain tracking",
        "Halal certification verification",
        "Consumer transparency tools",
        "Regulatory compliance automation",
        "Integration with existing Halal certification systems"
      ],
      icon: "🔗"
    },
    {
      id: "compliance-buddy",
      name: "Compliance Buddy",
      category: "ai",
      shortDescription: "AI-powered compliance monitoring and management",
      fullDescription: "Compliance Buddy uses advanced AI to continuously monitor your business operations for regulatory compliance. It automatically identifies potential compliance issues, suggests remediation steps, and helps maintain comprehensive compliance documentation.",
      features: [
        "Real-time compliance monitoring",
        "Automated risk assessment",
        "Regulatory update tracking",
        "Compliance documentation generation",
        "Customizable compliance workflows"
      ],
      icon: "✓"
    },
    {
      id: "procuresense",
      name: "ProcureSense",
      category: "ai",
      shortDescription: "Intelligent procurement optimization platform",
      fullDescription: "ProcureSense leverages AI to optimize your procurement processes, identifying cost-saving opportunities, suggesting optimal suppliers, and automating routine procurement tasks to increase efficiency and reduce expenses.",
      features: [
        "Supplier performance analytics",
        "Cost optimization recommendations",
        "Automated purchase order processing",
        "Inventory optimization",
        "Procurement trend analysis"
      ],
      icon: "🔍"
    },
    {
      id: "ai-qgen",
      name: "AI-QGEN",
      category: "ai",
      shortDescription: "AI-powered quality assurance and testing",
      fullDescription: "AI-QGEN revolutionizes quality assurance by using artificial intelligence to generate comprehensive test scenarios, predict potential failure points, and automate testing processes for software and systems.",
      features: [
        "Automated test case generation",
        "Predictive quality analysis",
        "Continuous testing integration",
        "Visual regression testing",
        "Performance bottleneck identification"
      ],
      icon: "🧪"
    },
    {
      id: "caresync",
      name: "CareSync",
      category: "ai",
      shortDescription: "AI healthcare coordination platform",
      fullDescription: "CareSync uses AI to improve healthcare coordination, patient monitoring, and treatment planning. It helps healthcare providers deliver more personalized, efficient care while reducing administrative burden.",
      features: [
        "Patient health prediction models",
        "Treatment plan optimization",
        "Care coordination automation",
        "Remote patient monitoring",
        "Healthcare resource optimization"
      ],
      icon: "🏥"
    },
    {
      id: "enterprise-saas",
      name: "Enterprise SaaS Solutions",
      category: "cloud",
      shortDescription: "Comprehensive enterprise software-as-a-service platforms",
      fullDescription: "Our Enterprise SaaS Solutions provide comprehensive, scalable software platforms delivered via the cloud. These solutions are designed to address specific enterprise needs while eliminating infrastructure management overhead.",
      features: [
        "Scalable multi-tenant architecture",
        "Enterprise-grade security",
        "Customizable workflows",
        "Comprehensive API ecosystem",
        "Seamless integration capabilities"
      ],
      icon: "☁️"
    },
    {
      id: "custom-cloud",
      name: "Customized Cloud Solutions",
      category: "cloud",
      shortDescription: "Tailored cloud infrastructure and services",
      fullDescription: "Our Customized Cloud Solutions provide tailored cloud infrastructure, platforms, and services designed specifically for your unique business requirements, ensuring optimal performance, security, and cost-efficiency.",
      features: [
        "Custom cloud architecture design",
        "Hybrid and multi-cloud solutions",
        "Cloud migration services",
        "Cloud security hardening",
        "Performance optimization"
      ],
      icon: "⚙️"
    },
    {
      id: "blockchain-vault",
      name: "Blockchain Document Vault",
      category: "plugins",
      shortDescription: "Secure document storage plugin using blockchain",
      fullDescription: "The Blockchain Document Vault plugin adds secure, immutable document storage capabilities to your existing systems using blockchain technology, ensuring document integrity and providing verifiable audit trails.",
      features: [
        "Seamless integration with document management systems",
        "Blockchain-verified document integrity",
        "Secure sharing capabilities",
        "Comprehensive audit logging",
        "Customizable retention policies"
      ],
      icon: "🔒"
    },
    {
      id: "sales-assistant",
      name: "AI-Powered Sales Assistant",
      category: "plugins",
      shortDescription: "Intelligent sales automation and assistance",
      fullDescription: "Our AI-Powered Sales Assistant plugin enhances your CRM with intelligent lead scoring, opportunity prediction, and automated follow-up recommendations to boost sales team efficiency and conversion rates.",
      features: [
        "Lead scoring and prioritization",
        "Sales opportunity prediction",
        "Automated follow-up scheduling",
        "Sales conversation analysis",
        "Performance optimization recommendations"
      ],
      icon: "💼"
    },
    {
      id: "compliance-plugin",
      name: "Compliance Buddy Plugin",
      category: "plugins",
      shortDescription: "Add compliance monitoring to existing systems",
      fullDescription: "The Compliance Buddy Plugin extends your existing business systems with AI-powered compliance monitoring capabilities, helping ensure regulatory adherence without replacing your current software infrastructure.",
      features: [
        "Real-time compliance monitoring",
        "Regulatory update notifications",
        "Compliance documentation generation",
        "Risk assessment automation",
        "Integration with major business platforms"
      ],
      icon: "📋"
    },
    {
      id: "zoho-integration",
      name: "Zoho CRM Integration Plugin",
      category: "plugins",
      shortDescription: "Seamless integration with Zoho CRM",
      fullDescription: "Our Zoho CRM Integration Plugin provides seamless connectivity between Zoho CRM and your other business systems, enabling data synchronization, workflow automation, and enhanced CRM capabilities.",
      features: [
        "Bi-directional data synchronization",
        "Automated workflow triggers",
        "Custom field mapping",
        "Historical data migration",
        "Real-time update propagation"
      ],
      icon: "🔄"
    },
    {
      id: "freshworks-plugin",
      name: "Freshworks Compliance Monitoring Plugin",
      category: "plugins",
      shortDescription: "Add compliance monitoring to Freshworks products",
      fullDescription: "The Freshworks Compliance Monitoring Plugin adds comprehensive compliance monitoring capabilities to your Freshworks products, helping ensure regulatory adherence while maintaining your existing workflows.",
      features: [
        "Freshworks-native compliance monitoring",
        "Customizable compliance rule sets",
        "Automated compliance reporting",
        "Violation alert system",
        "Compliance documentation generation"
      ],
      icon: "🛡️"
    }
  ];
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500 opacity-10 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500 opacity-10 rounded-full blur-[150px]" />
          </div>
          
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Our Products
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover our comprehensive suite of innovative solutions designed to transform your business
            </motion.p>
          </div>
        </section>
        
        {/* Product Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <div key={category.id} className="mb-20">
                <motion.div 
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold mb-4">
                    <span className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                      {category.name}
                    </span>
                  </h2>
                  <p className="text-gray-300 max-w-3xl">
                    {category.description}
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products
                    .filter(product => product.category === category.id)
                    .map((product, productIndex) => (
                      <motion.div
                        key={product.id}
                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: productIndex * 0.1 }}
                        whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)' }}
                      >
                        <div className="p-6">
                          <div className="text-4xl mb-4">{product.icon}</div>
                          <h3 className={`text-xl font-semibold mb-2 ${category.textColor}`}>
                            {product.name}
                          </h3>
                          <p className="text-gray-300 mb-6">
                            {product.shortDescription}
                          </p>
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className={`bg-gradient-to-r ${category.color} text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity`}
                          >
                            Learn More
                          </button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)}
            categories={categories}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage; 