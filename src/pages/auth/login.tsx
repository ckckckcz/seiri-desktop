'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Star, Sparkles } from 'lucide-react'
import {Link} from "react-router-dom"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] // Using cubic-bezier for easeInOut
    }
  }
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 text-prim-green opacity-20"
        //   variants={floatingVariants}
          animate="animate"
        >
          <Star size={24} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-prim-green opacity-30"
        //   variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        >
          <Sparkles size={32} />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-20 text-prim-green opacity-25"
        //   variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        >
          <Star size={20} />
        </motion.div>
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-prim-green opacity-5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-prim-green opacity-5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.05, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div 
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
          </motion.div>

          {/* Main Card */}
          <motion.div
            className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl"
            // variants={itemVariants}
            whileHover={{ 
              boxShadow: "0 25px 50px -12px rgba(147, 181, 140, 0.1)",
              borderColor: "rgba(147, 181, 140, 0.3)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Heading */}
            <motion.div 
              className="text-center mb-8"
            //   variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
                Welcome Back
              </h2>
              <p className="text-gray-400 text-sm">
                Sign in to continue monitoring the cosmos
              </p>
            </motion.div>

            {/* Login Form */}
            <motion.div 
              className="space-y-6"
            //   variants={itemVariants}
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
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username or email"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-prim-green focus:ring-2 focus:ring-prim-green/20 h-12 transition-all duration-300 hover:bg-gray-800/70"
                  />
                </motion.div>
              </motion.div>

              {/* Password Field */}
              <motion.div 
                className="space-y-2"
                // variants={itemVariants}
              >
                <Label htmlFor="password" className="text-gray-300 text-sm font-medium">
                  Password
                </Label>
                <motion.div 
                  className="relative"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-prim-green focus:ring-2 focus:ring-prim-green/20 h-12 pr-12 transition-all duration-300 hover:bg-gray-800/70"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-prim-green transition-colors duration-200"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={showPassword ? 'hide' : 'show'}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Remember Me and Forgot Password */}
              <motion.div 
                className="flex items-center justify-between"
                // variants={itemVariants}
              >
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <Checkbox
                    id="remember"
                    className="border-gray-600 data-[state=checked]:bg-prim-green data-[state=checked]:border-prim-green"
                  />
                  <Label htmlFor="remember" className="text-gray-300 text-sm cursor-pointer">
                    Remember me
                  </Label>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/forgot-password"
                    className="text-prim-green text-sm transition-colors duration-200 hover:text-prim-green/80 underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </motion.div>
              </motion.div>

              {/* Login Button */}
              {/* <motion.div variants={itemVariants}> */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-prim-green hover:bg-prim-green/90 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-prim-green/25 disabled:opacity-50"
                  >
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Signing In...
                        </motion.div>
                      ) : (
                        <motion.span
                          key="signin"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Sign In to Observatory
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
                By signing in, you agree to our{' '}
                <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                  <Link to="/terms" className="text-prim-green transition-colors duration-200 hover:text-prim-green/80 underline-offset-4 hover:underline">
                    Terms and Conditions
                  </Link>
                </motion.span>
                {' '}and{' '}
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
  )
}
