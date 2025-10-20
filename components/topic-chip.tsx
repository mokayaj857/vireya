import React from 'react'
import { useTheme } from '@/contexts/theme-context'

export function TopicChip({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  const { theme } = useTheme()
  const grad = theme === 'dark' ? 'from-orange-500 to-red-500' : 'from-blue-600 to-purple-600'

  return (
    <button
      onClick={onClick}
      className={`relative rounded-full text-sm leading-none focus:outline-none transition-all active:scale-[0.98]`}
    >
      <span className={`absolute inset-0 rounded-full ${active ? `bg-gradient-to-r ${grad}` : `bg-gradient-to-r ${grad} opacity-80`}`}></span>
      <span className={`relative block rounded-full ${active ? 'text-white' : 'text-slate-700'} ${active ? 'm-[1px] px-3 py-1 bg-transparent' : 'm-[1px] px-3 py-1 bg-white'} shadow-sm hover:shadow`}>{label}</span>
    </button>
  )
}

export default TopicChip
