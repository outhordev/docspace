'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Space, SidebarItem } from '@/lib/docs-walker'
import { FileText, ChevronRight } from 'lucide-react'

interface SidebarProps {
  space: Space
  currentSlug?: string
  onNavigate?: () => void
}

function SidebarGroup({
  item,
  space,
  currentSlug,
  indicatorStyle,
  onNavigate,
  defaultOpen,
}: {
  item: SidebarItem
  space: Space
  currentSlug?: string
  indicatorStyle: string
  onNavigate?: () => void
  defaultOpen?: boolean
}) {
  if (item.kind === 'page') {
    const page = item.page
    const isActive = page.slug === currentSlug
    const href = `/${space.slug}/${page.slug}`

    return (
      <li>
        <Link
          href={href}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
            isActive
              ? indicatorStyle === 'border'
                ? 'border-l-2 border-primary bg-primary/10 text-primary font-medium ml-0'
                : 'bg-primary text-primary-content font-medium'
              : 'text-base-content/70 hover:text-base-content hover:bg-base-300/40'
          }`}
          onClick={onNavigate}
        >
          <FileText size={14} className={`shrink-0 ${isActive ? 'text-primary' : 'text-base-content/30'}`} />
          <span>{page.title}</span>
        </Link>
      </li>
    )
  }

  // Group
  return (
    <CollapsibleGroup
      item={item}
      space={space}
      currentSlug={currentSlug}
      indicatorStyle={indicatorStyle}
      onNavigate={onNavigate}
      defaultOpen={defaultOpen}
    />
  )
}

function CollapsibleGroup({
  item,
  space,
  currentSlug,
  indicatorStyle,
  onNavigate,
  defaultOpen,
}: {
  item: SidebarItem & { kind: 'group' }
  space: Space
  currentSlug?: string
  indicatorStyle: string
  onNavigate?: () => void
  defaultOpen?: boolean
}) {
  // Check if any child (recursively) is the active page
  function hasActivePage(items: SidebarItem[]): boolean {
    for (const child of items) {
      if (child.kind === 'page' && child.page.slug === currentSlug) return true
      if (child.kind === 'group' && hasActivePage(child.children)) return true
    }
    return false
  }

  const containsActive = hasActivePage(item.children)
  const [open, setOpen] = useState(defaultOpen ?? containsActive)

  return (
    <li>
      <button
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 w-full text-left cursor-pointer text-base-content/70 hover:text-base-content hover:bg-base-300/40"
        onClick={() => setOpen(!open)}
      >
        <ChevronRight
          size={14}
          className={`shrink-0 text-base-content/30 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
        />
        <span className="font-medium">{item.title}</span>
        <span className="ml-auto text-[10px] text-base-content/30 tabular-nums">
          {item.children.filter(c => c.kind === 'page').length + item.children.filter(c => c.kind === 'group').reduce((sum, g) => sum + countPages(g), 0)}
        </span>
      </button>
      {open && (
        <ul className="ml-3 pl-3 border-l border-base-300 space-y-0.5 mt-0.5">
          {item.children.map((child, i) => (
            <SidebarGroup
              key={i}
              item={child}
              space={space}
              currentSlug={currentSlug}
              indicatorStyle={indicatorStyle}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function countPages(item: SidebarItem): number {
  if (item.kind === 'page') return 1
  return item.children.reduce((sum, c) => sum + countPages(c), 0)
}

export default function Sidebar({ space, currentSlug, onNavigate }: SidebarProps) {
  const indicatorStyle = space.sidebarIndicator || 'border'

  const totalPages = space.sidebarTree.reduce((sum, item) => sum + countPages(item), 0)

  return (
    <nav className="p-4 pb-8">
      {/* Space header */}
      <div className="mb-5 px-1">
        <h2 className="text-base font-bold text-base-content tracking-tight">{space.title}</h2>
        {space.description && (
          <p className="text-xs text-base-content/50 mt-1 leading-relaxed">{space.description}</p>
        )}
        <div className="mt-2 text-xs text-base-content/30">
          {totalPages} {totalPages === 1 ? 'page' : 'pages'}
        </div>
      </div>

      <div className="h-px bg-base-300 mb-3" />

      {/* Page tree */}
      <ul className="space-y-0.5">
        {space.sidebarTree.map((item, i) => (
          <SidebarGroup
            key={i}
            item={item}
            space={space}
            currentSlug={currentSlug}
            indicatorStyle={indicatorStyle}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </nav>
  )
}
