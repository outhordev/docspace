/**
 * ─── Manifold Site Configuration ─────────────────────────────────────────────
 *
 * Edit this file to customize your Manifolds site.
 * All fields have sensible defaults — change only what you need.
 */

const config = {

  /** Site title — shown in the navbar, browser tab, and homepage hero. */
  title: 'Manifold',

  /** Short description — used in HTML meta tags. */
  description: 'A file-driven documentation site for game projects.',

  /**
   * Favicon URL.
   * Can be a local path (relative to /public) or a full URL:
   *   '/favicon.ico'
   *   'https://example.com/my-icon.png'
   */
  favicon: '/favicon.svg',

  /** Footer text — shown at the bottom of every page. */
  footerText: 'Built with Manifold',

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
   * Maximum width (CSS value) for the main content area on doc pages.
   * Controls how wide the prose text is allowed to be.
   * Examples: '65ch', '720px', '48rem', '100%'
   */
  contentMaxWidth: '65ch',

}

export default config

