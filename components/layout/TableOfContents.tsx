'use client'

import { useEffect, useState, useCallback } from 'react'
import type { Heading } from '@/lib/markdown'
import { List } from 'lucide-react'

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        // Find the first heading that is intersecting
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    )

    const elements = headings
      .map(h => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault()
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setActiveId(id)
      }
    },
    []
  )

  if (headings.length === 0) return null

  return (
    <nav className="text-sm">
      <div className="flex items-center gap-2 mb-4">
        <List size={13} className="text-base-content/40" />
        <h3 className="font-semibold text-base-content/50 uppercase tracking-wider text-[11px]">
          On this page
        </h3>
      </div>
      <ul className="space-y-1">
        {headings.map(heading => {
          const isActive = activeId === heading.id
          const indent = (heading.level - 2) * 12
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={e => handleClick(e, heading.id)}
                className={`group flex items-center gap-2 py-1 text-[13px] leading-snug transition-all duration-200 ${
                  isActive
                    ? 'text-primary font-medium'
                    : 'text-base-content/40 hover:text-base-content/70'
                }`}
                style={{ paddingLeft: `${indent}px` }}
              >
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${
                    isActive
                      ? 'bg-primary scale-100'
                      : 'bg-base-content/15 scale-75 group-hover:scale-100 group-hover:bg-base-content/30'
                  }`}
                />
                <span className="truncate">{heading.text}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
