'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'

interface NavPage {
  slug: string
  title: string
  spaceSlug: string
}

interface DocPageProps {
  html: string
  title: string
  description?: string
  lastModified?: string
  prevPage?: NavPage
  nextPage?: NavPage
}

export default function DocPage({ html, title, description, lastModified, prevPage, nextPage }: DocPageProps) {
  const formattedDate = lastModified
    ? new Date(lastModified).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <article>
      {/* Page header */}
      <header className="mb-8 pb-6 border-b border-base-300">
        <h1 className="text-3xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'var(--heading-font, inherit)' }}>
          {title}
        </h1>
        {description && (
          <p className="text-base-content/60 text-lg leading-relaxed">{description}</p>
        )}
        {formattedDate && (
          <div className="flex items-center gap-1.5 mt-3 text-xs text-base-content/40">
            <Clock size={12} />
            <span>Last updated {formattedDate}</span>
          </div>
        )}
      </header>

      {/* Content */}
      <div
        className="doc-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Prev / Next navigation */}
      {(prevPage || nextPage) && (
        <nav className="mt-12 pt-6 border-t border-base-300 grid grid-cols-2 gap-4">
          {prevPage ? (
            <Link
              href={`/${prevPage.spaceSlug}/${prevPage.slug}`}
              className="group flex flex-col items-start gap-1 p-4 rounded-xl border border-base-300 hover:border-primary/30 hover:bg-base-200/50 transition-all"
            >
              <span className="text-xs text-base-content/40 flex items-center gap-1">
                <ChevronLeft size={12} /> Previous
              </span>
              <span className="text-sm font-medium text-base-content/80 group-hover:text-primary transition-colors">
                {prevPage.title}
              </span>
            </Link>
          ) : <div />}
          {nextPage ? (
            <Link
              href={`/${nextPage.spaceSlug}/${nextPage.slug}`}
              className="group flex flex-col items-end gap-1 p-4 rounded-xl border border-base-300 hover:border-primary/30 hover:bg-base-200/50 transition-all"
            >
              <span className="text-xs text-base-content/40 flex items-center gap-1">
                Next <ChevronRight size={12} />
              </span>
              <span className="text-sm font-medium text-base-content/80 group-hover:text-primary transition-colors">
                {nextPage.title}
              </span>
            </Link>
          ) : <div />}
        </nav>
      )}
    </article>
  )
}
