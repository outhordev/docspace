/**
 * ─── docspace Site Configuration ─────────────────────────────────────────────
 *
 * Edit this file to customize your docspaces site.
 * All fields have sensible defaults — change only what you need.
 */

const config = {

  /** Site title — shown in the navbar, browser tab, and homepage hero. */
  title: 'docspace',

  /** Short description — used in HTML meta tags. */
  description: 'A file-driven documentation site for projects.',

  /**
   * Favicon URL.
   * Can be a local path (relative to /public) or a full URL:
   *   '/favicon.ico'
   *   'https://example.com/my-icon.png'
   */
  favicon: '/favicon.svg',

  /** Footer text — shown at the bottom of every page. */
  footerText: `docspace | ${new Date().getFullYear()}`,

  /**
   * Home page theme.
   * Any theme name from /themes/*.json, or 'dark' or 'light'.
   */
  homeTheme: 'deepspace',

  /**
   * Home page gradient background (CSS).
   * Set to '' to use the theme's default base-100 color.
   */
  homeGradient: 'linear-gradient(135deg, #0B0D17 0%, #1A1040 30%, #0D1B2A 60%, #0B0D17 100%)',

  /**
   * Single-space redirect.
   * When true and there's only one space in docs/, the landing page "/"
   * will automatically redirect into that space instead of showing the
   * space-selection landing page.
   * Set to false to always show the landing page regardless.
   */
  singleSpaceRedirect: true,

  /**
   * Width presets shown in the settings modal.
   * Each entry has a CSS value, display label, and short description.
   * The first option is the default when a user hasn't set a preference yet.
   */
  contentWidthOptions: [
    { value: '55ch',  label: 'Narrow',     description: 'Compact, very readable' },
    { value: '65ch',  label: 'Default',    description: 'Balanced for prose' },
    { value: '80ch',  label: 'Wide',       description: 'Good for code-heavy pages' },
    { value: '100ch', label: 'Extra Wide', description: 'Maximum reading area' },
  ],

  /**
   * Keep numeric prefixes (like 01-, 02-) in page URL slugs.
   * When false (default), "01-overview.md" → /space/overview
   * When true, "01-overview.md" → /space/01-overview
   */
  numericPrefixInPageSlugs: false,

  /**
   * Keep numeric prefixes (like 01-, 02-) in space URL slugs.
   * When false (default), a folder "01-getting-started" → /getting-started
   * When true, "01-getting-started" → /01-getting-started
   */
  numericPrefixInSpaceSlugs: false,

}

export default config

