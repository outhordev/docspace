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
 * Resolve a space's theme choice into an actual ThemeConfig.
 *
 * The _meta.md can specify:
 *   theme: arcane          → custom theme
 *   theme: dark            → dark base (styled to space's icon/vibe)
 *   theme: light           → light base (styled to space's icon/vibe)
 *
 * If no theme is set, the system auto-assigns based on folder name keywords.
 */
export function resolveTheme(themeValue: string | undefined, folderName: string, usedThemes: Set<string>): string {
  if (themeValue) {
    const themes = loadAllThemes()
    if (themes[themeValue]) return themeValue
  }

  // Auto-assign by keyword matching
  const themes = loadAllThemes()
  const normalized = folderName.toLowerCase().replace(/[^a-z]/g, '')

  // Check custom themes first — each theme can match by its own name
  const customNames = Object.keys(themes).filter(k => k !== 'dark' && k !== 'light')
  for (const themeName of customNames) {
    if (normalized.includes(themeName) || themeName.includes(normalized)) {
      return themeName
    }
  }

  // Hard-coded keyword fallbacks
  const KEYWORD_MAP: Record<string, string> = {
    worldbuilding: 'arcane', lore: 'arcane', narrative: 'arcane', story: 'arcane',
    technical: 'blueprint', engineering: 'blueprint', code: 'blueprint', api: 'blueprint',
    artstyle: 'canvas', art: 'canvas', visual: 'canvas',
    gamedesign: 'scroll', design: 'scroll', mechanics: 'scroll',
    devlog: 'dispatch', production: 'dispatch', pipeline: 'dispatch',
    cyber: 'cyberpunk', neon: 'cyberpunk', hacking: 'cyberpunk', punk: 'cyberpunk',
    meadow: 'meadow', cozy: 'meadow', cute: 'meadow', garden: 'meadow', nature: 'meadow',
    aurora: 'aurora', northern: 'aurora', sky: 'aurora', lights: 'aurora', space: 'deepspace',
  }

  if (KEYWORD_MAP[normalized] && themes[KEYWORD_MAP[normalized]]) {
    return KEYWORD_MAP[normalized]
  }

  // Round-robin custom themes
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
