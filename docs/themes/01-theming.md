---
title: Theming
order: 1
description: Per-space theming, per-page overrides, content-aware auto-assignment, and creating custom themes.
---

## How Theming Works

Every space can have its own visual identity — colors, fonts, code highlighting style, and even injected custom CSS or HTML. Themes are JSON files in the `themes/` directory. Assign one to a space via its `_meta.md`, or let docspace pick one automatically.

## Built-In Themes

docspace ships with two base themes and nine custom themes:

| Theme | Mode | Character |
|---|---|---|
| `dark` | Dark | Clean dark, purple accent — the universal fallback |
| `light` | Light | Clean white, indigo accent |
| `arcane` | Dark | Amber and parchment, mystical feel |
| `aurora` | Dark | Northern lights with animated aurora bands |
| `blueprint` | Dark | Navy and cyan, technical grid aesthetic |
| `canvas` | Light | Warm cream and brown, artistic |
| `cyberpunk` | Dark | Neon green and pink, animated grid background |
| `deepspace` | Dark | Cosmic with an animated starfield background |
| `dispatch` | Light | Clean stone with orange accents, newsy feel |
| `meadow` | Light | Lush greens with drifting clouds and flowers |
| `scroll` | Light | Off-white, forest green, scholarly |

Browse them all in the [Theme Gallery](/themes/theme-gallery/arcane).

## Assigning Themes

### Per-Space (via `_meta.md`)

In a space's `_meta.md`, set the `theme` field:

```markdown
---
theme: arcane
---
```

- `theme: arcane` → uses `themes/arcane.json`
- `theme: dark` → uses the built-in dark theme
- `theme: light` → uses the built-in light theme
- *(omit)* → auto-assigned (see below)

### Per-Page Override

Individual pages can override their space's theme using frontmatter:

```markdown
---
title: My Special Page
theme: cyberpunk
---
```

This page will render with the Cyberpunk theme while the rest of the space keeps its own theme. Useful for showcases, landing-style pages, or simply mixing moods within a space.

> [!NOTE]
> The per-page override affects the entire page shell — colors, fonts, backgrounds, and code highlighting all switch to the overridden theme.

## Content-Aware Auto-Assignment

When a space doesn't set a `theme` in its `_meta.md`, docspace automatically picks one using a lightweight scoring system:

1. **Exact name match** — If the folder name matches a theme name (e.g. `docs/blueprint/`), that theme is used immediately.

2. **Tag scoring** — Each theme defines a `tags` array of keywords it's a good fit for. docspace scans the space's folder name, page filenames, and the first ~800 characters of each page, then scores every theme based on word overlap:
   - Folder name matches score highest (×4)
   - Multi-word phrase matches in content score well (×3)
   - Individual word matches in content add up (×1 each)

3. **Round-robin fallback** — If no tags match, themes are assigned round-robin so each space gets a unique look.

The theme set in `_meta.md` always wins. Auto-assignment is just a smart default.

### Adding Tags to Custom Themes

To make your custom theme participate in auto-assignment, add a `tags` array to its JSON:

```json
{
  "displayName": "Midnight",
  "isDark": true,
  "tags": ["astronomy", "space", "telescope", "observatory", "stars"],
  "colors": { ... }
}
```

A space about stargazing would now automatically pick up the Midnight theme — no `_meta.md` needed.

## Theme File Format

Create a JSON file in `themes/` — for example `themes/midnight.json`:

```json
{
  "displayName": "Midnight",
  "isDark": true,
  "bodyFont": "'Crimson Text', serif",
  "headingFont": "Georgia, serif",
  "shikiTheme": "github-dark",
  "sidebarIndicator": "border",
  "gradient": "linear-gradient(135deg, #0a0a1a 0%, #1a1040 100%)",
  "background": "",
  "customCSS": "",
  "customHTML": "",
  "tags": ["night", "astronomy", "dark mode"],
  "googleFonts": ["Crimson+Text:wght@400;700"],
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

No registration step needed — docspace discovers new theme files at build time.

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
| `tags` | `string[]` | Keywords for content-aware auto-assignment |
| `googleFonts` | `string[]` | Google Fonts families to load (see below) |
| `colors` | `object` | DaisyUI color tokens |

### Google Fonts

The `googleFonts` array tells docspace which fonts to load from Google Fonts. Each entry is a [Google Fonts API v2](https://developers.google.com/fonts/docs/css2) family string:

```json
"googleFonts": ["Crimson+Text:wght@400;700", "Lora:wght@400;700"]
```

At build time, docspace collects all font families across every theme and loads them in a single stylesheet — no manual imports needed. Fonts are deduplicated automatically, so if two themes both use Bitter, it's only loaded once.

This means themes are fully standalone: drop a JSON file in `themes/`, reference any Google Font by name in `bodyFont` or `headingFont`, list it in `googleFonts`, and it just works. No need to edit `layout.tsx` or install anything.

> [!TIP]
> Use `+` for spaces in font names and specify weights with `wght@400;700`. For italic support, add `ital,wght@0,400;0,700;1,400` syntax. See the [Google Fonts CSS2 API docs](https://developers.google.com/fonts/docs/css2) for the full format.

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

The `shikiTheme` field sets the primary code-highlighting palette. docspace uses **dual-theme** highlighting, so code blocks always look correct in both dark and light modes.

Some popular choices:

| Dark themes | Light themes |
|---|---|
| `github-dark` | `github-light` |
| `dracula` | `solarized-light` |
| `one-dark-pro` | `everforest-light` |
| `nord` | `min-light` |
| `vesper` | `rose-pine-dawn` |

See the full list at [shiki.style/themes](https://shiki.style/themes).

> [!WARNING]
> `customCSS` and `customHTML` are injected as raw strings. Use unique class prefixes (e.g. `midnight-`, `deepspace-`) to avoid collisions with docspace's core styles.

