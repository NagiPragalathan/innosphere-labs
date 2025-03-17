"use client";

import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  icon: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  textColor: string;
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  categories: Category[];
}

const ProductModal = ({ product, onClose, categories }: ProductModalProps) => {
  // Add a safety check to prevent the error
  const category = categories && categories.find(cat => cat.id === product.category) || {
    id: "default",
    name: "Product",
    description: "",
    color: "from-blue-500 to-cyan-400",
    textColor: "text-blue-500"
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${category.color} p-8 rounded-t-2xl`}>
          <div className="text-5xl mb-4">{product.icon}</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {product.name}
          </h2>
          <p className="text-white/90 text-lg">
            {product.shortDescription}
          </p>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-white">Overview</h3>
            <p className="text-gray-300 leading-relaxed">
              {product.fullDescription}
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Key Features</h3>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mt-1 mr-3`}>
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="mt-10 flex justify-center sm:justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-full text-gray-300 hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
            <button
              className={`bg-gradient-to-r ${category.color} text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity`}
            >
              Request Demo
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal; 