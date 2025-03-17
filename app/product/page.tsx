"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

// Product Modal Component (inline for simplicity)
interface ProductModalProps {
  product: Product;
  onClose: () => void;
  category: Category;
}

const ProductModal = ({ product, onClose, category }: ProductModalProps) => {
  // Special handling for DocChain product
  const isDocChain = product.id === "docchain";
  
  // DocChain specific content
  const docChainContent = {
    headline: "Embrace the Evolution of Secure, Intelligent Document Management",
    subheadline: "Harness AI and Blockchain to Transform How You Manage, Store, and Share Documents",
    introduction: "Welcome to **DocChain DMS**—where cutting-edge Artificial Intelligence meets unbreakable Blockchain security. We empower businesses to revolutionize document workflows, combining human-like AI interactions with decentralized trust. Whether digitizing handwritten notes, automating data extraction, or ensuring tamper-proof records, DocChain delivers precision, privacy, and productivity at scale.",
    keyFeatures: [
      {
        title: "AI-Powered Document Interaction",
        items: [
          "**Chat with Your Files**: Use natural language to ask questions, request summaries, or extract insights from documents via an intuitive chat interface. Powered by NLP transformers like BERT and GPT.",
          "**Smart Summarization & Sentiment Analysis**: Automatically generate abstracts or gauge document tone with bidirectional LSTMs and seq2seq models."
        ]
      },
      {
        title: "Blockchain-Backed Security",
        items: [
          "**Immutable Audit Trails**: Every edit, share, and access is recorded on a tamper-proof ledger using Hyperledger Fabric (private) or PoW/PoS (public blockchains).",
          "**Zero-Knowledge Proofs**: Explore zk-STARKs and zk-SNARKs for privacy-preserving transactions in high-compliance industries."
        ]
      },
      {
        title: "Next-Gen OCR for Handwritten Text",
        items: [
          "**From Paper to Digital in Seconds**: Convert handwritten notes into searchable digital text with 99% accuracy using AI-driven OCR, enhanced by adversarial learning models."
        ]
      },
      {
        title: "Seamless Multi-Chain Integration",
        items: [
          "**Interoperable Ecosystems**: Connect across chains via Cosmos (IBC) and Polkadot (XCMP). Integrate real-world data with Chainlink oracles for DeFi and compliance use cases."
        ]
      }
    ],
    techDeepDive: {
      ai: {
        title: "AI & Machine Learning Excellence",
        items: [
          "**Generative AI (GenAI) Workflows**: Train models using GANs and VAEs for synthetic data generation, or fine-tune pre-trained architectures like EfficientNet for industry-specific tasks.",
          "**End-to-End Pipelines**: From tokenization and PCA-driven data preprocessing to Bayesian hyperparameter tuning, we ensure models are robust and ready for deployment."
        ]
      },
      blockchain: {
        title: "Blockchain Architecture",
        items: [
          "**Consensus Mechanisms**: Deploy BFT for enterprise-grade private chains or hybrid PoW/PoS for public networks.",
          "**Smart Contract Security**: Audited codebases in Solidity/Rust, verified via MythX and Slither to eliminate vulnerabilities.",
          "**Cross-Chain Solutions**: Build DApps that communicate across Ethereum, Polkadot, and more."
        ]
      }
    },
    useCases: [
      {
        industry: "Healthcare",
        description: "Securely manage patient records with HIPAA-compliant blockchain storage and AI-driven data retrieval."
      },
      {
        industry: "Legal",
        description: "Automate contract analysis, redaction, and notarization with NLP and immutable timestamps."
      },
      {
        industry: "Finance",
        description: "Streamline KYC processes using OCR for handwritten forms and blockchain for audit trails."
      },
      {
        industry: "Education",
        description: "Digitize academic transcripts and enable instant verification via decentralized ledgers."
      }
    ],
    trustedBy: [
      "Cloud Infrastructure: AWS, Azure, and hybrid environments.",
      "Blockchain Networks: Hyperledger, Polkadot, Cosmos.",
      "AI Frameworks: TensorFlow, PyTorch, Hugging Face."
    ]
  };
  
  // Function to render markdown-like text with bold formatting
  const renderFormattedText = (text: string) => {
    return text.split('**').map((part, index) => 
      index % 2 === 0 ? 
        part : 
        <span key={index} className="font-semibold">{part}</span>
    );
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-gray-900/90 backdrop-blur-md rounded-2xl border border-gray-800"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 bg-gray-800/50 p-2 rounded-full"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {isDocChain ? (
          // DocChain Detailed Documentation
          <div>
            {/* Hero Section */}
            <div className={`bg-gradient-to-r ${category.color} p-10 rounded-t-2xl relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/10"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <div className="inline-block text-5xl mb-6 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">📄</div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  DocChain DMS: Redefining Document Management with AI & Blockchain
                </h2>
                <p className="text-white/90 text-xl font-light">
                  {docChainContent.headline}
                </p>
                <p className="text-white/80 text-lg mt-4">
                  {docChainContent.subheadline}
                </p>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8 sm:p-10">
              {/* Introduction */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className={`inline-block w-1 h-6 bg-gradient-to-b ${category.color} mr-3 rounded-full`}></span>
                  Introduction
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {renderFormattedText(docChainContent.introduction)}
                </p>
              </div>
              
              {/* Key Features */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className={`inline-block w-1 h-6 bg-gradient-to-b ${category.color} mr-3 rounded-full`}></span>
                  Key Features
                </h3>
                
                <div className="space-y-8">
                  {docChainContent.keyFeatures.map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm border border-gray-700/30"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className="text-xl font-semibold mb-4 text-blue-400">{feature.title}</h4>
                      <ul className="space-y-4">
                        {feature.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-gray-300">
                            {renderFormattedText(item)}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Technology Deep Dive */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className={`inline-block w-1 h-6 bg-gradient-to-b ${category.color} mr-3 rounded-full`}></span>
                  Technology Deep Dive
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* AI Section */}
                  <motion.div 
                    className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm border border-gray-700/30"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h4 className="text-xl font-semibold mb-4 text-purple-400">{docChainContent.techDeepDive.ai.title}</h4>
                    <ul className="space-y-4">
                      {docChainContent.techDeepDive.ai.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-300">
                          {renderFormattedText(item)}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  {/* Blockchain Section */}
                  <motion.div 
                    className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm border border-gray-700/30"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="text-xl font-semibold mb-4 text-cyan-400">{docChainContent.techDeepDive.blockchain.title}</h4>
                    <ul className="space-y-4">
                      {docChainContent.techDeepDive.blockchain.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-300">
                          {renderFormattedText(item)}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
              
              {/* Use Cases */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className={`inline-block w-1 h-6 bg-gradient-to-b ${category.color} mr-3 rounded-full`}></span>
                  Use Cases
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {docChainContent.useCases.map((useCase, index) => (
                    <motion.div 
                      key={index}
                      className="bg-gray-800/30 p-5 rounded-xl backdrop-blur-sm border border-gray-700/30"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className="text-lg font-semibold mb-2 text-blue-300">{useCase.industry}</h4>
                      <p className="text-gray-300">{useCase.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Trusted By */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className={`inline-block w-1 h-6 bg-gradient-to-b ${category.color} mr-3 rounded-full`}></span>
                  Trusted By Innovators
                </h3>
                
                <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm border border-gray-700/30">
                  <p className="text-gray-300 mb-4">We power solutions for industries leveraging:</p>
                  <ul className="space-y-3">
                    {docChainContent.trustedBy.map((item, index) => (
                      <li key={index} className="text-gray-300 flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mt-1 mr-3">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="mt-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-xl border border-blue-500/20">
                <h3 className="text-2xl font-semibold mb-6 text-center text-white">Join the Document Revolution</h3>
                <p className="text-xl text-center text-gray-300 mb-8">Ready to Transform Your Document Workflow?</p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Schedule a Demo
                  </button>
                  <button className="bg-gray-700 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Sales
                  </button>
                </div>
                
                <p className="text-center text-gray-400 mt-8">Be Part of the Future—Where AI Meets Trust.</p>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-gray-900 p-6 rounded-b-2xl border-t border-gray-800 text-center text-gray-500 text-sm">
              © DocChain DMS | Privacy Policy | Careers | Blog
            </div>
          </div>
        ) : (
          // Standard Product Modal Content for other products
          <>
            {/* Header */}
            <div className={`bg-gradient-to-r ${category.color} p-8 rounded-t-2xl relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/10"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="relative z-10">
                <div className="inline-block text-5xl mb-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">{product.icon}</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {product.name}
                </h2>
                <p className="text-white/90 text-lg max-w-3xl">
                  {product.shortDescription}
                </p>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8">
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <span className={`inline-block w-1 h-6 bg-gradient-to-b ${category.color} mr-3 rounded-full`}></span>
                  Overview
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {product.fullDescription}
                </p>
              </div>
              
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                  <span className={`inline-block w-1 h-6 bg-gradient-to-b ${category.color} mr-3 rounded-full`}></span>
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start bg-gray-800/30 p-4 rounded-xl backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mt-0.5 mr-4`}>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-200 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="mt-12 flex flex-col sm:flex-row justify-center sm:justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-700 rounded-xl text-gray-300 hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Close
                </button>
                <button
                  className={`bg-gradient-to-r ${category.color} text-white px-8 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center font-medium`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Request Demo
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Product categories
  const categories = [
    {
      id: "blockchain",
      name: "Blockchain Solutions",
      description: "Secure, transparent, and immutable blockchain solutions for enterprise needs.",
      color: "from-blue-500 to-cyan-400",
      textColor: "text-blue-500",
      bgColor: "bg-blue-500/5",
      borderColor: "border-blue-500/20",
      icon: "🔗"
    },
    {
      id: "ai",
      name: "AI-Driven Solutions",
      description: "Intelligent automation and decision-making tools powered by advanced AI.",
      color: "from-purple-600 to-pink-500",
      textColor: "text-purple-500",
      bgColor: "bg-purple-500/5",
      borderColor: "border-purple-500/20",
      icon: "🧠"
    },
    {
      id: "cloud",
      name: "Cloud & SaaS Platforms",
      description: "Scalable, flexible cloud solutions and software-as-a-service platforms.",
      color: "from-cyan-500 to-emerald-500",
      textColor: "text-cyan-500",
      bgColor: "bg-cyan-500/5",
      borderColor: "border-cyan-500/20",
      icon: "☁️"
    },
    {
      id: "plugins",
      name: "Plugins",
      description: "Extend your existing systems with powerful integration plugins.",
      color: "from-amber-500 to-orange-500",
      textColor: "text-amber-500",
      bgColor: "bg-amber-500/5",
      borderColor: "border-amber-500/20",
      icon: "🔌"
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
  
  // Get the selected product's category
  const getProductCategory = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };
  
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
            <motion.div
              className="inline-block mb-6 px-6 py-2 border border-gray-700 rounded-full bg-gray-900/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-gray-300">Explore Our Product Suite</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Innovative Solutions for Modern Enterprises
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover our comprehensive suite of cutting-edge products designed to transform your business operations and drive growth
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {categories.map((category, index) => (
                <a 
                  key={index}
                  href={`#${category.id}`}
                  className={`px-5 py-2 rounded-full ${category.bgColor} ${category.borderColor} border flex items-center gap-2 hover:opacity-80 transition-opacity`}
                >
                  <span>{category.icon}</span>
                  <span className={category.textColor}>{category.name}</span>
                </a>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Product Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <div key={category.id} id={category.id} className="mb-24 scroll-mt-32">
                <motion.div 
                  className="mb-12 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`text-4xl p-4 rounded-2xl ${category.bgColor} ${category.borderColor} border`}>
                      {category.icon}
                    </div>
                    <h2 className="text-3xl font-bold">
                      <span className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                        {category.name}
                      </span>
                    </h2>
                  </div>
                  <p className="text-gray-300 max-w-3xl text-lg">
                    {category.description}
                  </p>
                  <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-8"></div>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products
                    .filter(product => product.category === category.id)
                    .map((product, productIndex) => (
                      <motion.div
                        key={product.id}
                        className={`${category.bgColor} backdrop-blur-sm border ${category.borderColor} rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-${category.textColor}/10 transition-all duration-300`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: productIndex * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="p-8">
                          <div className="text-4xl mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center">{product.icon}</div>
                          <h3 className={`text-xl font-semibold mb-3 ${category.textColor}`}>
                            {product.name}
                          </h3>
                          <p className="text-gray-300 mb-8 min-h-[60px]">
                            {product.shortDescription}
                          </p>
                          <button
                            onClick={() => setSelectedProduct(product)}
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
              </div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
            <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500 opacity-10 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500 opacity-10 rounded-full blur-[150px]" />
          </div>
          
          <motion.div 
            className="max-w-4xl mx-auto text-center bg-gray-900/50 backdrop-blur-md p-10 rounded-3xl border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Ready to Transform Your Business?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Contact our team to discuss how our products can help you achieve your business goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Schedule a Demo
              </Link>
              <Link 
                href="/contact"
                className="bg-gray-800 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-700 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
      
      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)}
            category={getProductCategory(selectedProduct.category)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;