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

export function CreativeSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [message, setMessage] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: "user" | "ai"; timestamp: Date }>>(
    [],
  )
  const [isTyping, setIsTyping] = useState(false)
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

  const SmartMessagingInterface = () => {
    const [activeTab, setActiveTab] = useState<"chat" | "subscribe">("chat")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [selectedLanguage, setSelectedLanguage] = useState("en")
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [subscriptionStep, setSubscriptionStep] = useState<"setup" | "confirmation">("setup")
    const [searchHistory, setSearchHistory] = useState<string[]>([])
    const [autoTopics, setAutoTopics] = useState<string[]>([])

    const languages = [
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "es", name: "Español", flag: "🇪🇸" },
      { code: "fr", name: "Français", flag: "🇫🇷" },
      { code: "ar", name: "العربية", flag: "🇸🇦" },
      { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
      { code: "pt", name: "Português", flag: "🇧🇷" },
    ]

    // Analyze search history and automatically detect topics
    const analyzeSearchHistory = () => {
      const allMessages = messages.map((m) => m.text.toLowerCase()).join(" ")
      const detectedTopics = []

      // Topic detection based on keywords
      const topicKeywords = {
        contraception: ["birth control", "contraception", "pregnancy prevention", "condom", "pill"],
        stis: ["std", "sti", "sexually transmitted", "infection", "hiv", "aids"],
        consent: ["consent", "boundaries", "permission", "agreement", "respect"],
        menstruation: ["period", "menstruation", "cycle", "cramps", "pms"],
        pregnancy: ["pregnant", "pregnancy", "baby", "prenatal", "maternity"],
        relationships: ["relationship", "partner", "dating", "love", "communication"],
        "mental-health": ["anxiety", "depression", "stress", "mental health", "therapy"],
        nutrition: ["diet", "nutrition", "food", "vitamins", "healthy eating"],
      }

      Object.entries(topicKeywords).forEach(([topic, keywords]) => {
        if (keywords.some((keyword) => allMessages.includes(keyword))) {
          detectedTopics.push(topic)
        }
      })

      // If no specific topics detected, add general health
      if (detectedTopics.length === 0) {
        detectedTopics.push("mental-health", "nutrition")
      }

      setAutoTopics(detectedTopics)
      return detectedTopics
    }

    const handleSubscription = async () => {
      const detectedTopics = analyzeSearchHistory()

      // This will be replaced with your API call
      console.log("Subscription data:", {
        phoneNumber: phoneNumber || null,
        selectedTopics: detectedTopics,
        selectedLanguage,
        subscriptionType: "daily_recommendations",
        searchHistory: messages.slice(-10), // Last 10 messages for context
      })

      // Simulate API call
      setTimeout(() => {
        setIsSubscribed(true)
        setSubscriptionStep("confirmation")
      }, 1500)
    }

    const resetSubscription = () => {
      setPhoneNumber("")
      setSelectedLanguage("en")
      setIsSubscribed(false)
      setSubscriptionStep("setup")
      setAutoTopics([])
    }

    const sendMessageWithAnalysis = () => {
      if (!message.trim()) return

      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sender: "user" as const,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newMessage])
      setMessage("")
      setIsTyping(true)

      // Analyze the message for topics
      setTimeout(() => {
        setIsTyping(false)
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          text: "I understand your concern. Based on your symptoms, I recommend consulting with a healthcare professional. In the meantime, here are some general wellness tips...",
          sender: "ai" as const,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 2000)
    }

    return (
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Artistic Background System */}
        <div className="absolute inset-0">
          {/* Primary Background - Joyful Expression */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/backgrounds/joyful-expression.png')`,
              filter: "blur(12px) brightness(0.2) contrast(1.3)",
              transform: "scale(1.1)",
            }}
          />

          {/* Secondary artistic layer */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `url('/backgrounds/artistic-glasses.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(15px) brightness(0.3)",
              mixBlendMode: "overlay",
            }}
          />

          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/70 to-blue-900/80" />

          {/* Artistic elements positioned strategically */}
          <div className="absolute top-10 right-10 opacity-8">
            <Image
              src="/backgrounds/nature-crown.png"
              alt="Artistic element"
              width={300}
              height={400}
              className="object-contain"
              style={{ filter: "blur(20px) brightness(0.25)" }}
            />
          </div>

          <div className="absolute bottom-10 left-10 opacity-6">
            <Image
              src="/backgrounds/ethereal-portrait.png"
              alt="Artistic element"
              width={250}
              height={350}
              className="object-contain"
              style={{ filter: "blur(25px) brightness(0.2)" }}
            />
          </div>

          {/* Elegant texture overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              mixBlendMode: "soft-light",
            }}
          />
        </div>

        {/* Rest of Smart Messaging content remains the same but with enhanced glass morphism */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Enhanced Header with better backdrop blur */}
          <motion.div
            className="p-6 bg-white/5 dark:bg-gray-800/10 backdrop-blur-2xl border-b border-white/10 dark:border-gray-700/20 shadow-2xl"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.button
                onClick={closeFeature}
                className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-2xl hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
                whileHover={{ scale: 1.05, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </motion.button>

              <div className="flex items-center gap-4 flex-1">
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Smart Health Messaging</h2>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      AI-Powered • Auto-Learning • Secure
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2">
              <motion.button
                onClick={() => setActiveTab("chat")}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  activeTab === "chat"
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                💬 Chat with AI
              </motion.button>
              <motion.button
                onClick={() => setActiveTab("subscribe")}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  activeTab === "subscribe"
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🤖 Auto Recommendations
              </motion.button>
            </div>
          </motion.div>

          {/* Chat Tab Content */}
          {activeTab === "chat" && (
            <>
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                <motion.div
                  className="flex gap-4"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl rounded-tl-lg p-4 shadow-lg border border-white/20 dark:border-gray-700/50 max-w-md">
                      <p className="text-gray-800 dark:text-white leading-relaxed">
                        👋 Hello! I'm your AI health assistant. I learn from our conversations to provide personalized
                        daily recommendations. Ask me anything about:
                      </p>
                      <div className="mt-3 space-y-2">
                        {[
                          "🩺 Health symptoms & concerns",
                          "💊 Medication information",
                          "🏥 Sexual & reproductive health",
                          "📋 Wellness & lifestyle tips",
                        ].map((item, index) => (
                          <motion.div
                            key={item}
                            className="text-sm text-gray-600 dark:text-gray-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">Just now</span>
                  </div>
                </motion.div>

                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`flex gap-4 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                        msg.sender === "user"
                          ? "bg-gradient-to-br from-blue-500 to-cyan-600"
                          : "bg-gradient-to-br from-purple-500 to-indigo-600"
                      }`}
                    >
                      {msg.sender === "user" ? (
                        <div className="w-6 h-6 bg-white rounded-full" />
                      ) : (
                        <Brain className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`backdrop-blur-xl rounded-3xl p-4 shadow-lg border max-w-md ${
                          msg.sender === "user"
                            ? "bg-blue-500 text-white border-blue-400/20 rounded-tr-lg ml-auto"
                            : "bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white border-white/20 dark:border-gray-700/50 rounded-tl-lg"
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>
                      <span
                        className={`text-xs text-gray-500 dark:text-gray-400 mt-2 block ${
                          msg.sender === "user" ? "text-right" : ""
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div className="flex gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl rounded-tl-lg p-4 shadow-lg border border-white/20 dark:border-gray-700/50">
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-purple-500 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <motion.div
                className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/50 shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessageWithAnalysis()}
                      placeholder="Ask me about your health concerns..."
                      className="w-full p-4 pr-12 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    <motion.button
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-purple-500 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Mic className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <motion.button
                    onClick={sendMessageWithAnalysis}
                    disabled={!message.trim()}
                    className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: message.trim() ? 1.05 : 1 }}
                    whileTap={{ scale: message.trim() ? 0.95 : 1 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="flex gap-2 mt-4">
                  {["💊 Medication help", "🤒 Symptom checker", "🏥 Find doctors", "📋 Health tips"].map(
                    (action, index) => (
                      <motion.button
                        key={action}
                        className="px-3 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-xl text-sm hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMessage(action.split(" ").slice(1).join(" "))}
                      >
                        {action}
                      </motion.button>
                    ),
                  )}
                </div>
              </motion.div>
            </>
          )}

          {/* Auto Recommendations Tab Content */}
          {activeTab === "subscribe" && (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-2xl mx-auto">
                {subscriptionStep === "setup" && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        🤖 AI-Powered Daily Recommendations
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Our AI analyzes your conversations to automatically send personalized health tips
                      </p>
                    </div>

                    {/* Auto-detected topics preview */}
                    {messages.length > 0 && (
                      <motion.div
                        className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700/50"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 dark:text-white">AI Analysis Complete</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Based on your conversation history
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          🎯 <strong>Auto-detected interests:</strong> Our AI will send you personalized recommendations
                          about topics you've discussed
                        </p>
                        <div className="flex items-center gap-2 text-sm text-purple-700 dark:text-purple-300">
                          <motion.div
                            className="w-2 h-2 bg-purple-500 rounded-full"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          />
                          <span>Topics automatically selected based on your conversations</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Phone number input */}
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        📱 Phone Number (Optional)
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Leave blank for web-only notifications"
                          className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        💡 Skip phone number to receive recommendations only in the web interface
                      </p>
                    </div>

                    {/* Language selection */}
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        🌍 Preferred Language
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {languages.map((language) => (
                          <motion.button
                            key={language.code}
                            onClick={() => setSelectedLanguage(language.code)}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                              selectedLanguage === language.code
                                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-purple-300"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{language.flag}</span>
                              <span className="text-sm font-medium text-gray-800 dark:text-white">{language.name}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* How it works */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700/50">
                      <h4 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                        <span className="text-blue-500">🔄</span> How Auto-Recommendations Work
                      </h4>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>AI analyzes your chat conversations and questions</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>Automatically detects your health interests and concerns</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>Sends personalized daily tips based on your unique profile</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>Learns and adapts recommendations as you chat more</span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      onClick={handleSubscription}
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      🚀 Start Auto-Recommendations
                    </motion.button>
                  </motion.div>
                )}

                {subscriptionStep === "confirmation" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6"
                  >
                    <motion.div
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <span className="text-3xl text-white">✓</span>
                    </motion.div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">🎉 You're All Set!</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        AI will analyze your conversations and send personalized daily health recommendations
                        {phoneNumber && ` to ${phoneNumber}`}
                      </p>
                    </div>

                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-4">📋 Your Setup:</h4>
                      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex justify-between items-center">
                          <span>🤖 AI Analysis:</span>
                          <span className="font-medium text-green-600">Active</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>📱 Delivery:</span>
                          <span className="font-medium">
                            {phoneNumber ? `SMS to ${phoneNumber}` : "Web notifications only"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>🌍 Language:</span>
                          <span className="font-medium">
                            {languages.find((l) => l.code === selectedLanguage)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>🎯 Topics:</span>
                          <span className="font-medium">Auto-detected from conversations</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>⏰ Frequency:</span>
                          <span className="font-medium">Daily, personalized</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <motion.button
                        onClick={resetSubscription}
                        className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-4 px-6 rounded-xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Modify Settings
                      </motion.button>
                      <motion.button
                        onClick={closeFeature}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Done
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  const VoiceAIInterface = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
    const [analysisResult, setAnalysisResult] = useState<{
      drugName: string
      description: string
      uses: string[]
      warnings: string[]
      dosage: string
      sideEffects: string[]
    } | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target?.files?.[0]
      if (!file) return

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file")
        return
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB")
        return
      }

      setError(null)
      setSelectedImage(file)

      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string)
        }
      }
      reader.onerror = () => {
        setError("Failed to read the image file")
      }
      reader.readAsDataURL(file)
      setAnalysisResult(null)
    }

    const analyzeDrug = async () => {
      if (!selectedImage) {
        setError("Please select an image first")
        return
      }

      setIsAnalyzing(true)
      setError(null)

      try {
        // This will be replaced with your API call
        console.log("Analyzing drug image:", {
          fileName: selectedImage.name,
          fileSize: selectedImage.size,
          fileType: selectedImage.type,
        })

        // Simulate API call with proper error handling
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulate occasional API errors for testing
            if (Math.random() > 0.9) {
              reject(new Error("API temporarily unavailable"))
            } else {
              resolve(true)
            }
          }, 3000)
        })

        // Mock successful result
        setAnalysisResult({
          drugName: "Paracetamol 500mg",
          description:
            "Paracetamol is a common pain reliever and fever reducer. It belongs to a class of drugs known as analgesics (pain relievers) and antipyretics (fever reducers).",
          uses: [
            "Relief of mild to moderate pain",
            "Reduction of fever",
            "Treatment of headaches",
            "Relief from cold and flu symptoms",
          ],
          warnings: [
            "Do not exceed recommended dosage",
            "Avoid alcohol while taking this medication",
            "Consult doctor if pregnant or breastfeeding",
            "Not suitable for children under 6 years",
          ],
          dosage: "Adults: 1-2 tablets every 4-6 hours. Maximum 8 tablets in 24 hours.",
          sideEffects: [
            "Nausea (rare)",
            "Skin rash (rare)",
            "Liver damage (with overdose)",
            "Allergic reactions (very rare)",
          ],
        })
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
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Medical-Artistic Background System */}
        <div className="absolute inset-0">
          {/* Primary Background - Solidarity/Medical theme */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/backgrounds/solidarity-faces.png')`,
              filter: "blur(10px) brightness(0.25) contrast(1.2)",
              transform: "scale(1.1)",
            }}
          />

          {/* Secondary layer - Expressive hands for medical care */}
          <div
            className="absolute inset-0 opacity-12"
            style={{
              backgroundImage: `url('/backgrounds/expressive-hands.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(18px) brightness(0.3)",
              mixBlendMode: "multiply",
            }}
          />

          {/* Cyan medical gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/85 via-blue-900/75 to-indigo-900/80" />

          {/* Positioned artistic elements */}
          <div className="absolute top-20 left-20 opacity-6">
            <Image
              src="/backgrounds/mystical-sculpture.png"
              alt="Medical artistic element"
              width={350}
              height={500}
              className="object-contain"
              style={{ filter: "blur(22px) brightness(0.2)" }}
            />
          </div>

          <div className="absolute bottom-20 right-20 opacity-8">
            <Image
              src="/backgrounds/emotional-portrait.png"
              alt="Care artistic element"
              width={280}
              height={380}
              className="object-contain"
              style={{ filter: "blur(20px) brightness(0.25)" }}
            />
          </div>

          {/* Medical-themed texture */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='medicalNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23medicalNoise)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* Enhanced content with better glass effects */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Enhanced Header */}
          <motion.div
            className="p-6 bg-white/8 dark:bg-gray-800/12 backdrop-blur-2xl border-b border-white/15 dark:border-gray-700/25 shadow-2xl"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <motion.button
                onClick={closeFeature}
                className="p-3 bg-cyan-100 dark:bg-cyan-900/50 rounded-2xl hover:bg-cyan-200 dark:hover:bg-cyan-800/50 transition-colors"
                whileHover={{ scale: 1.05, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </motion.button>

              <div className="flex items-center gap-4 flex-1">
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">AI Drug Recognition</h2>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      AI-Powered • Instant Analysis • Safe
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Error Display */}
          {error && (
            <motion.div
              className="mx-6 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-red-500 text-xl">⚠️</span>
                <div>
                  <h4 className="font-semibold text-red-800 dark:text-red-200">Error</h4>
                  <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
                </div>
                <motion.button
                  onClick={() => setError(null)}
                  className="ml-auto p-1 text-red-500 hover:text-red-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {!selectedImage && !analysisResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-8"
                >
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                      Upload Drug Image for Analysis
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      Take a clear photo of your medication for instant AI-powered identification and safety information
                    </p>
                  </div>

                  <motion.div
                    className="relative group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border-2 border-dashed border-cyan-300 dark:border-cyan-600 group-hover:border-cyan-500 transition-all duration-300">
                      <motion.div
                        className="text-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <Camera className="w-12 h-12 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                          Click to Upload or Drag & Drop
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">Supports JPG, PNG, HEIC formats • Max 10MB</p>
                      </motion.div>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { icon: "🔍", title: "Instant Recognition", desc: "AI identifies drugs in seconds" },
                      { icon: "📋", title: "Detailed Information", desc: "Usage, dosage, and side effects" },
                      { icon: "⚠️", title: "Safety Warnings", desc: "Important precautions and alerts" },
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <div className="text-3xl mb-3">{feature.icon}</div>
                        <h5 className="font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedImage && !analysisResult && !isAnalyzing && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Image Preview</h3>
                    <p className="text-gray-600 dark:text-gray-300">Review your image before analysis</p>
                  </div>

                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        {imagePreview && (
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Drug preview"
                            className="w-full h-64 object-contain bg-gray-100 dark:bg-gray-700 rounded-xl"
                          />
                        )}
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">File Details</h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex justify-between">
                              <span>Name:</span>
                              <span className="font-medium">{selectedImage.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Size:</span>
                              <span className="font-medium">{(selectedImage.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Type:</span>
                              <span className="font-medium">{selectedImage.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      onClick={resetAnalysis}
                      className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-4 px-6 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Choose Different Image
                    </motion.button>
                    <motion.button
                      onClick={analyzeDrug}
                      disabled={isAnalyzing}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isAnalyzing ? 1 : 1.02 }}
                      whileTap={{ scale: isAnalyzing ? 1 : 0.98 }}
                    >
                      🔍 Analyze Drug
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Analyzing Your Medication</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      AI is processing the image and identifying the drug...
                    </p>
                  </div>

                  <motion.div
                    className="relative w-32 h-32 mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <div className="absolute inset-0 border-4 border-cyan-200 dark:border-cyan-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full"></div>
                    <div className="absolute inset-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50">
                    <div className="space-y-3">
                      {[
                        "🔍 Scanning image for drug identification...",
                        "🧠 AI analyzing visual patterns...",
                        "📊 Cross-referencing drug database...",
                        "⚕️ Compiling safety information...",
                      ].map((step, index) => (
                        <motion.div
                          key={step}
                          className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.5 }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-cyan-500 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                          />
                          <span>{step}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {analysisResult && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <span className="text-2xl text-white">✓</span>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      Drug Identified Successfully
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">Here's what we found about your medication</p>
                  </div>

                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-1/3">
                        {imagePreview && (
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Analyzed drug"
                            className="w-full h-48 object-contain bg-gray-100 dark:bg-gray-700 rounded-xl"
                          />
                        )}
                      </div>
                      <div className="lg:w-2/3">
                        <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                          {analysisResult.drugName}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{analysisResult.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50">
                      <h5 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-green-500">✅</span> Uses & Benefits
                      </h5>
                      <ul className="space-y-2">
                        {analysisResult.uses.map((use, index) => (
                          <li key={index} className="text-gray-600 dark:text-gray-300 flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{use}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50">
                      <h5 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-red-500">⚠️</span> Warnings & Precautions
                      </h5>
                      <ul className="space-y-2">
                        {analysisResult.warnings.map((warning, index) => (
                          <li key={index} className="text-gray-600 dark:text-gray-300 flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50">
                      <h5 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-blue-500">💊</span> Dosage Information
                      </h5>
                      <p className="text-gray-600 dark:text-gray-300">{analysisResult.dosage}</p>
                    </div>

                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50">
                      <h5 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-orange-500">⚡</span> Possible Side Effects
                      </h5>
                      <ul className="space-y-2">
                        {analysisResult.sideEffects.map((effect, index) => (
                          <li key={index} className="text-gray-600 dark:text-gray-300 flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            <span>{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⚕️</span>
                      <div>
                        <h6 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">Medical Disclaimer</h6>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          This information is for educational purposes only and should not replace professional medical
                          advice. Always consult with a healthcare provider before starting, stopping, or changing any
                          medication.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      onClick={resetAnalysis}
                      className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-4 px-6 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Analyze Another Drug
                    </motion.button>
                    <motion.button
                      onClick={closeFeature}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Done
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const sendMessageWithAnalysis = () => {
    if (!message.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: "I understand your concern. Based on your symptoms, I recommend consulting with a healthcare professional. In the meantime, here are some general wellness tips...",
        sender: "ai" as const,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 2000)
  }

  const sendMessage = sendMessageWithAnalysis

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
        {activeFeature === "sms" && <SmartMessagingInterface />}
        {activeFeature === "scan" && <DrugRecognitionInterface />}
      </AnimatePresence>
    </>
  )
}
