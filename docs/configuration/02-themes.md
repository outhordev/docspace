---
title: Themes
order: 2
description: Per-space theming system, built-in themes, and creating your own.
---

## Theme System

Each space can have its own visual identity — colors, fonts, code highlighting, and even custom CSS/HTML injections. Themes are JSON files in the `themes/` directory.

### Built-In Themes

| Theme | Mode | Vibe |
|---|---|---|
| `dark` | Dark | Clean dark with purple accents |
| `light` | Light | Clean light with indigo accents |
| `arcane` | Dark | Mystical, parchment-inspired |
| `blueprint` | Dark | Technical, grid-based |
| `canvas` | Light | Warm, artistic |
| `scroll` | Dark | Classic, scholarly |
| `dispatch` | Dark | Urgent, newspaper-style |
| `deepspace` | Dark | Cosmic with animated starfield |

## Theme File Structure

```json
{
  "displayName": "My Theme",
  "isDark": true,
  "bodyFont": "Inter, sans-serif",
  "headingFont": "Georgia, serif",
  "shikiTheme": "github-dark",
  "sidebarIndicator": "border",
  "gradient": "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  "background": "",
  "customCSS": "",
  "customHTML": "",
  "colors": {
    "primary": "#6C63FF",
    "primary-content": "#E0E0E0",
    "secondary": "#4A4458",
    "accent": "#FF6584",
    "neutral": "#2A2A3E",
    "base-100": "#1a1a2e",
    "base-200": "#222238",
    "base-300": "#2A2A42",
    "base-content": "#CCCCDD",
    "info": "#3B82F6",
    "success": "#22C55E",
    "warning": "#EAB308",
    "error": "#EF4444"
  }
}
```

### Field Reference

| Field | Type | Description |
|---|---|---|
| `displayName` | `string` | Human-readable name |
| `isDark` | `boolean` | Affects Shiki default |
| `bodyFont` | `string` | CSS font-family for body |
| `headingFont` | `string` | CSS font-family for headings |
| `shikiTheme` | `string` | Shiki code highlighting theme |
| `sidebarIndicator` | `string` | `'border'` or `'pill'` |
| `gradient` | `string` | Decorative CSS gradient |
| `background` | `string` | CSS background-image |
| `customCSS` | `string` | Injected `<style>` when active |
| `customHTML` | `string` | Injected HTML (decorative elements) |
| `colors` | `object` | DaisyUI color tokens |

## Creating a Custom Theme

1. Create `themes/midnight.json`
2. Fill in the fields (copy an existing theme as a starting point)
3. Set `theme: midnight` in a space's `_meta.md`

No registration needed — Manifold picks up new theme files at build time.

### Color Tokens

The `colors` object uses **DaisyUI color tokens**:

| Token | Usage |
|---|---|
| `primary` | Links, active states, buttons |
| `base-100` | Main page background |
| `base-200` | Sidebar, cards |
| `base-300` | Borders, dividers |
| `base-content` | Default text color |
| `info` / `success` / `warning` / `error` | Callout colors |

> [!WARNING]
> Custom CSS/HTML is injected as raw strings. Use unique class prefixes (like `deepspace-`, `arcane-`) to avoid collisions with Manifold's core styles.

### Shiki Code Themes

Popular options for `shikiTheme`:

- `github-dark` / `github-light`
- `one-dark-pro`
- `dracula`
- `nord`

See the [Shiki themes list](https://shiki.style/themes) for all options.

