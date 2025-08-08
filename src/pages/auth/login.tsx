"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Aurora from "@/components/background/Aurora";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
      <Aurora colorStops={["#93B58C", "#7DA076", "#93B58C"]} blend={0.5} amplitude={1.0} speed={0.5} />

      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <motion.div className="w-full max-w-md" initial="hidden" animate="visible">
          {/* Logo */}
          {/* <motion.div 
            className="text-center mb-8"
            // variants={itemVariants}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Star className="text-prim-green" size={28} />
              </motion.div>
              <h1 className="text-2xl font-bold text-white">Seiri</h1>
            </motion.div>
          </motion.div> */}

          {/* Main Card */}
          <motion.div
            className="bg-gray-900/40 backdrop-blur-2xl border-2 border-gray-800/50 rounded-3xl p-8 shadow-3xl"
            // variants={itemVariants}
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(147, 181, 140, 0.1)",
              borderColor: "rgba(147, 181, 140, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Heading */}
            <motion.div
              className="text-center mb-8"
              //   variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-white mb-2 leading-tight">Welcome to Seiri</h2>
              <p className="text-gray-400 text-sm">Sign in to continue monitoring the cosmos</p>
            </motion.div>

            <motion.div
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              {/* Username/Email Field */}
              <motion.div
                className="space-y-2"
                // variants={itemVariants}
              >
                <Label htmlFor="username" className="text-gray-300 text-sm font-medium">
                  Username or Email
                </Label>
                <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username or email"
                    className="bg-gray-800/50 border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:border-prim-green focus:ring-2 focus:ring-prim-green/20 h-12 transition-all duration-300 hover:bg-gray-800/70"
                  />
                </motion.div>
              </motion.div>
              {/* <motion.div variants={itemVariants}> */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-prim-green hover:bg-prim-green/90 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-prim-green/25 disabled:opacity-50"
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 ">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                        Signing In...
                      </motion.div>
                    ) : (
                      <motion.span key="signin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-2xl text-lg">
                        Continue
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
              {/* </motion.div> */}
            </motion.div>

            {/* Terms and Privacy */}
            <motion.div
              className="text-center mt-6"
              //   variants={itemVariants}
            >
              <p className="text-xs text-gray-500 leading-relaxed">
                By signing in, you agree to our{" "}
                <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                  <Link to="/terms" className="text-prim-green transition-colors duration-200 hover:text-prim-green/80 underline-offset-4 hover:underline">
                    Terms and Conditions
                  </Link>
                </motion.span>{" "}
                and{" "}
                <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                  <Link to="/privacy" className="text-prim-green transition-colors duration-200 hover:text-prim-green/80 underline-offset-4 hover:underline">
                    Privacy Policy
                  </Link>
                </motion.span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
