import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ThemeName, resolveTheme, getDefaultIcon, getThemeConfig } from './themes'

export interface Page {
  slug: string
  filePath: string
  title: string
  description?: string
  order: number
  lastModified?: string
}

export interface Space {
  slug: string
  title: string
  theme: ThemeName
  icon: string
  description: string
  pages: Page[]
  colorFeatures: boolean
  sidebarIndicator: 'border' | 'pill'
}

export interface DocsManifest {
  spaces: Space[]
  globalPages: Page[]
}

const DOCS_DIR = path.join(process.cwd(), 'docs')

let cachedManifest: DocsManifest | null = null

/**
 * Extract a human-readable title from a filename slug.
 */
function slugToTitle(slug: string): string {
  // Remove numeric prefix like "01-"
  const cleaned = slug.replace(/^\d+-/, '')
  return cleaned
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/**
 * Extract sort order from filename. Checks frontmatter `order` first,
 * then numeric prefix, then defaults to 999 (alphabetical fallback).
 */
function getOrder(frontmatterOrder: number | undefined, fileName: string): number {
  if (frontmatterOrder !== undefined) return frontmatterOrder
  const match = fileName.match(/^(\d+)-/)
  if (match) return parseInt(match[1], 10)
  return 999
}

/**
 * Parse a markdown file and return its frontmatter + raw content.
 */
function parseMarkdownFile(filePath: string): { data: Record<string, unknown>; content: string } {
  const raw = fs.readFileSync(filePath, 'utf-8')
  return matter(raw) as unknown as { data: Record<string, unknown>; content: string }
}

/**
 * Build a Page object from a markdown file.
 */
function buildPage(filePath: string, fileName: string): Page {
  const slug = fileName.replace(/\.md$/, '')
  const { data } = parseMarkdownFile(filePath)

  // Prefer frontmatter lastModified (set by CI), fall back to file mtime
  let lastModified: string | undefined = data.lastModified as string | undefined
  if (!lastModified) {
    try {
      const stat = fs.statSync(filePath)
      lastModified = stat.mtime.toISOString()
    } catch {
      // ignore
    }
  }

  return {
    slug,
    filePath,
    title: (data.title as string) || slugToTitle(slug),
    description: data.description as string | undefined,
    order: getOrder(data.order as number | undefined, fileName),
    lastModified,
  }
}

/**
 * Build the full docs manifest by walking the docs/ directory.
 */
export function buildManifest(): DocsManifest {
  if (!fs.existsSync(DOCS_DIR)) {
    return { spaces: [], globalPages: [] }
  }

  const entries = fs.readdirSync(DOCS_DIR, { withFileTypes: true })
  const spaces: Space[] = []
  const globalPages: Page[] = []
  const usedThemes = new Set<ThemeName>()

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      // Skip progress.md and _-prefixed files from public navigation
      if (entry.name === 'progress.md') continue
      if (entry.name.startsWith('_')) continue

      const filePath = path.join(DOCS_DIR, entry.name)
      globalPages.push(buildPage(filePath, entry.name))
    }

    if (entry.isDirectory()) {
      // Skip hidden/system directories
      if (entry.name.startsWith('.')) continue

      const spaceDir = path.join(DOCS_DIR, entry.name)
      const spaceFiles = fs.readdirSync(spaceDir, { withFileTypes: true })

      // Parse _meta.md if exists
      let spaceMeta: Record<string, unknown> = {}
      const metaPath = path.join(spaceDir, '_meta.md')
      if (fs.existsSync(metaPath)) {
        const { data } = parseMarkdownFile(metaPath)
        spaceMeta = data
      }

      // Determine theme
      const themeOverride = spaceMeta.theme as string | undefined
      const theme = resolveTheme(themeOverride, entry.name, usedThemes)
      usedThemes.add(theme)

      // Build pages
      const pages: Page[] = []
      for (const file of spaceFiles) {
        if (!file.isFile() || !file.name.endsWith('.md')) continue
        if (file.name.startsWith('_')) continue

        const filePath = path.join(spaceDir, file.name)
        pages.push(buildPage(filePath, file.name))
      }

      // Sort pages: by order, then alphabetically
      pages.sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order
        return a.title.localeCompare(b.title)
      })

      const colorFeatures =
        theme === 'canvas' ||
        (spaceMeta.colorFeatures as boolean) === true

      const resolvedThemeConfig = getThemeConfig(theme)

      spaces.push({
        slug: entry.name,
        title: (spaceMeta.title as string) || slugToTitle(entry.name),
        theme,
        icon: (spaceMeta.icon as string) || getDefaultIcon(theme),
        description: (spaceMeta.description as string) || '',
        pages,
        colorFeatures,
        sidebarIndicator: resolvedThemeConfig.sidebarIndicator,
      })
    }
  }

  // Sort spaces alphabetically
  spaces.sort((a, b) => a.title.localeCompare(b.title))

  return { spaces, globalPages }
}

/**
 * Get the cached manifest (singleton for build).
 */
export function getManifest(): DocsManifest {
  if (!cachedManifest) {
    cachedManifest = buildManifest()
  }
  return cachedManifest
}

/**
 * Invalidate the cached manifest (used by dev watcher).
 */
export function invalidateManifest(): void {
  cachedManifest = null
}

/**
 * Get a specific space by slug.
 */
export function getSpace(slug: string): Space | undefined {
  return getManifest().spaces.find(s => s.slug === slug)
}

/**
 * Get a specific page within a space.
 */
export function getPage(spaceSlug: string, pageSlug: string): { space: Space; page: Page } | undefined {
  const space = getSpace(spaceSlug)
  if (!space) return undefined
  const page = space.pages.find(p => p.slug === pageSlug)
  if (!page) return undefined
  return { space, page }
}

/**
 * Read the raw markdown content for a page.
 */
export function readPageContent(filePath: string): { data: Record<string, unknown>; content: string } {
  return parseMarkdownFile(filePath)
}

