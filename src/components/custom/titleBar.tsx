'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Window } from '@tauri-apps/api/window'
import { Star, Minus, Square, X, Maximize2, Minimize2 } from 'lucide-react'

interface TitleBarProps {
  title?: string
  showIcon?: boolean
  className?: string
}

export default function CustomTitleBar({ 
  title = "Orion Observatory", 
  showIcon = true,
  className = "" 
}: TitleBarProps) {
  const [appWindow, setAppWindow] = useState<Window | null>(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isHovered, setIsHovered] = useState<string | null>(null)

  useEffect(() => {
    async function getWindow() {
      try {
        const window = await Window.getCurrent()
        setAppWindow(window)
        
        // Check if window is maximized
        const maximized = await window.isMaximized()
        setIsMaximized(maximized)
        
        // Listen for window state changes
        const unlisten = await window.onResized(() => {
          window.isMaximized().then(setIsMaximized)
        })
        
        return () => unlisten() // Cleanup listener on unmount
      } catch (error) {
        console.error('Failed to initialize window:', error)
      }
    }
    
    getWindow()
  }, [])

  if (!appWindow) {
    return (
      <div className={`h-8 bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 ${className}`}>
        <div className="flex items-center justify-center h-full">
          <div className="w-4 h-4 bg-prim-green/20 rounded-full animate-pulse" />
        </div>
      </div>
    )
  }

  const handleMinimize = async () => {
    try {
      await appWindow.minimize()
      console.log('Window minimized')
    } catch (error) {
      console.error('Minimize error:', error)
    }
  }

  const handleToggleMaximize = async () => {
    try {
      await appWindow.toggleMaximize()
      const maximized = await appWindow.isMaximized()
      setIsMaximized(maximized)
      console.log('Window maximize toggled')
    } catch (error) {
      console.error('Toggle maximize error:', error)
    }
  }

  const handleClose = async () => {
    try {
      await appWindow.close()
      console.log('Window closed')
    } catch (error) {
      console.error('Close error:', error)
    }
  }

  const buttonVariants = {
    initial: { scale: 1, opacity: 0.7 },
    hover: { 
      scale: 1.1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    tap: { 
      scale: 0.95,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  }

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 5 },
    tap: { rotate: -5 }
  }

  return (
    <motion.div 
      className={`
        h-8  bg-black 
        sticky top-0
        backdrop-blur-md border-b border-gray-700/50 
        flex items-center justify-between px-3 
        select-none
        ${className}
      `}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      data-tauri-drag-region
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-prim-green/5 via-transparent to-prim-green/5 opacity-50" />
      
      {/* Left Section - App Title */}
      <motion.div 
        className="flex items-center gap-2 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {showIcon && (
          <motion.div
            variants={iconVariants}
            animate="initial"
            whileHover="hover"
            className="flex items-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-4 h-4 text-prim-green" />
            </motion.div>
          </motion.div>
        )}
        
        <motion.h1 
          className="text-sm font-semibold text-white/90 tracking-wide"
          whileHover={{ 
            color: "#93B58C",
            transition: { duration: 0.2 }
          }}
        >
          {title}
        </motion.h1>
        
        {/* Status Indicator */}
        <motion.div
          className="w-2 h-2 rounded-full bg-prim-green"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </motion.div>

      {/* Right Section - Window Controls */}
      <motion.div 
        className="flex items-center gap-1 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {/* Minimize Button */}
        <motion.button
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handleMinimize}
          onMouseEnter={() => setIsHovered('minimize')}
          onMouseLeave={() => setIsHovered(null)}
          className="
            w-6 h-6 rounded-md flex items-center justify-center
            bg-gray-800/50 hover:bg-yellow-500/20 
            border border-gray-700/50 hover:border-yellow-500/30
            transition-colors duration-200
          "
          aria-label="Minimize window"
        >
          <motion.div
            animate={{ 
              color: isHovered === 'minimize' ? '#EAB308' : '#9CA3AF'
            }}
            transition={{ duration: 0.2 }}
          >
            <Minus className="w-3 h-3" />
          </motion.div>
        </motion.button>

        {/* Maximize/Restore Button */}
        <motion.button
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handleToggleMaximize}
          onMouseEnter={() => setIsHovered('maximize')}
          onMouseLeave={() => setIsHovered(null)}
          className="
            w-6 h-6 rounded-md flex items-center justify-center
            bg-gray-800/50 hover:bg-green-500/20 
            border border-gray-700/50 hover:border-green-500/30
            transition-colors duration-200
          "
          aria-label={isMaximized ? "Restore window" : "Maximize window"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isMaximized ? 'restore' : 'maximize'}
              initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                color: isHovered === 'maximize' ? '#10B981' : '#9CA3AF'
              }}
              exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {isMaximized ? (
                <Minimize2 className="w-3 h-3" />
              ) : (
                <Maximize2 className="w-3 h-3" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* Close Button */}
        <motion.button
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handleClose}
          onMouseEnter={() => setIsHovered('close')}
          onMouseLeave={() => setIsHovered(null)}
          className="
            w-6 h-6 rounded-md flex items-center justify-center
            bg-gray-800/50 hover:bg-red-500/20 
            border border-gray-700/50 hover:border-red-500/30
            transition-colors duration-200
          "
          aria-label="Close window"
        >
          <motion.div
            animate={{ 
              color: isHovered === 'close' ? '#EF4444' : '#9CA3AF',
              rotate: isHovered === 'close' ? 90 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-3 h-3" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Subtle shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}