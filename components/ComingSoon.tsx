 "use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Countdown Timer Component
const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const launchDate = new Date('2025-05-01').getTime();
    const now = new Date().getTime();
    const difference = launchDate - now;
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-8">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-[1px] rounded-lg">
            <div className="bg-black rounded-lg p-3">
              <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
              <div className="text-xs text-gray-400 uppercase mt-1">{key}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Animated background patterns
const BackgroundPatterns = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
    <div className="absolute top-0 left-0 right-0 bottom-0">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-overlay animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            background: `radial-gradient(circle, ${
              i % 2 ? 'rgba(147,51,234,0.1)' : 'rgba(59,130,246,0.1)'
            } 0%, transparent 70%)`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}
    </div>
  </div>
);

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        .animate-float {
          animation: float 15s infinite ease-in-out;
        }
      `}</style>
      
      <main className="relative min-h-screen flex items-center justify-center px-4">
        <BackgroundPatterns />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-6xl w-full mx-auto py-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Coming Soon
                </h1>
                <p className="text-xl text-gray-400 mb-6">
                  Stay tuned for something extraordinary
                </p>
              </motion.div>

              <CountdownTimer />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <div className="max-w-md mx-auto lg:mx-0">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all outline-none text-white"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      Notify Me
                    </motion.button>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm text-gray-400">Development in Progress</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="/coming-soon.png"
                  alt="Coming Soon"
                  className="w-full max-w-lg mx-auto filter drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ComingSoon;