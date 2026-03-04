'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Space } from '@/lib/docs-walker'
import { FileText } from 'lucide-react'

interface SidebarProps {
  space: Space
  currentSlug?: string
  onNavigate?: () => void
}

export default function Sidebar({ space, currentSlug, onNavigate }: SidebarProps) {
  const indicatorStyle = space.sidebarIndicator || 'border'
  const pathname = usePathname()

  return (
    <nav className="p-4 pb-8">
      {/* Space header */}
      <div className="mb-5 px-1">
        <h2 className="text-base font-bold text-base-content tracking-tight">{space.title}</h2>
        {space.description && (
          <p className="text-xs text-base-content/50 mt-1 leading-relaxed">{space.description}</p>
        )}
        <div className="mt-2 text-xs text-base-content/30">
          {space.pages.length} {space.pages.length === 1 ? 'page' : 'pages'}
        </div>
      </div>

      <div className="h-px bg-base-300 mb-3" />

      {/* Page list */}
      <ul className="space-y-0.5">
        {space.pages.map((page) => {
          const isActive = page.slug === currentSlug
          const href = `/${space.slug}/${page.slug}`

          return (
            <li key={page.slug}>
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
                <span className="truncate">{page.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
