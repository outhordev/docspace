'use client'

import { useState, useEffect, useRef } from 'react'
import { Moon, Sun, ChevronDown, Sparkles } from 'lucide-react'

export type ThemeOverride = 'custom' | 'dark' | 'light'

const STORAGE_KEY = 'docspace-theme-override'

const OPTIONS: { value: ThemeOverride; label: string; icon: React.ReactNode; description: string }[] = [
  { value: 'custom', label: 'Themed', icon: <Sparkles size={14} />, description: 'Rich space themes' },
  { value: 'dark',   label: 'Dark',   icon: <Moon size={14} />,     description: 'Flat dark mode' },
  { value: 'light',  label: 'Light',  icon: <Sun size={14} />,      description: 'Flat light mode' },
]

interface ThemeToggleProps {
  onChange?: (override: ThemeOverride) => void
}

export function useThemeOverride(): [ThemeOverride, (v: ThemeOverride) => void] {
  const [override, setOverride] = useState<ThemeOverride>('custom')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeOverride | null
    if (stored && ['custom', 'dark', 'light'].includes(stored)) {
      setOverride(stored)
    }
  }, [])

  const set = (v: ThemeOverride) => {
    setOverride(v)
    localStorage.setItem(STORAGE_KEY, v)
  }

  return [override, set]
}

export default function ThemeToggle({ onChange }: ThemeToggleProps) {
  const [override, setOverride] = useThemeOverride()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (value: ThemeOverride) => {
    setOverride(value)
    onChange?.(value)
    setOpen(false)
  }

  const current = OPTIONS.find(o => o.value === override) || OPTIONS[0]

  return (
    <div className="relative" ref={ref}>
      <button
        className="btn btn-ghost btn-sm gap-2"
        onClick={() => setOpen(!open)}
        aria-label="Toggle theme mode"
      >
        <span className="text-base-content/50">{current.icon}</span>
        <span className="hidden sm:inline text-base-content/60">{current.label}</span>
        <ChevronDown size={14} className={`text-base-content/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-base-100 rounded-xl border border-base-300 shadow-xl z-[100] overflow-hidden">
          <div className="px-3 py-2 border-b border-base-300">
            <p className="text-[10px] font-medium text-base-content/40 uppercase tracking-wider">Appearance</p>
          </div>
          <div className="py-1">
            {OPTIONS.map(opt => (
              <button
                key={opt.value}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 text-left transition-colors ${
                  override === opt.value
                    ? 'bg-primary/10 text-primary'
                    : 'text-base-content/70 hover:bg-base-200'
                }`}
                onClick={() => handleSelect(opt.value)}
              >
                <span className={override === opt.value ? 'text-primary' : 'text-base-content/40'}>
                  {opt.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{opt.label}</div>
                  <div className="text-[10px] text-base-content/40">{opt.description}</div>
                </div>
                {override === opt.value && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

