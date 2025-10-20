"use client"
import React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  Mic,
  MessageSquare,
  Camera,
  Users,
  ChevronDown,
  Brain,
  ArrowLeft,
  Volume2,
  VolumeX,
  Shield,
  Clock,
  Globe,
  Award,
  Heart,
  Settings,
  Languages,
  Send,
} from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import Image from "next/image"
import { SmartMessagingInterface as SmartMessagingComponent } from "@/components/smart-messaging"
import { Button } from "@/components/ui/button"
import { drugRecognizeUpload } from "@/lib/api"

export function CreativeSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const { theme } = useTheme()

  const themeClasses = {
    bg: theme === "dark" ? "bg-gray-900/95" : "bg-white/95",
    text: theme === "dark" ? "text-white" : "text-gray-900",
    textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-600",
    border: theme === "dark" ? "border-gray-700/50" : "border-gray-200/50",
    cardBg: theme === "dark" ? "bg-gray-800/50" : "bg-gray-50/80",
    accent: theme === "dark" ? "bg-gray-700/50" : "bg-gray-100/80",
  }

  const features = [
    {
      id: "voice",
      label: "Voice AI Assistant",
      icon: Mic,
      color: "#FF6B9D",
      gradient: "from-pink-500 to-rose-500",
      description: "Real-time AI voice consultations with multilingual support",
      badge: "Live",
    },
    {
      id: "sms",
      label: "Smart Messaging",
      icon: MessageSquare,
      color: "#8B5CF6",
      gradient: "from-purple-500 to-indigo-500",
      description: "Instant personalized health advice via secure messaging",
      badge: "24/7",
    },
    {
      id: "scan",
      label: "Drug Recognition",
      icon: Camera,
      color: "#06B6D4",
      gradient: "from-blue-500 to-cyan-500",
      description: "AI-powered medication identification and safety information",
      badge: "New",
    },
    {
      id: "experts",
      label: "Expert Network",
      icon: Users,
      color: "#10B981",
      gradient: "from-green-500 to-emerald-500",
      description: "Connect with verified health professionals worldwide",
      badge: "Pro",
    },
  ]

  const openFeature = (featureId: string) => {
    setActiveFeature(featureId)
    setIsOpen(false)
  }

  const closeFeature = () => {
    setActiveFeature(null)
    setIsOpen(true)
  }

  // use extracted component

  const VoiceAIInterface = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isRecording, setIsRecording] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    const backgroundImages = [
      "/backgrounds/emotional-portrait.png",
      "/backgrounds/joyful-expression.png",
      "/backgrounds/artistic-glasses.png",
      "/backgrounds/mystical-sculpture.png",
      "/backgrounds/ethereal-portrait.png",
      "/backgrounds/solidarity-faces.png",
      "/backgrounds/expressive-hands.png",
      "/backgrounds/nature-crown.png",
    ]

    // Enhanced cycling system
    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
      }, 6000) // Faster rotation
      return () => clearInterval(interval)
    }, [])

    return (
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Enhanced Multi-Layer Artistic Background */}
        <div className="absolute inset-0">
          {/* Primary emotional portrait - always present */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/backgrounds/emotional-portrait.png')`,
              filter: "blur(8px) brightness(0.25) contrast(1.4)",
              transform: "scale(1.15)",
            }}
          />

          {/* Secondary static layer */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('/backgrounds/solidarity-faces.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(15px) brightness(0.3)",
              mixBlendMode: "soft-light",
            }}
          />

          {/* Main gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-gray-900/70 to-black/90" />

          {/* Rotating artistic backgrounds */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0 opacity-25"
              initial={{ opacity: 0, scale: 1.2, rotate: 5 }}
              animate={{ opacity: 0.18, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              style={{
                backgroundImage: `url('${backgroundImages[currentImageIndex]}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(12px) brightness(0.4) saturate(1.2)",
                mixBlendMode: "overlay",
              }}
            />
          </AnimatePresence>

          {/* Multiple positioned artistic elements */}
          <div className="absolute top-10 right-10 opacity-8">
            <Image
              src="/backgrounds/mystical-sculpture.png"
              alt="Artistic element"
              width={400}
              height={600}
              className="object-contain"
              style={{ filter: "blur(15px) brightness(0.3)" }}
            />
          </div>

          <div className="absolute bottom-10 left-10 opacity-6">
            <Image
              src="/backgrounds/nature-crown.png"
              alt="Artistic element"
              width={300}
              height={400}
              className="object-contain"
              style={{ filter: "blur(20px) brightness(0.2)" }}
            />
          </div>

          <div className="absolute top-1/2 left-10 opacity-5">
            <Image
              src="/backgrounds/joyful-expression.png"
              alt="Artistic element"
              width={250}
              height={350}
              className="object-contain"
              style={{ filter: "blur(25px) brightness(0.25)" }}
            />
          </div>

          <div className="absolute bottom-1/3 right-20 opacity-7">
            <Image
              src="/backgrounds/ethereal-portrait.png"
              alt="Artistic element"
              width={280}
              height={380}
              className="object-contain"
              style={{ filter: "blur(18px) brightness(0.28)" }}
            />
          </div>

          {/* Enhanced noise texture with animation */}
          <motion.div
            className="absolute inset-0 opacity-12"
            animate={{
              opacity: [0.12, 0.18, 0.12],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay",
            }}
          />

          {/* Additional floating artistic particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/15 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -150, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 12 + Math.random() * 6,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 12,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Rest of Voice AI content with enhanced glass effects */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Elegant Header */}
          <motion.div
            className="p-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center justify-between">
              <motion.button
                onClick={closeFeature}
                className="group p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-6 h-6 text-white group-hover:text-pink-200 transition-colors" />
              </motion.button>

              <div className="text-center">
                <motion.h1
                  className="text-4xl font-light text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Voice AI Assistant
                </motion.h1>
                <motion.p
                  className="text-white/70 text-lg font-light tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Speak your truth, find your voice
                </motion.p>
              </div>

              <motion.div
                className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Languages className="w-6 h-6 text-pink-300" />
              </motion.div>
            </div>
          </motion.div>

          {/* Central Voice Interface */}
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="text-center max-w-2xl">
              {/* Main Voice Button with Sophisticated Design */}
              <motion.div
                className="relative mb-12"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              >
                {/* Outer Rings */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-white/20"
                    style={{
                      width: 320 + i * 60,
                      height: 320 + i * 60,
                      left: -(i * 30),
                      top: -(i * 30),
                    }}
                    animate={
                      isRecording
                        ? {
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.1, 0.3],
                          }
                        : {
                            scale: [1, 1.02, 1],
                            opacity: [0.2, 0.4, 0.2],
                          }
                    }
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {/* Main Voice Button */}
                <motion.button
                  onClick={() => setIsRecording(!isRecording)}
                  className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: isRecording
                      ? "linear-gradient(135deg, #ec4899, #be185d, #7c2d12)"
                      : "linear-gradient(135deg, #1f2937, #374151, #4b5563)",
                  }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: isRecording
                        ? [
                            "linear-gradient(135deg, #ec4899, #be185d)",
                            "linear-gradient(135deg, #be185d, #7c2d12)",
                            "linear-gradient(135deg, #7c2d12, #ec4899)",
                          ]
                        : [
                            "linear-gradient(135deg, #1f2937, #374151)",
                            "linear-gradient(135deg, #374151, #4b5563)",
                            "linear-gradient(135deg, #4b5563, #1f2937)",
                          ],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  />

                  {/* Glass Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20" />

                  {/* Microphone Icon */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <motion.div
                      animate={
                        isRecording
                          ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 5, -5, 0],
                            }
                          : {
                              scale: [1, 1.05, 1],
                            }
                      }
                      transition={{
                        duration: isRecording ? 1 : 3,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Mic className="w-24 h-24 text-white drop-shadow-2xl" />
                    </motion.div>
                  </div>

                  {/* Recording Visualization */}
                  {isRecording && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {[...Array(16)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute bg-white/30 rounded-full"
                          style={{
                            width: "4px",
                            height: "60px",
                            transformOrigin: "2px 160px",
                            transform: `rotate(${i * 22.5}deg)`,
                          }}
                          animate={{
                            scaleY: [0.3, 2.5, 0.3],
                            opacity: [0.2, 1, 0.2],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.05,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Pulse Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={
                      isRecording
                        ? {
                            boxShadow: ["0 0 0 0 rgba(236, 72, 153, 0.7)", "0 0 0 60px rgba(236, 72, 153, 0)"],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: isRecording ? Number.POSITIVE_INFINITY : 0,
                    }}
                  />
                </motion.button>
              </motion.div>

              {/* Status Text */}
              <motion.div
                className="mb-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.h2
                  className="text-3xl font-light text-white mb-4"
                  animate={
                    isRecording
                      ? {
                          scale: [1, 1.02, 1],
                          color: ["#ffffff", "#fce7f3", "#ffffff"],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: isRecording ? Number.POSITIVE_INFINITY : 0 }}
                >
                  {isRecording ? "Listening with empathy..." : "Ready to listen"}
                </motion.h2>
                <p className="text-white/60 text-lg font-light">
                  {isRecording
                    ? "Your voice matters. Speak freely and authentically."
                    : "Tap to begin your conversation • Available in 50+ languages"}
                </p>
              </motion.div>

              {/* Control Buttons */}
              <motion.div
                className="flex items-center justify-center gap-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[
                  {
                    icon: isMuted ? VolumeX : Volume2,
                    color: isMuted ? "text-red-400" : "text-green-400",
                    action: () => setIsMuted(!isMuted),
                    label: isMuted ? "Unmute" : "Mute",
                  },
                  {
                    icon: Settings,
                    color: "text-blue-400",
                    action: () => {},
                    label: "Settings",
                  },
                  {
                    icon: Globe,
                    color: "text-purple-400",
                    action: () => {},
                    label: "Language",
                  },
                ].map((control, index) => (
                  <motion.button
                    key={control.label}
                    onClick={control.action}
                    className="group p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <control.icon className={`w-8 h-8 ${control.color} group-hover:scale-110 transition-transform`} />
                    <span className="sr-only">{control.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <motion.div
            className="p-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-around">
                {[
                  { icon: Shield, label: "End-to-End Encrypted", color: "text-green-400" },
                  { icon: Clock, label: "Available 24/7", color: "text-blue-400" },
                  { icon: Heart, label: "Compassionate AI", color: "text-pink-400" },
                  { icon: Award, label: "Medically Certified", color: "text-yellow-400" },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    className="flex flex-col items-center gap-3 text-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.5,
                      }}
                    >
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </motion.div>
                    <span className="text-sm font-light text-white/80">{feature.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 8,
              }}
            />
          ))}
        </div>
      </motion.div>
    )
  }

  const DrugRecognitionInterface = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisResult, setAnalysisResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [shutterFlash, setShutterFlash] = useState(false)
    const [activeTab, setActiveTab] = useState<"result" | "safety" | "meta">("result")

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target?.files?.[0]
      if (!file) return
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file")
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB")
        return
      }
      setError(null)
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) setImagePreview(e.target.result as string)
      }
      reader.onerror = () => setError("Failed to read the image file")
      reader.readAsDataURL(file)
      setAnalysisResult(null)
    }

    const analyzeDrug = async () => {
      if (!selectedImage) {
        setError("Please select an image first")
        return
      }
      setShutterFlash(true)
      setTimeout(() => setShutterFlash(false), 220)
      setIsAnalyzing(true)
      setError(null)
      setAnalysisResult(null)
      try {
        const res = await drugRecognizeUpload(selectedImage)
        setAnalysisResult(res)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to analyze the image. Please try again.")
      } finally {
        setIsAnalyzing(false)
      }
    }

    const resetAnalysis = () => {
      setSelectedImage(null)
      setImagePreview(null)
      setAnalysisResult(null)
      setIsAnalyzing(false)
      setError(null)
    }

    return (
      <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${(i * 79) % 100}%`,
                top: `${(i * 41) % 100}%`,
                backgroundColor: i % 3 === 0 ? "#60A5FA" : i % 3 === 1 ? "#22D3EE" : "#A78BFA",
                opacity: 0.6,
                filter: "blur(0.5px)",
              }}
              animate={{ y: [0, -80, 0], opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 8 + (i % 5), repeat: Number.POSITIVE_INFINITY, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="relative z-10 h-full w-full flex items-center justify-center p-4 md:p-6">
          <motion.div
            className="relative w-full max-w-5xl rounded-2xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <motion.div
              className="pointer-events-none absolute -inset-1 rounded-[22px]"
              style={{
                background: "conic-gradient(from 0deg, rgba(59,130,246,0.2), rgba(34,211,238,0.2), rgba(167,139,250,0.2), rgba(59,130,246,0.2))",
                mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
                WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
                padding: "1px",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            {isAnalyzing && (
              <motion.div className="absolute left-0 right-0 top-0 h-1 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div className="h-full w-1/3 bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500" animate={{ x: ["-20%", "120%"] }} transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} />
              </motion.div>
            )}

            <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 rounded-lg bg-blue-600/10 ring-1 ring-blue-600/20"
                  animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.04, 1] }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <Camera className="w-5 h-5 text-blue-600" />
                </motion.div>
                <div>
                  <h2 className="text-base md:text-lg font-semibold">Drug Recognition</h2>
                  <p className="text-xs text-muted-foreground">Upload a clear photo to identify medication</p>
                </div>
              </div>
              <Button variant="secondary" onClick={closeFeature}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Image</div>
                  {selectedImage && (
                    <div className="text-[10px] text-muted-foreground">{(selectedImage.size / 1024).toFixed(0)} KB • {selectedImage.type}</div>
                  )}
                </div>
                <motion.div className="relative rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 ring-0" whileHover={{ scale: 1.01 }}>
                  <div className="relative h-72 transition-shadow">
                    {imagePreview ? (
                      <Image src={imagePreview} alt="Preview" fill className="object-contain" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-center p-6 text-sm text-muted-foreground">
                        <div>
                          <div className="font-medium text-gray-600 dark:text-gray-300">Drag & drop or choose an image</div>
                          <div className="text-xs">PNG, JPG up to 10MB</div>
                        </div>
                      </div>
                    )}
                    <input id="drug-image" type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
                    {shutterFlash && <div className="absolute inset-0 bg-white/60 animate-pulse" />}
                    {isAnalyzing && (
                      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <motion.div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)]" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }} />
                      </motion.div>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2 p-3 border-t border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60">
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" onClick={resetAnalysis} disabled={isAnalyzing && !selectedImage}>Clear</Button>
                      <Button onClick={analyzeDrug} disabled={!selectedImage || isAnalyzing}>{isAnalyzing ? "Recognizing..." : "Recognize"}</Button>
                    </div>
                    <div className="text-[10px] text-muted-foreground">Tip: Use neutral background, good lighting</div>
                  </div>
                </motion.div>
                {error && (
                  <motion.div className="mt-3 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                    {error}
                  </motion.div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium">Insights</div>
                  <div className="text-[10px] text-muted-foreground">AI analysis</div>
                </div>
                <div className="mb-3 inline-flex rounded-lg p-1 bg-gray-100 dark:bg-gray-800 relative">
                  <button className={`relative px-3 py-1.5 text-xs rounded-md ${activeTab === "result" ? "text-gray-900 dark:text-white" : "opacity-70"}`} onClick={() => setActiveTab("result")}>
                    {activeTab === "result" && <motion.span layoutId="tabActive" className="absolute inset-0 rounded-md bg-white dark:bg-gray-900 shadow" />}
                    <span className="relative z-10">Result</span>
                  </button>
                  <button className={`relative px-3 py-1.5 text-xs rounded-md ${activeTab === "safety" ? "text-gray-900 dark:text-white" : "opacity-70"}`} onClick={() => setActiveTab("safety")}>
                    {activeTab === "safety" && <motion.span layoutId="tabActive" className="absolute inset-0 rounded-md bg-white dark:bg-gray-900 shadow" />}
                    <span className="relative z-10">Safety</span>
                  </button>
                  <button className={`relative px-3 py-1.5 text-xs rounded-md ${activeTab === "meta" ? "text-gray-900 dark:text-white" : "opacity-70"}`} onClick={() => setActiveTab("meta")}>
                    {activeTab === "meta" && <motion.span layoutId="tabActive" className="absolute inset-0 rounded-md bg-white dark:bg-gray-900 shadow" />}
                    <span className="relative z-10">Meta</span>
                  </button>
                </div>

                <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                  {activeTab === "result" && (
                    analysisResult ? (
                      <div className="space-y-3 text-sm">
                        <div className="text-base font-semibold">{analysisResult.drugName || analysisResult.name || "Detected Drug"}</div>
                        {analysisResult.description && <div className="text-muted-foreground">{analysisResult.description}</div>}
                        {Array.isArray(analysisResult.uses) && (
                          <div>
                            <div className="text-xs font-medium mb-1">Uses</div>
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.uses.map((u: string, i: number) => (
                                <motion.span
                                  key={i}
                                  className="px-2 py-1 rounded-md border text-xs"
                                  initial={{ y: 6, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ delay: i * 0.03 }}
                                >
                                  {u}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">No result yet. Upload an image and click Recognize.</div>
                    )
                  )}

                  {activeTab === "safety" && (
                    analysisResult ? (
                      <div className="space-y-3 text-sm">
                        {Array.isArray(analysisResult.warnings) && (
                          <div>
                            <div className="text-xs font-medium mb-1">Warnings</div>
                            <ul className="list-disc pl-4 space-y-1">
                              {analysisResult.warnings.map((w: string, i: number) => (
                                <motion.li key={i} initial={{ x: -6, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.03 }}>
                                  {w}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {analysisResult.dosage && (
                          <div>
                            <div className="text-xs font-medium mb-1">Dosage</div>
                            <div className="text-muted-foreground">{analysisResult.dosage}</div>
                          </div>
                        )}
                        {Array.isArray(analysisResult.sideEffects) && (
                          <div>
                            <div className="text-xs font-medium mb-1">Side Effects</div>
                            <ul className="list-disc pl-4 space-y-1">
                              {analysisResult.sideEffects.map((s: string, i: number) => (
                                <motion.li key={i} initial={{ x: -6, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.03 }}>
                                  {s}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Safety info will appear after analysis.</div>
                    )
                  )}

                  {activeTab === "meta" && (
                    <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap break-words text-xs">{JSON.stringify(analysisResult || {}, null, 2)}</pre>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )
  }


  return (
    <>
      <motion.div className="relative" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group flex items-center gap-3 px-6 py-3 rounded-2xl ${
            theme === "dark"
              ? "bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600/50"
              : "bg-gradient-to-r from-white to-gray-50 border border-gray-200/80"
          } shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl overflow-hidden`}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              background: [
                "linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)",
                "linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />

          <motion.div
            className="relative z-10 flex items-center gap-3"
            animate={{ y: [0, -1, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className={`p-2 rounded-xl ${
                theme === "dark" ? "bg-purple-500/20" : "bg-purple-500/10"
              } transition-colors duration-300`}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Brain className="w-5 h-5 text-purple-500" />
            </motion.div>
            <div className="text-left">
              <span className={`text-sm font-bold ${themeClasses.text}`}>AI Health Hub</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </motion.div>
          </motion.div>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-4 w-80 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl overflow-hidden z-50"
            style={{
              background: `linear-gradient(135deg, 
          rgba(255, 255, 255, 0.1) 0%, 
          rgba(255, 255, 255, 0.05) 50%, 
          rgba(255, 255, 255, 0.1) 100%)`,
              backdropFilter: "blur(20px) saturate(180%)",
            }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Subtle artistic background for dropdown */}
            <div className="absolute inset-0 opacity-5">
              <div
                style={{
                  backgroundImage: `url('/backgrounds/artistic-glasses.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(30px) brightness(0.4)",
                }}
                className="w-full h-full"
              />
            </div>

            {/* Rest of dropdown content with enhanced glass effects */}
            <div className="relative z-10">
              <div className="p-5 bg-white/10 dark:bg-gray-800/15 border-b border-white/15 dark:border-gray-700/25 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Brain className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 className={`text-lg font-bold ${themeClasses.text}`}>AI Health Platform</h3>
                      <p className={`text-xs ${themeClasses.textSecondary}`}>Choose your health assistant</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {features.map((feature, index) => (
                  <motion.button
                    key={feature.id}
                    onClick={() => openFeature(feature.id)}
                    className="w-full text-left p-4 bg-white/10 dark:bg-gray-800/15 border border-white/15 dark:border-gray-700/25 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/25 hover:shadow-xl transition-all duration-300 group backdrop-blur-xl"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`p-3 bg-gradient-to-br ${feature.gradient} rounded-xl shadow-md`}
                        whileHover={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <feature.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className={`text-sm font-semibold ${themeClasses.text} mb-1`}>{feature.label}</h4>
                        <p className={`text-xs ${themeClasses.textSecondary}`}>{feature.description}</p>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                      </motion.div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeFeature === "voice" && <VoiceAIInterface />}
        {activeFeature === "sms" && <SmartMessagingComponent closeFeature={closeFeature} />}
        {activeFeature === "scan" && <DrugRecognitionInterface />}
      </AnimatePresence>
    </>
  )
}
