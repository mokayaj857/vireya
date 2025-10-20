import React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Brain, Send, Paperclip, Smile, Mic, X, Sparkles, PanelRightClose, PanelRightOpen } from "lucide-react"

import Avatar from './avatar'
import TopicChip from './topic-chip'
import MessageBubble from './message-bubble'
import { useTheme } from "@/contexts/theme-context"

type Message = { id: string; text: string; sender: "user" | "ai"; timestamp: string }

export function SmartMessagingInterface({ closeFeature }: { closeFeature: () => void }) {
  const { theme } = useTheme()
  const themeClasses = {
    backdrop:
      theme === "dark"
        ? "bg-gradient-to-br from-emerald-600/60 via-teal-700/55 to-indigo-900/60"
        : "bg-gradient-to-br from-blue-50/90 via-indigo-50/85 to-purple-100/90",
    headerBg:
      theme === "dark"
        ? "bg-gradient-to-r from-gray-950/70 to-gray-900/50"
        : "bg-gradient-to-r from-white/80 to-white/60",
    iconBg:
      theme === "dark"
        ? "bg-gradient-to-br from-orange-500 to-red-500"
        : "bg-gradient-to-br from-blue-600 to-purple-600",
    chatBg:
      theme === "dark"
        ? "bg-gradient-to-b from-gray-950 to-gray-950"
        : "bg-gradient-to-b from-blue-50/60 to-white",
    sidebarBg:
      theme === "dark"
        ? "bg-gray-950/60"
        : "bg-white/70",
    cardBorder: theme === "dark" ? "border-slate-700/50" : "border-slate-200/60",
    sendBtnEnabled:
      theme === "dark"
        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent"
        : "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent",
  }
  const [activeTab, setActiveTab] = React.useState<"chat" | "subscribe">("chat")
  const [message, setMessage] = React.useState("")
  const [messages, setMessages] = React.useState<Message[]>(() => {
    try {
      const raw = localStorage.getItem("vh_messages")
      if (raw) return JSON.parse(raw) as Message[]
    } catch (e) {
      // ignore
    }
    return [
      { id: "welcome", text: "👋 Hi — I'm your AI health assistant. Ask me anything.", sender: "ai", timestamp: new Date().toISOString() },
    ]
  })
  const [isTyping, setIsTyping] = React.useState(false)
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([])
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [selectedLanguage, setSelectedLanguage] = React.useState("en")
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const sidebarRegionId = 'smart-messaging-sidebar'

  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
  const messagesRef = React.useRef<HTMLDivElement | null>(null)
  const sidebarRef = React.useRef<HTMLDivElement | null>(null)
  const [inputFocused, setInputFocused] = React.useState(false)
  const [showScrollFab, setShowScrollFab] = React.useState(false)

  // motion preferences and shared transitions
  const prefersReducedMotion = useReducedMotion()
  const spring = React.useMemo(() => (
    prefersReducedMotion ? { duration: 0.2 } : { type: 'spring', stiffness: 220, damping: 22 }
  ), [prefersReducedMotion])
  const drawerSpring = React.useMemo(() => (
    prefersReducedMotion ? { duration: 0.2 } : { type: 'spring', stiffness: 280, damping: 28 }
  ), [prefersReducedMotion])
  const sidebarList = React.useMemo(() => ({
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.04 } },
  }), [])
  const sidebarItem = React.useMemo(() => ({
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0 },
  }), [])
  const sidebarEnter = React.useMemo(() => ({
    initial: { x: 40, opacity: 0, scale: 0.98, rotateY: prefersReducedMotion ? 0 : 5 },
    animate: { x: 0, opacity: 1, scale: 1, rotateY: 0 },
    exit: { x: 40, opacity: 0, scale: 0.98, rotateY: prefersReducedMotion ? 0 : 5 },
  }), [prefersReducedMotion])

  // persist
  React.useEffect(() => {
    try {
      localStorage.setItem("vh_messages", JSON.stringify(messages))
    } catch (e) {
      // ignore
    }
  }, [messages])

  // persist sidebar open/close
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('vh_sidebar_open')
      if (raw !== null) {
        setSidebarOpen(raw === '1')
      }
    } catch (_) {}
  }, [])

  // desktop outside click closes sidebar
  React.useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (!sidebarOpen) return
      const sidebarEl = sidebarRef.current
      // only apply for desktop widths
      if (window.innerWidth < 1024) return
      if (sidebarEl && e.target instanceof Node && !sidebarEl.contains(e.target)) {
        setSidebarOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [sidebarOpen])

  React.useEffect(() => {
    try {
      localStorage.setItem('vh_sidebar_open', sidebarOpen ? '1' : '0')
    } catch (_) {}
  }, [sidebarOpen])

  // keyboard shortcuts
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // toggle with "s"
      if (e.key.toLowerCase() === 's' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        setSidebarOpen((v) => !v)
      }
      // close with Escape
      if (e.key === 'Escape') {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // focus management when opened
  React.useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  // auto-scroll
  React.useEffect(() => {
    const el = messagesRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, isTyping])

  // track scroll position to show scroll-to-bottom FAB
  React.useEffect(() => {
    const el = messagesRef.current
    if (!el) return
    const onScroll = () => {
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80
      setShowScrollFab(!nearBottom)
    }
    el.addEventListener('scroll', onScroll)
    // initialize once mounted
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // message send
  const sendMessage = (text?: string) => {
    const t = (text ?? message).trim()
    if (!t) return
    const newMsg: Message = { id: Date.now().toString(), text: t, sender: "user", timestamp: new Date().toISOString() }
    setMessages((p) => [...p, newMsg])
    setMessage("")
    setIsTyping(true)
    // simulate AI
    setTimeout(() => {
      setIsTyping(false)
      setMessages((p) => [
        ...p,
        { id: (Date.now() + 1).toString(), text: "Thanks — I hear you. If symptoms persist, please consult a healthcare provider.", sender: "ai", timestamp: new Date().toISOString() },
      ])
    }, 1200)
  }

  // simple topic detection
  const detectTopics = React.useCallback(() => {
    const text = messages.map((m) => m.text.toLowerCase()).join(" ")
    const topics: string[] = []
    const keywords: Record<string, string[]> = {
      contraception: ["birth control", "contraception", "condom", "pill"],
      stis: ["std", "sti", "hiv", "aids"],
      mental: ["anxiety", "depression", "stress"],
      nutrition: ["diet", "nutrition", "food", "vitamin"],
    }
    Object.entries(keywords).forEach(([topic, kws]) => {
      if (kws.some((k) => text.includes(k))) topics.push(topic)
    })
    if (topics.length === 0) topics.push("general-health")
    setSelectedTopics((prev) => {
      // keep previously selected if present
      const merged = Array.from(new Set([...prev, ...topics]))
      return merged
    })
    return topics
  }, [messages])

  React.useEffect(() => {
    detectTopics()
  }, [messages, detectTopics])

  // group by date string
  const grouped = React.useMemo(() => {
    const map = new Map<string, Message[]>()
    messages.forEach((m) => {
      const d = new Date(m.timestamp).toLocaleDateString()
      const arr = map.get(d) || []
      arr.push(m)
      map.set(d, arr)
    })
    return Array.from(map.entries()).map(([date, msgs]) => ({ date, msgs }))
  }, [messages])

  const formatTime = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className={`absolute inset-0 ${themeClasses.backdrop} backdrop-blur-sm`} />

      <motion.div className="relative z-20 w-full max-w-5xl h-[82vh] bg-white/95 dark:bg-gray-950/95 rounded-3xl shadow-2xl overflow-hidden border border-white/20" initial={{ scale: 0.985, y: 8 }} animate={{ scale: 1, y: 0, transition: { type: 'spring', stiffness: 180, damping: 18 } }}>
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div className={`absolute -top-16 -right-10 w-64 h-64 rounded-full blur-3xl opacity-30 ${theme === 'dark' ? 'bg-orange-500/40' : 'bg-blue-500/40'}`} animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className={`absolute bottom-10 -left-10 w-72 h-72 rounded-full blur-3xl opacity-25 ${theme === 'dark' ? 'bg-red-500/40' : 'bg-purple-500/40'}`} animate={{ y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }} />
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(14)].map((_, i) => (
              <motion.span key={i} className="absolute w-1 h-1 rounded-full bg-slate-300/30 dark:bg-white/15" style={{ left: `${(i * 71) % 100}%`, top: `${(i * 37) % 100}%` }} animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }} transition={{ duration: 8 + (i % 5), repeat: Infinity, delay: (i % 7) * 0.4 }} />
            ))}
          </div>
        </div>
        <div className={`flex items-center gap-4 px-5 py-4 border-b border-slate-200/40 ${themeClasses.headerBg} backdrop-blur`}> 
          <div className="flex items-center gap-3">
            <motion.div
              className={`relative w-10 h-10 ${themeClasses.iconBg} rounded-xl flex items-center justify-center text-white shadow-sm`}
              animate={{ boxShadow: [
                '0 0 0px rgba(255,255,255,0.0)',
                theme === 'dark' ? '0 0 18px rgba(251,146,60,0.35)' : '0 0 18px rgba(99,102,241,0.30)',
                '0 0 0px rgba(255,255,255,0.0)'
              ] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.07, rotate: 2 }}
              whileTap={{ scale: 0.96 }}
            >
              <Brain className="w-4 h-4" />
            </motion.div>
            <div>
              <h3 className="relative text-[15px] font-semibold text-slate-900 dark:text-white overflow-hidden">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  Smart Health Messaging
                </motion.span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Private • Accurate • Professional</p>
            </div>
          </div>
          <motion.button
            onClick={() => setSidebarOpen(true)}
            className="ml-auto lg:hidden inline-flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-full border border-slate-300/60 text-slate-600 hover:bg-slate-50 active:scale-[0.98] transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Open sidebar"
          >
            <PanelRightOpen className="w-3.5 h-3.5" />
            Panel
          </motion.button>
          <button onClick={closeFeature} aria-label="Close" className="ml-auto inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full border border-slate-300/60 text-slate-600 hover:bg-slate-50 active:scale-[0.98] transition">
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>

        <div className="flex-1 grid grid-cols-12 h-[calc(82vh-116px)] relative">
          <motion.div
            className={`col-span-12 ${sidebarOpen ? 'lg:col-span-8' : 'lg:col-span-12'} p-5 pb-40 overflow-y-auto ${themeClasses.chatBg} transition-all`}
            ref={messagesRef}
            role="log"
            aria-live="polite"
            aria-atomic="false"
            animate={{ opacity: 1, scale: sidebarOpen ? 0.997 : 1 }}
            transition={{ duration: 0.3 }}
            layout
          >
            <motion.div className="max-w-3xl mx-auto space-y-4" variants={{ show: { transition: { staggerChildren: 0.035 } } }} initial="show" animate="show">
              {grouped.map((group) => (
                <div key={group.date}>
                  <div className="my-4 flex items-center justify-center">
                    <span className="px-2.5 py-1 text-[11px] rounded-full bg-white/70 dark:bg-gray-900/60 border border-slate-200/60 dark:border-slate-800/60 text-slate-500 dark:text-slate-400 shadow-sm">
                      {group.date}
                    </span>
                  </div>
                  <div className="space-y-4">
                          {group.msgs.map((m) => (
                            <motion.div
                              key={m.id}
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.22, ease: 'easeOut' }}
                              whileHover={{ y: -1, scale: 1.005 }}
                            >
                              <div className="relative">
                                {m.sender === 'ai' && (
                                  <motion.span
                                    className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1.2 }}
                                  />
                                )}
                                <MessageBubble m={m} formatTime={formatTime} />
                              </div>
                            </motion.div>
                          ))}
                  </div>
                </div>
              ))}

              <AnimatePresence>
                {isTyping && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-md ${themeClasses.iconBg} flex items-center justify-center text-white`}>
                      <Brain className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <motion.span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#94a3b8' }} animate={{ y: [0, -3, 0], scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0 }} />
                        <motion.span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#94a3b8' }} animate={{ y: [0, -3, 0], scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }} />
                        <motion.span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#94a3b8' }} animate={{ y: [0, -3, 0], scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
          {/* Scroll-to-bottom FAB */}
          <AnimatePresence>
            {showScrollFab && (
              <motion.button
                key="scrollfab"
                className={`absolute bottom-24 right-6 z-30 inline-flex items-center gap-1.5 px-3 py-2 rounded-full border shadow-md ${theme === 'dark' ? 'bg-gray-900/80 border-slate-700 text-white' : 'bg-white/90 border-slate-200 text-slate-700'}`}
                onClick={() => {
                  const el = messagesRef.current
                  if (!el) return
                  el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Scroll to latest messages"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-xs">New</span>
              </motion.button>
            )}
          </AnimatePresence>
            </motion.div>
          </motion.div>

          <AnimatePresence initial={false}>
            {sidebarOpen && (
              <motion.div
                key="rhs"
                className={`col-span-12 lg:col-span-4 border-l border-gray-100/30 p-6 hidden lg:block overflow-y-auto ${themeClasses.sidebarBg} backdrop-blur-md relative`}
                id={sidebarRegionId}
                role="complementary"
                aria-label="Smart messaging sidebar"
                initial={sidebarEnter.initial as any}
                animate={sidebarEnter.animate as any}
                exit={sidebarEnter.exit as any}
                transition={spring as any}
                layout
              ref={sidebarRef as any}
              >
                <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-400/20 dark:via-white/10 to-transparent" />
                <div className="flex items-center justify-end -mt-2 -mr-2 mb-2">
                  <motion.button
                    onClick={() => setSidebarOpen(false)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs ${theme === 'dark' ? 'border-slate-700/60 text-slate-300 hover:bg-gray-900' : 'border-slate-200 text-slate-600 hover:bg-slate-50'} transition`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <PanelRightClose className="w-3.5 h-3.5" />
                    Collapse
                  </motion.button>
                </div>
            <motion.div className="space-y-6" variants={sidebarList} initial="hidden" animate="show">
              <motion.div variants={sidebarItem} className={`rounded-2xl p-5 border ${themeClasses.cardBorder} bg-white/80 dark:bg-gray-900/50 shadow-sm`}> 
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${theme === 'dark' ? 'bg-gradient-to-br from-orange-500 to-red-500' : 'bg-gradient-to-br from-blue-600 to-purple-600'}`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Detected Topics</h4>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300">Auto</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedTopics.map((t) => (
                    <TopicChip key={t} label={t} active={selectedTopics.includes(t)} onClick={() => setSelectedTopics((s) => s.includes(t) ? s.filter(x => x !== t) : [...s, t])} />
                  ))}
                </div>
              </motion.div>

              <motion.div variants={sidebarItem} className={`rounded-2xl overflow-hidden border ${themeClasses.cardBorder} shadow-sm`}> 
                <div className={`${theme === 'dark' ? 'bg-gradient-to-r from-gray-950/70 to-gray-900/50' : 'bg-gradient-to-r from-white/80 to-white/60'} px-5 py-4`}>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Subscription</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Get concise daily tips based on topics you pick</p>
                </div>
                <div className={`px-5 py-4 space-y-3 bg-white/80 dark:bg-gray-900/40`}>
                  <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone (optional)" className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300" />
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelectedLanguage('en')} className={`flex-1 px-3 py-2 rounded-xl text-sm border ${selectedLanguage === 'en' ? (theme === 'dark' ? 'bg-orange-500 text-white border-transparent' : 'bg-blue-600 text-white border-transparent') : 'bg-transparent border-slate-200 text-slate-600'}`}>English</button>
                    <button onClick={() => setSelectedLanguage('es')} className={`flex-1 px-3 py-2 rounded-xl text-sm border ${selectedLanguage === 'es' ? (theme === 'dark' ? 'bg-orange-500 text-white border-transparent' : 'bg-blue-600 text-white border-transparent') : 'bg-transparent border-slate-200 text-slate-600'}`}>Español</button>
                    <button onClick={() => setSelectedLanguage('fr')} className={`flex-1 px-3 py-2 rounded-xl text-sm border ${selectedLanguage === 'fr' ? (theme === 'dark' ? 'bg-orange-500 text-white border-transparent' : 'bg-blue-600 text-white border-transparent') : 'bg-transparent border-slate-200 text-slate-600'}`}>Français</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => { alert('Subscribed (simulated)') }} className={`px-4 py-2 rounded-xl shadow-sm hover:shadow transition ${themeClasses.sendBtnEnabled}`}>Subscribe</button>
                    <button onClick={() => { setSelectedTopics([]); setPhoneNumber('') }} className="border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition">Reset</button>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={sidebarItem} className={`rounded-2xl p-5 border ${themeClasses.cardBorder} bg-white/80 dark:bg-gray-900/50 shadow-sm`}>
                <h4 className="font-semibold text-slate-900 dark:text-white">Quick prompts</h4>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {['Medication help', 'Symptom checker', 'Find doctors', 'Health tips'].map((q) => (
                    <motion.button key={q} onClick={() => setMessage(q)} whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative text-left rounded-xl text-sm">
                      <span className={`${theme === 'dark' ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'} inline-block px-0.5 py-0.5 rounded-xl w-full`}>
                        <span className="block w-full rounded-[10px] bg-white px-3 py-2 text-slate-700 shadow-sm">{q}</span>
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Mobile drawer version of sidebar */}
          <AnimatePresence initial={false}>
            {sidebarOpen && (
              <>
                <motion.button
                  aria-label="Close sidebar"
                  className="fixed inset-0 bg-black/30 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.aside
                  key="rhs-mobile"
                  className={`fixed right-0 top-0 h-full w-[84vw] max-w-sm lg:hidden border-l border-gray-200 dark:border-gray-800 ${themeClasses.sidebarBg} backdrop-blur-md px-5 py-6 z-40 overflow-y-auto shadow-xl`}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={sidebarRegionId}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={drawerSpring as any}
                  drag="x"
                  dragElastic={0.15}
                  onDragEnd={(e, info) => { if (info.offset.x > 80) setSidebarOpen(false) }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Assistant Panel</h3>
                    <motion.button
                      onClick={() => setSidebarOpen(false)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs ${theme === 'dark' ? 'border-slate-700/60 text-slate-300 hover:bg-gray-900' : 'border-slate-200 text-slate-600 hover:bg-slate-50'} transition`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <PanelRightClose className="w-3.5 h-3.5" />
                      Close
                    </motion.button>
                  </div>
                  <div className="space-y-6">
                    <div className={`rounded-2xl p-5 border ${themeClasses.cardBorder} bg-white/80 dark:bg-gray-900/50 shadow-sm`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${theme === 'dark' ? 'bg-gradient-to-br from-orange-500 to-red-500' : 'bg-gradient-to-br from-blue-600 to-purple-600'}`}>
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">Detected Topics</h4>
                        </div>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300">Auto</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedTopics.map((t) => (
                          <TopicChip key={t} label={t} active={selectedTopics.includes(t)} onClick={() => setSelectedTopics((s) => s.includes(t) ? s.filter(x => x !== t) : [...s, t])} />
                        ))}
                      </div>
                    </div>

                    <div className={`rounded-2xl overflow-hidden border ${themeClasses.cardBorder} shadow-sm`}>
                      <div className={`px-5 py-4 ${theme === 'dark' ? 'bg-gradient-to-r from-gray-950/70 to-gray-900/50' : 'bg-gradient-to-r from-white/80 to-white/60'}`}>
                        <h4 className="font-semibold text-slate-900 dark:text-white">Subscription</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Get concise daily tips based on topics you pick</p>
                      </div>
                      <div className={`px-5 py-4 space-y-3 bg-white/80 dark:bg-gray-900/40`}>
                        <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone (optional)" className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300" />
                        <div className="flex items-center gap-2">
                          <button onClick={() => setSelectedLanguage('en')} className={`flex-1 px-3 py-2 rounded-xl text-sm border ${selectedLanguage === 'en' ? (theme === 'dark' ? 'bg-orange-500 text-white border-transparent' : 'bg-blue-600 text-white border-transparent') : 'bg-transparent border-slate-200 text-slate-600'}`}>English</button>
                          <button onClick={() => setSelectedLanguage('es')} className={`flex-1 px-3 py-2 rounded-xl text-sm border ${selectedLanguage === 'es' ? (theme === 'dark' ? 'bg-orange-500 text-white border-transparent' : 'bg-blue-600 text-white border-transparent') : 'bg-transparent border-slate-200 text-slate-600'}`}>Español</button>
                          <button onClick={() => setSelectedLanguage('fr')} className={`flex-1 px-3 py-2 rounded-xl text-sm border ${selectedLanguage === 'fr' ? (theme === 'dark' ? 'bg-orange-500 text-white border-transparent' : 'bg-blue-600 text-white border-transparent') : 'bg-transparent border-slate-200 text-slate-600'}`}>Français</button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button onClick={() => { alert('Subscribed (simulated)') }} className={`px-4 py-2 rounded-xl shadow-sm hover:shadow transition ${themeClasses.sendBtnEnabled}`}>Subscribe</button>
                          <button onClick={() => { setSelectedTopics([]); setPhoneNumber('') }} className="border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition">Reset</button>
                        </div>
                      </div>
                    </div>

                    <div className={`rounded-2xl p-5 border ${themeClasses.cardBorder} bg-white/80 dark:bg-gray-900/50 shadow-sm`}>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Quick prompts</h4>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {['Medication help', 'Symptom checker', 'Find doctors', 'Health tips'].map((q) => (
                          <motion.button key={q} onClick={() => setMessage(q)} whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative text-left rounded-xl text-sm">
                            <span className={`${theme === 'dark' ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'} inline-block px-0.5 py-0.5 rounded-xl w-full`}>
                              <span className="block w-full rounded-[10px] bg-white px-3 py-2 text-slate-700 shadow-sm">{q}</span>
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>
          {/* Floating sidebar toggle handle */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
            <motion.button
              onClick={() => setSidebarOpen((v) => !v)}
              className="relative group"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-expanded={sidebarOpen}
              aria-controls={sidebarRegionId}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className={`absolute inset-0 rounded-full blur-md opacity-40 ${theme === 'dark' ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}></span>
              <span className={`relative inline-flex items-center justify-center w-12 h-12 rounded-full border shadow-lg backdrop-blur ${theme === 'dark' ? 'bg-gray-900/70 border-slate-700/60' : 'bg-white/70 border-slate-200/70'}`}>
                <motion.span
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{ background: 'conic-gradient(from 0deg, rgba(255,255,255,0.0), rgba(255,255,255,0.35), rgba(255,255,255,0.0))' }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />
                {sidebarOpen ? (
                  <PanelRightClose className={`${theme === 'dark' ? 'text-white' : 'text-slate-700'} w-5 h-5`} />
                ) : (
                  <PanelRightOpen className={`${theme === 'dark' ? 'text-white' : 'text-slate-700'} w-5 h-5`} />
                )}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Floating Input Dock */}
        <div className="pointer-events-none absolute left-1/2 bottom-5 -translate-x-1/2 w-full px-5 z-30">
          <div className="pointer-events-auto max-w-3xl mx-auto">
            <div className={`relative rounded-2xl p-[1.5px] ${inputFocused ? (theme === 'dark' ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-blue-600 to-purple-600') : 'bg-white/10'} shadow-xl backdrop-blur` }>
              <AnimatePresence>
                {inputFocused && (
                  <motion.span
                    className="pointer-events-none absolute -inset-1 rounded-[18px]"
                    style={{
                      background: theme === 'dark' ? 'radial-gradient(60% 60% at 50% 50%, rgba(251,146,60,0.15), transparent 70%)' : 'radial-gradient(60% 60% at 50% 50%, rgba(37,99,235,0.18), transparent 70%)'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.6, 1] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, repeat: prefersReducedMotion ? 0 : Infinity, repeatType: 'mirror' }}
                  />
                )}
              </AnimatePresence>
              <div className="rounded-2xl border border-slate-200 bg-white/95 dark:bg-gray-950/95 flex items-end gap-2 px-3 py-2">
                <div className="flex items-center gap-1 shrink-0 px-1">
                  <motion.button whileHover={{ rotate: -6, scale: 1.05 }} whileTap={{ scale: 0.96 }} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-900 transition" aria-label="Attach file"><Paperclip className="w-4 h-4 text-slate-500" /></motion.button>
                  <motion.button whileHover={{ rotate: 6, scale: 1.05 }} whileTap={{ scale: 0.96 }} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-900 transition" aria-label="Emoji picker"><Smile className="w-4 h-4 text-slate-500" /></motion.button>
                  <motion.button whileHover={{ rotate: 0, scale: 1.05 }} whileTap={{ scale: 0.96 }} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-900 transition hidden sm:block" aria-label="Voice input"><Mic className="w-4 h-4 text-slate-500" /></motion.button>
                </div>

                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); const el = textareaRef.current; if (el) { el.style.height = 'auto'; el.style.height = Math.min(160, el.scrollHeight) + 'px' } }}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                  placeholder="Ask anything about your health…"
                  className="flex-1 px-3 py-2 rounded-xl resize-none min-h-12 max-h-40 outline-none text-[15px] text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 caret-slate-700 dark:caret-orange-300 bg-transparent"
                />

                <motion.button onClick={() => sendMessage()} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.98 }} disabled={!message.trim()} aria-disabled={!message.trim()} className={`relative overflow-hidden shrink-0 px-3 py-2 rounded-xl border transition-shadow ${message.trim() ? themeClasses.sendBtnEnabled + ' shadow-[0_8px_24px_rgba(99,102,241,0.35)] dark:shadow-[0_8px_24px_rgba(239,68,68,0.35)]' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                  <motion.span
                    initial={{ x: '-120%' }}
                    animate={{ x: message.trim() ? ['-120%', '120%'] : '-120%' }}
                    transition={{ duration: 1.2, repeat: message.trim() ? Infinity : 0, ease: 'easeInOut' }}
                    className="absolute inset-y-0 -left-10 w-10 opacity-30"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)' }}
                  />
                  <Send className="relative w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
