"use client"

import { motion } from "framer-motion"
import { BarChart3 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeProvider, useTheme } from "@/contexts/theme-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { CreativeSidebar } from "@/components/creative-sidebar"

function RhodaLandingContent() {
  const { theme } = useTheme()

  const themeClasses = {
    background:
      theme === "dark"
        ? "bg-gradient-to-br from-emerald-600 via-teal-700 to-indigo-900"
        : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100",
    text: theme === "dark" ? "text-white" : "text-gray-900",
    textSecondary: theme === "dark" ? "text-white/80" : "text-gray-600",
    textMuted: theme === "dark" ? "text-white/70" : "text-gray-500",
    border: theme === "dark" ? "border-white/30" : "border-gray-300",
    buttonHover: theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100",
    backdrop: theme === "dark" ? "backdrop-blur-sm" : "backdrop-blur-sm",
    floatingElements: theme === "dark" ? "bg-white/20" : "bg-gray-400/20",
    decorativeElements: theme === "dark" ? "bg-white/5" : "bg-gray-200/30",
  }

  const socialIcons = [
    {
      src: "/social/whatsapp-new.png",
      alt: "WhatsApp",
      name: "whatsapp",
      color: "#25D366",
      hoverColor: "#128C7E",
    },
    {
      src: "/social/telegram.png",
      alt: "Telegram",
      name: "telegram",
      color: "#0088CC",
      hoverColor: "#006699",
    },
    {
      src: "/social/x.png",
      alt: "X (Twitter)",
      name: "x",
      color: "#000000",
      hoverColor: "#1DA1F2",
    },
    {
      src: "/social/linkedin.png",
      alt: "LinkedIn",
      name: "linkedin",
      color: "#0077B5",
      hoverColor: "#005885",
    },
  ]

  return (
    <motion.div
      className={`min-h-screen ${themeClasses.background} ${themeClasses.text} overflow-hidden transition-all duration-500 flex flex-col`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.header
        className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 px-4 sm:px-8 py-4 sm:py-6 relative z-10 w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Original Enhanced Vireya Logo */}
        <motion.div className="relative mb-2 sm:mb-0" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <motion.h1
            className={`text-3xl xs:text-4xl md:text-5xl font-bold bg-gradient-to-r ${
              theme === "dark" ? "from-yellow-400 via-orange-500 to-red-500" : "from-purple-600 via-pink-500 to-red-500"
            } bg-clip-text text-transparent relative`}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
>
            Vireya
            {/* Sparkle effects */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute top-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1.2,
              }}
            />
          </motion.h1>

          {/* Underline effect */}
          <motion.div
            className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r ${
              theme === "dark" ? "from-yellow-400 to-orange-500" : "from-purple-500 to-pink-500"
            } rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          />
        </motion.div>

  <div className="flex items-center gap-1 sm:gap-2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <ThemeToggle />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <CreativeSidebar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <BarChart3 className={`w-10 h-10 ${theme === "dark" ? "text-yellow-400" : "text-orange-500"}`} />
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-1 sm:px-3 py-1 sm:py-2 gap-1 md:gap-0 relative w-full flex-1">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl w-full text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-3 leading-tight">
              Welcome to{" "}
              <motion.span
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <span
                  className={`text-transparent bg-clip-text ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                      : "bg-gradient-to-r from-orange-500 to-red-500"
                  }`}
                >
                  Vireya
                </span>
                <motion.div
                  className={`absolute -bottom-2 left-0 h-1 rounded-full ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                      : "bg-gradient-to-r from-orange-500 to-red-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                />
              </motion.span>
            </h2>
          </motion.div>

          <motion.p
            className={`text-lg xs:text-xl md:text-2xl ${themeClasses.textSecondary} mb-3 md:mb-4 leading-relaxed transition-colors duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            empowering young people with trusted, private guidance on reproductive health, helping them make informed choices and shape brighter futures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <Button
              size="lg"
              className={`$${
                theme === "dark"
                  ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              } text-white font-semibold px-12 md:px-20 py-8 md:py-10 text-3xl md:text-3xl lg:text-3xl xl:text-3xl rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl w-full md:w-auto`}
            >
              Get Started Now
            </Button>
          </motion.div>
        </div>

        {/* Right Illustration */}
        <motion.div
          className="flex-1 flex justify-center items-center relative w-full min-h-[300px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className={`absolute inset-0 rounded-full blur-3xl transition-all duration-500 ${
                theme === "dark" ? "bg-emerald-400/20" : "bg-blue-400/30"
              }`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <Image
              src="/character-portrait.png"
              alt="Portrait of a woman with natural curly hair"
              width={900}
              height={1000}
              className="max-w-[500px] xs:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] w-full h-auto relative z-10"
              priority
            />
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className={`hidden xs:block absolute top-4 left-4 md:top-10 md:left-10 w-5 h-5 md:w-8 md:h-8 ${themeClasses.floatingElements} rounded-full ${themeClasses.backdrop} transition-colors duration-300`}
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          <motion.div
            className={`hidden xs:block absolute bottom-8 right-4 md:bottom-20 md:right-10 w-4 h-4 md:w-6 md:h-6 rounded-full ${themeClasses.backdrop} transition-colors duration-300 ${
              theme === "dark" ? "bg-yellow-400/30" : "bg-orange-400/40"
            }`}
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <motion.div
            className={`hidden xs:block absolute top-1/2 right-0 w-2 h-2 md:w-4 md:h-4 rounded-full ${themeClasses.backdrop} transition-colors duration-300 ${
              theme === "dark" ? "bg-green-400/40" : "bg-blue-400/50"
            }`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
        </motion.div>
      </div>

      {/* Footer with Professional Creative Social Icons */}
      <motion.footer
        className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 mt-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 w-full">
         <div className={`flex flex-wrap items-center gap-4 sm:gap-6 text-base md:text-lg lg:text-xl ${themeClasses.textMuted} transition-colors duration-300 justify-center sm:justify-start`}>
            <motion.a
              href="#"
              className={`${themeClasses.text} transition-colors hover:opacity-80`}
              whileHover={{ scale: 1.05 }}
            >
              Discover
            </motion.a>
            <span className={theme === "dark" ? "text-white/40" : "text-gray-400"}>|</span>
            <motion.a
              href="#"
              className={`${themeClasses.text} transition-colors hover:opacity-80`}
              whileHover={{ scale: 1.05 }}
            >
              Pricing
            </motion.a>
            <span className={theme === "dark" ? "text-white/40" : "text-gray-400"}>|</span>
            <motion.a
              href="#"
              className={`${themeClasses.text} transition-colors hover:opacity-80`}
              whileHover={{ scale: 1.05 }}
            >
              Privacy
            </motion.a>
            <span className={theme === "dark" ? "text-white/40" : "text-gray-400"}>|</span>
            <motion.a
              href="#"
              className={`${themeClasses.text} transition-colors hover:opacity-80`}
              whileHover={{ scale: 1.05 }}
            >
              Terms
            </motion.a>
          </div>

          {/* Professional Creative Social Media Icons */}
          <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
            {socialIcons.map((social, index) => (
              <motion.div
                key={social.name}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 20, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 1.6 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.15,
                  y: -3,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Professional glow background */}
                <motion.div
                  className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-40"
                  style={{ backgroundColor: social.color }}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                {/* Elegant border ring */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 opacity-0 group-hover:opacity-60"
                  style={{ borderColor: social.color }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                />

                {/* Icon container with professional styling */}
                <motion.div
                  className={`relative w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl overflow-hidden backdrop-blur-sm ${
                    theme === "dark"
                      ? "bg-gray-800/80 border border-gray-700/50"
                      : "bg-white/80 border border-gray-200/50"
                  } shadow-lg transition-all duration-300`}
                  whileHover={{
                    backgroundColor: theme === "dark" ? "rgba(31, 41, 55, 0.9)" : "rgba(255, 255, 255, 0.9)",
                    borderColor: social.color,
                    boxShadow: `0 8px 32px ${social.color}40`,
                  }}
                >
                  {/* Subtle animated background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10"
                    style={{
                      background: `radial-gradient(circle at center, ${social.color} 0%, transparent 70%)`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />

                  <Image
                    src={social.src || "/placeholder.svg"}
                    alt={social.alt}
                    width={16}
                    height={16}
                    className="relative z-10 transition-all duration-300 group-hover:scale-110"
                  />

                  {/* Professional shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                    }}
                    style={{
                      transform: "skewX(-20deg)",
                    }}
                  />
                </motion.div>

                {/* Professional tooltip */}
                <motion.div
                  className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 ${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-900"
                  } text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap`}
                  initial={{ y: 5 }}
                  whileHover={{ y: 0 }}
                >
                  {social.alt}
                  <div
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                      theme === "dark" ? "border-t-gray-800" : "border-t-gray-900"
                    }`}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.footer>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`hidden sm:block absolute top-1/4 left-1/4 w-20 h-20 md:w-32 md:h-32 ${themeClasses.decorativeElements} rounded-full blur-xl transition-colors duration-500`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`hidden sm:block absolute bottom-1/4 right-1/4 w-16 h-16 md:w-24 md:h-24 rounded-full blur-xl transition-colors duration-500 ${
            theme === "dark" ? "bg-yellow-400/10" : "bg-orange-400/20"
          }`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function RhodaLanding() {
  return (
    <ThemeProvider>
      <RhodaLandingContent />
    </ThemeProvider>
  )
}
