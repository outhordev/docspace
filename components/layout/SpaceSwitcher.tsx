'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Layers } from 'lucide-react'
import type { Space } from '@/lib/docs-walker'
import DynamicIcon from './DynamicIcon'

interface SpaceSwitcherProps {
  spaces: Space[]
  currentSpace?: Space
  compact?: boolean
}

export default function SpaceSwitcher({ spaces, currentSpace, compact }: SpaceSwitcherProps) {
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

  if (spaces.length === 0) return null

  return (
    <div className="relative" ref={ref}>
      <button
        className="btn btn-ghost btn-sm gap-2"
        onClick={() => setOpen(!open)}
      >
        <Layers size={15} className="text-base-content/50" />
        <span className="hidden sm:inline text-base-content/60">Spaces</span>
        <ChevronDown size={14} className={`text-base-content/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-base-100 rounded-xl border border-base-300 shadow-xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 border-b border-base-300">
            <p className="text-xs font-medium text-base-content/40 uppercase tracking-wider">Spaces</p>
          </div>
          <div className="py-1.5">
            {spaces.map(space => {
              const isActive = currentSpace?.slug === space.slug
              return (
                <Link
                  key={space.slug}
                  href={`/${space.slug}`}
                  className={`flex items-center gap-3 px-3 py-2.5 mx-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className={isActive ? 'text-primary' : 'text-base-content/40'}>
                    <DynamicIcon name={space.icon || 'file-text'} size={14} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{space.title}</div>
                  </div>
                  <span className={`text-xs tabular-nums ${isActive ? 'text-primary/60' : 'text-base-content/30'}`}>
                    {space.pages.length}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
