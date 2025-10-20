import React from 'react'
import Avatar from './avatar'
import { Brain } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export type Message = {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: string
}

export function MessageBubble({ m, formatTime }: { m: Message; formatTime: (iso: string) => string }) {
  const isUser = m.sender === 'user'
  const { theme } = useTheme()

  const bubbleClasses = isUser
    ? theme === 'dark'
      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent'
      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
    : theme === 'dark'
      ? 'bg-gray-900 text-slate-100 border border-slate-800'
      : 'bg-white text-slate-800 border border-slate-200'

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-9 h-9 shrink-0">
          <div className="w-9 h-9 rounded-md flex items-center justify-center bg-slate-700 text-white">
            <Brain className="w-4 h-4" />
          </div>
        </div>
      )}

      <div className={`group relative max-w-xl break-words rounded-2xl px-4 py-3 shadow-sm ${bubbleClasses}`}>
        <div className="text-[15px] leading-7">{m.text}</div>
        <div className={`mt-1 text-[11px] ${isUser ? 'text-white/85' : theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} text-right tracking-wide`}>{formatTime(m.timestamp)}</div>
      </div>

      {isUser && (
        <div className="w-9 h-9">
          <Avatar name="You" size={36} variant="initials" />
        </div>
      )}
    </div>
  )
}

export default MessageBubble
