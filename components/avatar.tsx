import React from 'react'

export function Avatar({ name, size = 32, className = '', variant = 'initials' }: { name?: string; size?: number; className?: string; variant?: 'initials' | 'photo' }) {
  // generate initials from name or fallback to 'U'
  const initials = (name || 'You')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join('')

  const style: React.CSSProperties = {
    width: size,
    height: size,
    lineHeight: `${size}px`,
  }

  if (variant === 'photo') {
    return (
      <div style={style} className={`select-none rounded-full bg-gradient-to-br from-slate-600 to-slate-700 text-white overflow-hidden ${className}`} aria-hidden>
        {/* simple neutral SVG placeholder (silhouette) */}
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="12" r="12" fill="url(#g)" />
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <path d="M12 12c1.657 0 3-1.567 3-3.5S13.657 5 12 5s-3 1.567-3 3.5S10.343 12 12 12z" fill="rgba(255,255,255,0.85)" />
          <path d="M4 19c0-2.8 3.6-4 8-4s8 1.2 8 4v1H4v-1z" fill="rgba(255,255,255,0.85)" />
        </svg>
      </div>
    )
  }

  return (
    <div style={style} className={`select-none rounded-full bg-slate-700 text-white font-medium flex items-center justify-center ${className}`} aria-hidden>
      {initials}
    </div>
  )
}

export default Avatar
