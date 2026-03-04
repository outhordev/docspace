'use client'

import {ReactNode, useCallback, useEffect, useState} from 'react'
import {ArrowUp, ChevronRight, Menu, X} from 'lucide-react'
import Sidebar from './Sidebar'
import SpaceSwitcher from './SpaceSwitcher'
import SearchTrigger from '../search/SearchTrigger'
import SettingsModal, { useContentWidth } from './SettingsModal'
import { useThemeOverride } from './ThemeToggle'
import type {Page, Space} from '@/lib/docs-walker'
import Link from 'next/link'
import config from '@/manifold.config'

interface ThemeStyles {
  headingFont?: string
  bodyFont?: string
  background?: string
  gradient?: string
  customCSS?: string
  customHTML?: string
}

interface ShellProps {
  children: ReactNode
  spaces: Space[]
  currentSpace?: Space
  currentPage?: Page
  toc?: ReactNode
  themeStyles?: ThemeStyles
}

export default function Shell({ children, spaces, currentSpace, currentPage, toc, themeStyles }: ShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [themeOverride, setThemeOverride] = useThemeOverride()
  const [contentWidth, setContentWidth] = useContentWidth()

  const customTheme = currentSpace?.theme || 'dark'

  // Resolve final data-theme: custom uses the space's theme, dark/light overrides it
  const resolvedTheme = themeOverride === 'custom' ? customTheme : themeOverride
  const isCustom = themeOverride === 'custom'

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    setShowBackToTop(scrollY > 400)
    if (docHeight > 0) {
      setReadingProgress(Math.min((scrollY / docHeight) * 100, 100))
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // Scroll to top when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage?.slug, currentSpace?.slug])

  // Code copy button handler
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const btn = target.closest('.code-copy-btn') as HTMLElement | null
      if (!btn) return
      const code = btn.dataset.copy || ''
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!'
        btn.classList.add('copied')
        setTimeout(() => {
          btn.textContent = 'Copy'
          btn.classList.remove('copied')
        }, 2000)
      })
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Only apply fancy styles when in custom theme mode
  const rootStyle: React.CSSProperties = {}
  if (isCustom) {
    if (themeStyles?.headingFont) (rootStyle as any)['--heading-font'] = themeStyles.headingFont
    if (themeStyles?.bodyFont) rootStyle.fontFamily = themeStyles.bodyFont
    if (themeStyles?.background) rootStyle.backgroundImage = themeStyles.background
  }

  return (
    <div
      data-theme={resolvedTheme}
      className="min-h-screen bg-base-100 text-base-content flex flex-col"
      style={rootStyle}
    >
      {/* Custom theme CSS + HTML injection */}
      {isCustom && themeStyles?.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: themeStyles.customCSS }} />
      )}
      {isCustom && themeStyles?.customHTML && (
        <div dangerouslySetInnerHTML={{ __html: themeStyles.customHTML }} />
      )}

      {/* Reading progress bar */}
      {currentPage && (
        <div className="reading-progress" style={{ width: `${readingProgress}%` }} />
      )}

      {/* Navbar */}
      <header className="navbar bg-base-200/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-50 px-4">
        <div className="navbar-start gap-2">
          {currentSpace && (
            <button
              className="btn btn-ghost btn-sm btn-square lg:hidden"
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle sidebar"
            >
              {drawerOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          )}
          <Link href="/" className="btn btn-ghost gap-2 text-lg font-bold normal-case px-2">
            <span className="text-primary">📚</span>
            <span className="hidden sm:inline">{config.title}</span>
          </Link>

          {currentSpace && (
            <div className="hidden md:flex items-center text-sm text-base-content/50 gap-1">
              <ChevronRight size={14} />
              <Link href={`/${currentSpace.slug}`} className="hover:text-base-content transition-colors">
                {currentSpace.title}
              </Link>
              {currentPage && (
                <>
                  <ChevronRight size={14} />
                  <span className="text-base-content/80 font-medium truncate max-w-[200px]">
                    {currentPage.title}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="navbar-end gap-1">
          <SearchTrigger />
          <SettingsModal onThemeChange={setThemeOverride} onWidthChange={setContentWidth} />
          <SpaceSwitcher spaces={spaces} currentSpace={currentSpace} />
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1">
        {currentSpace && (
          <aside className="hidden lg:block w-64 shrink-0 border-r border-base-300 bg-base-200/30 backdrop-blur-sm sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
            <Sidebar space={currentSpace} currentSlug={currentPage?.slug} />
          </aside>
        )}

        {currentSpace && (
          <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${drawerOpen ? 'visible' : 'invisible'}`}>
            <div
              className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
              onClick={() => setDrawerOpen(false)}
            />
            <aside className={`absolute left-0 top-16 w-72 h-[calc(100vh-4rem)] bg-base-100 border-r border-base-300 overflow-y-auto custom-scrollbar shadow-xl transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <Sidebar space={currentSpace} currentSlug={currentPage?.slug} onNavigate={() => setDrawerOpen(false)} />
            </aside>
          </div>
        )}

        <main className="flex-1 min-w-0">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8" style={{ maxWidth: '80rem' }}>
            <div className="flex-1 min-w-0 page-enter mx-auto" style={{ maxWidth: contentWidth }}>
              {children}
            </div>
            {toc && (
              <div className="hidden xl:block w-56 shrink-0">
                <div className="sticky top-24">
                  <div className="rounded-xl bg-base-200/40 backdrop-blur-sm p-4 border border-base-300/50">
                    {toc}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className="border-t border-base-300 bg-base-200/30 backdrop-blur-sm py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-base-content/40">
          <p>{config.footerText}</p>
          <div className="flex items-center gap-4">
            <kbd className="kbd kbd-xs">Ctrl+K</kbd>
            <span>to search</span>
          </div>
        </div>
      </footer>

      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUp size={16} />
      </button>
    </div>
  )
}
