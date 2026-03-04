'use client'

import { useEffect, useState } from 'react'
import { Settings, Moon, Sun, Sparkles, Type, Monitor } from 'lucide-react'
import { type ThemeOverride, useThemeOverride } from './ThemeToggle'
import config from '@/axiom.config'

const THEME_OPTIONS: { value: ThemeOverride; label: string; icon: React.ReactNode; description: string }[] = [
  { value: 'custom', label: 'Space Theme', icon: <Sparkles size={16} />, description: 'Rich per-space themes with custom colors and styles' },
  { value: 'dark',   label: 'Dark',        icon: <Moon size={16} />,     description: 'Universal dark mode across all spaces' },
  { value: 'light',  label: 'Light',       icon: <Sun size={16} />,      description: 'Universal light mode across all spaces' },
]

const WIDTH_OPTIONS = (config.contentWidthOptions || [
  { value: '55ch',  label: 'Narrow',     description: 'Compact, very readable' },
  { value: '65ch',  label: 'Default',    description: 'Balanced for prose' },
  { value: '80ch',  label: 'Wide',       description: 'Good for code-heavy pages' },
  { value: '100ch', label: 'Extra Wide', description: 'Maximum reading area' },
]) as { value: string; label: string; description: string }[]

const WIDTH_STORAGE_KEY = 'axiom-content-width'

export function useContentWidth(): [string, (v: string) => void] {
  const defaultWidth = (config.contentWidthOptions?.[0]?.value) || '65ch'
  const [width, setWidth] = useState(defaultWidth)

  useEffect(() => {
    const stored = localStorage.getItem(WIDTH_STORAGE_KEY)
    if (stored) {
      setWidth(stored)
    }
  }, [])

  const set = (v: string) => {
    setWidth(v)
    localStorage.setItem(WIDTH_STORAGE_KEY, v)
  }

  return [width, set]
}

interface SettingsModalProps {
  onThemeChange?: (override: ThemeOverride) => void
  onWidthChange?: (width: string) => void
}

export default function SettingsModal({ onThemeChange, onWidthChange }: SettingsModalProps) {
  const [themeOverride, setThemeOverride] = useThemeOverride()
  const [contentWidth, setContentWidth] = useContentWidth()

  const openModal = () => {
    const modal = document.getElementById('settings-modal') as HTMLDialogElement | null
    if (modal) modal.showModal()
  }

  const handleThemeSelect = (value: ThemeOverride) => {
    setThemeOverride(value)
    onThemeChange?.(value)
  }

  const handleWidthSelect = (value: string) => {
    setContentWidth(value)
    onWidthChange?.(value)
  }

  return (
    <>
      <button
        className="btn btn-ghost btn-sm btn-square"
        onClick={openModal}
        aria-label="Settings"
      >
        <Settings size={16} className="text-base-content/50" />
      </button>

      <dialog id="settings-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-md">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">✕</button>
          </form>

          <h3 className="text-lg font-bold mb-1">Settings</h3>
          <p className="text-sm text-base-content/50 mb-6">Customize your reading experience.</p>

          {/* ─── Appearance ─── */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Monitor size={14} className="text-base-content/50" />
              <span className="text-xs font-semibold uppercase tracking-wider text-base-content/50">Appearance</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {THEME_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-150 cursor-pointer ${
                    themeOverride === opt.value
                      ? 'border-primary bg-primary/10'
                      : 'border-base-300 hover:border-base-content/20 bg-base-200/30'
                  }`}
                  onClick={() => handleThemeSelect(opt.value)}
                >
                  <span className={themeOverride === opt.value ? 'text-primary' : 'text-base-content/50'}>
                    {opt.icon}
                  </span>
                  <span className={`text-xs font-medium ${themeOverride === opt.value ? 'text-primary' : 'text-base-content/70'}`}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-base-content/40 mt-2">
              {THEME_OPTIONS.find(o => o.value === themeOverride)?.description}
            </p>
          </div>

          <div className="divider my-2" />

          {/* ─── Content Width ─── */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-3">
              <Type size={14} className="text-base-content/50" />
              <span className="text-xs font-semibold uppercase tracking-wider text-base-content/50">Content Width</span>
            </div>
            <div className="space-y-1.5">
              {WIDTH_OPTIONS.map((opt, i) => (
                <button
                  key={opt.value}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-150 text-left cursor-pointer ${
                    contentWidth === opt.value
                      ? 'bg-primary/10 text-primary ring-1 ring-primary/30'
                      : 'hover:bg-base-200 text-base-content/70'
                  }`}
                  onClick={() => handleWidthSelect(opt.value)}
                >
                  <div>
                    <div className="text-sm font-medium">{opt.label}</div>
                    <div className="text-[11px] text-base-content/40">{opt.description}</div>
                  </div>
                  {/* Width bar preview */}
                  <div className="w-16 h-2 rounded-full bg-base-300 overflow-hidden ml-3 shrink-0">
                    <div
                      className={`h-full rounded-full transition-all ${contentWidth === opt.value ? 'bg-primary' : 'bg-base-content/20'}`}
                      style={{ width: `${Math.round(((i + 1) / WIDTH_OPTIONS.length) * 100)}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

