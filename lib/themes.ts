import fs from 'fs'
import path from 'path'

// ─── Types ───────────────────────────────────────────────────────────────────

export type ThemeName = string // No longer a fixed union — any string is valid

export type ThemeMode = 'custom' | 'dark' | 'light'

export interface ThemeConfig {
  name: string
  displayName: string
  isDark: boolean
  bodyFont: string
  headingFont: string
  shikiTheme: string
  sidebarIndicator: 'border' | 'pill'
  gradient: string       // CSS gradient for hero/decorative use
  background: string     // CSS background-image injection (URL, pattern, etc)
  customCSS: string      // Arbitrary CSS injected into <style> when theme is active
  customHTML: string      // Arbitrary HTML injected into the page (e.g. decorative divs)
  colors: Record<string, string>  // DaisyUI color tokens
  tags: string[]         // Semantic tags for content-aware auto-assignment
}

export interface SpaceThemeChoice {
  mode: ThemeMode        // 'custom' | 'dark' | 'light'
  customTheme?: string   // Name of the custom theme file (without .json)
}

// ─── Built-in base themes ────────────────────────────────────────────────────

const DARK_BASE: ThemeConfig = {
  name: 'dark',
  displayName: 'Dark',
  isDark: true,
  bodyFont: 'Inter, sans-serif',
  headingFont: 'Inter, sans-serif',
  shikiTheme: 'github-dark',
  sidebarIndicator: 'border',
  gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
  background: '',
  customCSS: '',
  customHTML: '',
  tags: [],
  colors: {
    'primary': '#6C63FF',
    'primary-content': '#E0E0E0',
    'secondary': '#4A4458',
    'secondary-content': '#E0E0E0',
    'accent': '#FF6584',
    'accent-content': '#1a1a2e',
    'neutral': '#2A2A3E',
    'neutral-content': '#CCCCDD',
    'base-100': '#1a1a2e',
    'base-200': '#222238',
    'base-300': '#2A2A42',
    'base-content': '#CCCCDD',
    'info': '#3B82F6',
    'success': '#22C55E',
    'warning': '#EAB308',
    'error': '#EF4444',
  },
}

const LIGHT_BASE: ThemeConfig = {
  name: 'light',
  displayName: 'Light',
  isDark: false,
  bodyFont: 'Inter, sans-serif',
  headingFont: 'Inter, sans-serif',
  shikiTheme: 'github-light',
  sidebarIndicator: 'pill',
  gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #FFFFFF 100%)',
  background: '',
  customCSS: '',
  customHTML: '',
  tags: [],
  colors: {
    'primary': '#4F46E5',
    'primary-content': '#FFFFFF',
    'secondary': '#7C3AED',
    'secondary-content': '#FFFFFF',
    'accent': '#EC4899',
    'accent-content': '#FFFFFF',
    'neutral': '#374151',
    'neutral-content': '#F9FAFB',
    'base-100': '#FFFFFF',
    'base-200': '#F9FAFB',
    'base-300': '#F3F4F6',
    'base-content': '#1F2937',
    'info': '#3B82F6',
    'success': '#22C55E',
    'warning': '#EAB308',
    'error': '#EF4444',
  },
}

// ─── Theme loader ────────────────────────────────────────────────────────────

const THEMES_DIR = path.join(process.cwd(), 'themes')

let _cache: Record<string, ThemeConfig> | null = null

/**
 * Load all custom theme JSON files from the themes/ directory.
 * Merges them with the built-in dark/light themes.
 */
export function loadAllThemes(): Record<string, ThemeConfig> {
  if (_cache) return _cache

  const themes: Record<string, ThemeConfig> = {
    dark: DARK_BASE,
    light: LIGHT_BASE,
  }

  if (fs.existsSync(THEMES_DIR)) {
    const files = fs.readdirSync(THEMES_DIR).filter(f => f.endsWith('.json'))
    for (const file of files) {
      const name = file.replace('.json', '')
      try {
        const raw = fs.readFileSync(path.join(THEMES_DIR, file), 'utf-8')
        const data = JSON.parse(raw)
        themes[name] = {
          name,
          displayName: data.displayName || name.charAt(0).toUpperCase() + name.slice(1),
          isDark: data.isDark ?? false,
          bodyFont: data.bodyFont || 'Inter, sans-serif',
          headingFont: data.headingFont || 'Inter, sans-serif',
          shikiTheme: data.shikiTheme || (data.isDark ? 'github-dark' : 'github-light'),
          sidebarIndicator: data.sidebarIndicator || 'border',
          gradient: data.gradient || '',
          background: data.background || '',
          customCSS: data.customCSS || '',
          customHTML: data.customHTML || '',
          colors: data.colors || {},
          tags: Array.isArray(data.tags) ? data.tags : [],
        }
      } catch {
        // Skip malformed theme files
      }
    }
  }

  _cache = themes
  return themes
}

/**
 * Get a specific theme by name. Falls back to dark if not found.
 */
export function getThemeConfig(name: string): ThemeConfig {
  const themes = loadAllThemes()
  return themes[name] || themes.dark || DARK_BASE
}

/**
 * Tokenize a string into lowercase alphanumeric words (3+ chars).
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3)
}

/**
 * Score a theme against a bag of words from a space's content.
 * Each tag can be a multi-word phrase — we check if the phrase appears
 * in the raw lowercased text, or if individual tag words appear in the token bag.
 *
 * Returns a score ≥ 0 (higher = better fit).
 */
function scoreTheme(theme: ThemeConfig, folderTokens: string[], contentTokens: string[], rawText: string): number {
  if (theme.tags.length === 0) return 0

  let score = 0

  for (const tag of theme.tags) {
    const tagLower = tag.toLowerCase()
    const tagWords = tokenize(tagLower)

    // Multi-word phrase match against raw text (strongest signal)
    if (tagWords.length > 1 && rawText.includes(tagLower)) {
      score += 3
      continue
    }

    // Single-word matching against folder name (strong signal)
    for (const tw of tagWords) {
      if (folderTokens.includes(tw)) {
        score += 4
      }
    }

    // Single-word matching against page content (weaker but useful)
    for (const tw of tagWords) {
      if (contentTokens.includes(tw)) {
        score += 1
      }
    }
  }

  return score
}

/**
 * Collect text from a space directory for content-aware theme matching.
 * Reads the first ~500 chars of each markdown file + all page titles/filenames.
 * Lightweight — only called when no theme is explicitly set.
 */
function collectSpaceText(spaceDir: string): string {
  const parts: string[] = []

  function walk(dir: string) {
    let entries: fs.Dirent[]
    try { entries = fs.readdirSync(dir, { withFileTypes: true }) } catch { return }
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        parts.push(entry.name)
        walk(full)
      } else if (entry.name.endsWith('.md')) {
        parts.push(entry.name.replace(/\.md$/, ''))
        try {
          const raw = fs.readFileSync(full, 'utf-8')
          // Grab front-matter title + first ~500 chars of body
          parts.push(raw.slice(0, 800))
        } catch { /* skip unreadable */ }
      }
    }
  }

  walk(spaceDir)
  return parts.join(' ')
}

/**
 * Resolve a space's theme choice into an actual ThemeConfig.
 *
 * The _meta.md can specify:
 *   theme: arcane          → custom theme
 *   theme: dark            → dark base
 *   theme: light           → light base
 *
 * If no theme is set, the system auto-assigns by:
 *  1. Exact folder-name ↔ theme-name match
 *  2. Scoring each theme's `tags` against the space's folder name + page content
 *  3. Round-robin fallback to avoid duplicate themes
 */
export function resolveTheme(themeValue: string | undefined, folderName: string, usedThemes: Set<string>, spaceDir?: string): string {
  if (themeValue) {
    const themes = loadAllThemes()
    if (themes[themeValue]) return themeValue
  }

  const themes = loadAllThemes()
  const normalized = folderName.toLowerCase().replace(/[^a-z]/g, '')
  const customNames = Object.keys(themes).filter(k => k !== 'dark' && k !== 'light')

  // 1. Exact name match (folder name ↔ theme name)
  for (const themeName of customNames) {
    if (normalized.includes(themeName) || themeName.includes(normalized)) {
      return themeName
    }
  }

  // 2. Content-aware scoring via theme tags
  const folderTokens = tokenize(folderName)

  // Gather content text if we know the space directory
  const rawText = spaceDir ? collectSpaceText(spaceDir).toLowerCase() : folderName.toLowerCase()
  const contentTokens = [...new Set(tokenize(rawText))]

  const scored = customNames
    .map(name => ({ name, score: scoreTheme(themes[name], folderTokens, contentTokens, rawText) }))
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)

  // Pick the highest-scoring theme that hasn't been used yet
  for (const { name } of scored) {
    if (!usedThemes.has(name)) return name
  }
  // If all scored themes are taken, still prefer the best match
  if (scored.length > 0) return scored[0].name

  // 3. Round-robin unused custom themes
  for (const name of customNames) {
    if (!usedThemes.has(name)) return name
  }

  // Fallback to dark
  return 'dark'
}

/**
 * Default icon for a theme (used when space doesn't specify one).
 */
export function getDefaultIcon(themeName: string): string {
  const iconMap: Record<string, string> = {
    arcane: 'scroll-text',
    blueprint: 'cpu',
    canvas: 'palette',
    scroll: 'book-open',
    dispatch: 'newspaper',
    deepspace: 'rocket',
    cyberpunk: 'zap',
    meadow: 'flower-2',
    aurora: 'sparkles',
    dark: 'moon',
    light: 'sun',
  }
  return iconMap[themeName] || 'book-open'
}

/**
 * Get all Shiki themes needed (for pre-loading the highlighter).
 */
export function getAllShikiThemes(): string[] {
  const themes = loadAllThemes()
  const shikiThemes = new Set<string>()
  for (const t of Object.values(themes)) {
    shikiThemes.add(t.shikiTheme)
  }
  return [...shikiThemes]
}

/**
 * Build DaisyUI theme objects for tailwind config.
 * This is called at build time from tailwind.config.js.
 */
export function buildDaisyUIThemes(): Record<string, Record<string, string>>[] {
  const themes = loadAllThemes()
  return Object.entries(themes).map(([name, config]) => ({
    [name]: config.colors,
  }))
}
