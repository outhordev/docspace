---
title: Themes
order: 2
description: Per-space theming, built-in themes, and creating custom ones.
---

## How Theming Works

Every space can have its own visual identity — colors, fonts, code highlighting style, and even injected custom CSS or HTML. Themes are JSON files in the `themes/` directory. Assign one to a space via its `_meta.md`.

## Built-In Themes

Axiom ships with two base themes and six custom themes:

| Theme | Mode | Character |
|---|---|---|
| `dark` | Dark | Clean dark, purple accent — the universal fallback |
| `light` | Light | Clean white, indigo accent |
| `arcane` | Dark | Amber and parchment, mystical feel |
| `blueprint` | Dark | Navy and cyan, technical grid aesthetic |
| `canvas` | Light | Warm cream and brown, artistic |
| `scroll` | Light | Off-white, forest green, scholarly |
| `dispatch` | Dark | Newsprint and orange, urgent vibe |
| `deepspace` | Dark | Cosmic with an animated starfield background |

## Theme File Format

Create a JSON file in `themes/` — for example `themes/midnight.json`:

```json
{
  "displayName": "Midnight",
  "isDark": true,
  "bodyFont": "Inter, sans-serif",
  "headingFont": "Georgia, serif",
  "shikiTheme": "github-dark",
  "sidebarIndicator": "border",
  "gradient": "linear-gradient(135deg, #0a0a1a 0%, #1a1040 100%)",
  "background": "",
  "customCSS": "",
  "customHTML": "",
  "colors": {
    "primary": "#818CF8",
    "primary-content": "#0a0a1a",
    "secondary": "#4A4458",
    "accent": "#F472B6",
    "neutral": "#1e1e30",
    "base-100": "#0a0a1a",
    "base-200": "#12122a",
    "base-300": "#1a1a3a",
    "base-content": "#d0d0e0",
    "info": "#3B82F6",
    "success": "#22C55E",
    "warning": "#EAB308",
    "error": "#EF4444"
  }
}
```

No registration step needed — Axiom discovers new theme files at build time.

### Field Reference

| Field | Type | Description |
|---|---|---|
| `displayName` | `string` | Human-readable name shown in the UI |
| `isDark` | `boolean` | Whether the theme is dark; affects the default Shiki code theme |
| `bodyFont` | `string` | CSS `font-family` for body text |
| `headingFont` | `string` | CSS `font-family` for headings |
| `shikiTheme` | `string` | Shiki theme name for syntax highlighting |
| `sidebarIndicator` | `string` | `"border"` (left bar) or `"pill"` (filled background) |
| `gradient` | `string` | Decorative CSS gradient (used in hero areas) |
| `background` | `string` | CSS `background-image` — patterns, textures, or URLs |
| `customCSS` | `string` | Raw CSS injected in a `<style>` tag when the theme is active |
| `customHTML` | `string` | Raw HTML injected into the page (e.g. decorative elements) |
| `colors` | `object` | DaisyUI color tokens |

### Color Tokens

The `colors` object maps directly to **DaisyUI color tokens**:

| Token | Usage |
|---|---|
| `primary` | Links, active states, accent buttons |
| `primary-content` | Text on primary-colored backgrounds |
| `base-100` | Main page background |
| `base-200` | Sidebar, card backgrounds |
| `base-300` | Borders, dividers |
| `base-content` | Default text color |
| `info` / `success` / `warning` / `error` | Callout and status colors |

### Shiki Code Themes

The `shikiTheme` field sets the primary code-highlighting palette. Axiom uses **dual-theme** highlighting, so code blocks always look correct in both dark and light modes — even when the reader overrides the theme via the settings modal.

Some popular choices:

| Dark themes | Light themes |
|---|---|
| `github-dark` | `github-light` |
| `dracula` | `solarized-light` |
| `one-dark-pro` | `everforest-light` |
| `nord` | `min-light` |
| `vesper` | `rose-pine-dawn` |

See the full list at [shiki.style/themes](https://shiki.style/themes).

## Assigning Themes

In a space's `_meta.md`:

```markdown
---
theme: midnight
---
```

- `theme: midnight` → uses `themes/midnight.json`
- `theme: dark` → uses the built-in dark theme
- `theme: light` → uses the built-in light theme
- *(omit)* → auto-assigned by folder-name keywords or round-robin

> [!WARNING]
> `customCSS` and `customHTML` are injected as raw strings. Use unique class prefixes (e.g. `midnight-`, `deepspace-`) to avoid collisions with Axiom's core styles.
