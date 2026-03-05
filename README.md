# 📚 docspace Wiki

A zero-maintenance, file-driven documentation site. No CMS, no config — just folders, Markdown, and theme JSON files.

Built with **Next.js 16** (App Router, static export) + **DaisyUI v4** + **Tailwind CSS** + **React 19**.

## ✨ Features

- **Auto-discovery** — drop `.md` files into `docs/`, the site builds itself
- **File-based theming** — create theme JSON files in `themes/`, assigned via `_meta.md`
- **3 theme modes per space** — custom theme, dark base, or light base
- **Syntax highlighting** — Shiki with per-theme color palettes + copy button on every code block
- **Color tools** — inline hex swatches, palette blocks, gradient previews — click to copy in Hex/RGB/Unity
- **Callouts** — GitHub-style `[!NOTE]`, `[!TIP]`, `[!WARNING]`, `[!DANGER]`
- **Full-text search** — Pagefind (static, client-side, Ctrl+K)
- **Custom backgrounds** — inject CSS patterns, images, or parallax via theme files
- **Custom fonts** — set body and heading fonts per theme
- **Reading progress** — progress bar + back-to-top button
- **Prev/Next nav** — automatic page navigation at bottom of each doc
- **Mobile-friendly** — animated sidebar drawer, responsive everywhere
- **Static export** — deploy anywhere: GitHub Pages, Vercel, Netlify, any CDN

## 🚀 Quick Start

```bash
git clone <your-repo-url>
cd your-wiki
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Done.

## 📁 Adding Content

### Add a page

```bash
echo "# My Page" > docs/worldbuilding/my-page.md
```

### Create a new space

```bash
mkdir docs/soundtrack
echo "# Overview" > docs/soundtrack/overview.md
```

### Customize a space (optional)

Add a `_meta.md` in any space folder:

```yaml
---
title: World Building
icon: scroll-text
theme: arcane
description: The lore and history of the project.
---
```

All fields are optional. `theme` can be any custom theme name, `dark`, or `light`.

### Page ordering

Pages sort by:
1. `order` frontmatter field (lowest first)
2. Numeric filename prefix (`01-overview.md`, `02-factions.md`)
3. Alphabetical

## 🎨 Themes

### Built-in base themes

| Theme | Vibe |
|---|---|
| `dark` | Deep indigo, violet accent |
| `light` | Clean white, indigo accent |

### Custom themes (file-based)

Create a JSON file in `themes/`:

```
themes/
├── arcane.json      ← dark parchment, amber
├── blueprint.json   ← dark navy, cyan
├── canvas.json      ← warm cream, brown
├── scroll.json      ← off-white, forest green
└── dispatch.json    ← newsprint, orange
```

### Theme JSON format

```json
{
  "displayName": "My Theme",
  "isDark": true,
  "bodyFont": "Inter, sans-serif",
  "headingFont": "'IM Fell English', serif",
  "shikiTheme": "vesper",
  "sidebarIndicator": "border",
  "gradient": "linear-gradient(135deg, #1C1410 0%, #2E1F0F 50%, #1C1410 100%)",
  "background": "url('https://example.com/pattern.png')",
  "colors": {
    "primary": "#D97706",
    "primary-content": "#1C1410",
    "base-100": "#1C1410",
    "base-200": "#251A12",
    "base-300": "#2E2118",
    "base-content": "#E8D5B0"
  }
}
```

| Field | Description |
|---|---|
| `bodyFont` | CSS font-family for body text |
| `headingFont` | CSS font-family for h1–h4 headings |
| `shikiTheme` | Shiki theme name for code highlighting |
| `sidebarIndicator` | `"border"` (left accent) or `"pill"` (filled bg) |
| `gradient` | CSS gradient for decorative use |
| `background` | CSS `background-image` — patterns, images, or custom URLs. Covers the entire viewport |
| `colors` | DaisyUI color tokens (primary, base-100, etc.) |

### Assigning themes

In `_meta.md`:
- `theme: arcane` → uses `themes/arcane.json`
- `theme: dark` → uses built-in dark theme
- `theme: light` → uses built-in light theme
- *(omit)* → auto-assigned by folder name keywords

## 🎨 Color Features

Color features are always enabled across all spaces:

- Hex codes like `#FF5733` get inline color dots
- **Click any swatch** to open a popup with copy options: Hex, RGB, HSL
- Use ` ```palette ` code blocks for visual swatch grids
- Use ` ```gradient ` code blocks for gradient previews

## 🔍 Search

Press `Ctrl+K` to search across all docs. Powered by Pagefind — fully static, no backend.

## 🏗️ Build & Deploy

```bash
npm run build     # Static site in out/ with search index
```

### GitHub Pages

Included `.github/workflows/deploy.yml` auto-deploys on push to `main`.

### Auto-sync from other repos

Copy `.github/workflows/push-docs-to-wiki.yml` to your project repo. On every push that changes `docs/`, content syncs here automatically.

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16, React 19 (static export) |
| Styling | Tailwind CSS v3 + DaisyUI v4 |
| Markdown | unified + remark + rehype |
| Syntax | Shiki (per-theme palettes) |
| Search | Pagefind (static, client-side) |
| Colors | chroma-js |
| Icons | lucide-react |

## 📄 License

MIT

