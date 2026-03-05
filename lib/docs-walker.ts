import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ThemeName, resolveTheme, getDefaultIcon, getThemeConfig } from './themes'
import config from '@/axiom.config'

export interface Page {
  slug: string
  filePath: string
  title: string
  description?: string
  order: number
  lastModified?: string
}

export interface PageGroup {
  kind: 'group'
  title: string
  order: number
  children: SidebarItem[]
}

export interface PageLink {
  kind: 'page'
  page: Page
}

export type SidebarItem = PageGroup | PageLink

export interface Space {
  slug: string
  title: string
  theme: ThemeName
  icon: string
  description: string
  order: number
  pages: Page[]          // flat list of ALL pages (for prev/next, search, count)
  sidebarTree: SidebarItem[]  // hierarchical tree for sidebar rendering
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
 * Strip a leading numeric prefix like "01-" from a string.
 */
function stripNumericPrefix(name: string): string {
  return name.replace(/^\d+-/, '')
}

/**
 * Convert a filesystem name to a URL-safe slug.
 * Strips numeric prefix (if configured), lowercases, replaces spaces
 * and non-alphanumeric runs with hyphens, and trims leading/trailing hyphens.
 */
function slugifyName(name: string, keepNumericPrefix: boolean): string {
  let s = keepNumericPrefix ? name : stripNumericPrefix(name)
  return s
    .toLowerCase()
    .replace(/\s+/g, '-')          // spaces → hyphens
    .replace(/[^a-z0-9\-]/g, '-')  // non-alphanumeric → hyphens
    .replace(/-{2,}/g, '-')        // collapse multiple hyphens
    .replace(/^-|-$/g, '')         // trim leading/trailing hyphens
}

/**
 * Build a Page object from a markdown file.
 */
function buildPage(filePath: string, fileName: string): Page {
  const rawSlug = fileName.replace(/\.md$/, '')
  const slug = slugifyName(rawSlug, config.numericPrefixInPageSlugs)
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

      // Build sidebar tree (supports nested subfolders as collapsible groups)
      function buildSidebarItems(dir: string, slugPrefix: string): SidebarItem[] {
        const items: SidebarItem[] = []
        const dirEntries = fs.readdirSync(dir, { withFileTypes: true })

        for (const file of dirEntries) {
          if (file.name.startsWith('_') || file.name.startsWith('.')) continue

          if (file.isFile() && file.name.endsWith('.md')) {
            const filePath = path.join(dir, file.name)
            const page = buildPage(filePath, file.name)
            // Prepend the slug prefix for nested pages
            if (slugPrefix) {
              page.slug = `${slugPrefix}/${page.slug}`
            }
            items.push({ kind: 'page', page })
          }

          if (file.isDirectory()) {
            const subDir = path.join(dir, file.name)
            // Check for group _meta.md
            let groupMeta: Record<string, unknown> = {}
            const groupMetaPath = path.join(subDir, '_meta.md')
            if (fs.existsSync(groupMetaPath)) {
              const { data } = parseMarkdownFile(groupMetaPath)
              groupMeta = data
            }
            const groupSlugPart = slugifyName(file.name, config.numericPrefixInPageSlugs)
            const children = buildSidebarItems(subDir, slugPrefix ? `${slugPrefix}/${groupSlugPart}` : groupSlugPart)
            if (children.length > 0) {
              items.push({
                kind: 'group',
                title: (groupMeta.title as string) || slugToTitle(file.name),
                order: getOrder(groupMeta.order as number | undefined, file.name),
                children,
              })
            }
          }
        }

        // Sort: by order, then alphabetically
        items.sort((a, b) => {
          const orderA = a.kind === 'page' ? a.page.order : a.order
          const orderB = b.kind === 'page' ? b.page.order : b.order
          const titleA = a.kind === 'page' ? a.page.title : a.title
          const titleB = b.kind === 'page' ? b.page.title : b.title
          if (orderA !== orderB) return orderA - orderB
          return titleA.localeCompare(titleB)
        })

        return items
      }

      const sidebarTree = buildSidebarItems(spaceDir, '')

      // Build the flat pages list in sidebar-tree order (depth-first)
      // so prev/next navigation follows the same order the reader sees
      function flattenTree(items: SidebarItem[]): Page[] {
        const result: Page[] = []
        for (const item of items) {
          if (item.kind === 'page') result.push(item.page)
          else result.push(...flattenTree(item.children))
        }
        return result
      }
      const orderedPages = flattenTree(sidebarTree)

      const resolvedThemeConfig = getThemeConfig(theme)
      const spaceSlug = slugifyName(entry.name, config.numericPrefixInSpaceSlugs)

      spaces.push({
        slug: spaceSlug,
        title: (spaceMeta.title as string) || slugToTitle(entry.name),
        theme,
        icon: (spaceMeta.icon as string) || getDefaultIcon(theme),
        description: (spaceMeta.description as string) || '',
        order: getOrder(spaceMeta.order as number | undefined, entry.name),
        pages: orderedPages,
        sidebarTree,
        sidebarIndicator: resolvedThemeConfig.sidebarIndicator,
      })
    }
  }

  // Sort spaces: by order, then alphabetically
  spaces.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order
    return a.title.localeCompare(b.title)
  })

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

