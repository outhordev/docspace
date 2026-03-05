---
title: Installation & Config
order: 2
description: Clone the repo, install dependencies, and configure the site.
---

## Prerequisites

You need **Node.js 18+** and a package manager (`npm`, `yarn`, or `pnpm`).

## Quick Start

```bash
git clone https://github.com/your-org/docspace-docs.git my-docs
cd my-docs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see the landing page with all available spaces.

A folder and a Markdown file is a documentation site. Everything else is optional — see [What Is docspace](/getting-started/what-is-docspace/overview) for how spaces, pages, and navigation work.

## Project Layout

| Path | Purpose |
|---|---|
| `docspace.config.ts` | Site-wide settings — title, footer, width options |
| `docs/` | All of your documentation content |
| `themes/` | Custom theme JSON files |
| `public/` | Static assets (favicon, images) |
| `app/` | Next.js routing (you rarely touch this) |
| `components/` | UI components (sidebar, search, settings) |
| `lib/` | Core logic — Markdown pipeline, theme loader, docs walker |

## Site Config

All site-wide settings live in `docspace.config.ts` at the project root:

```typescript
const config = {
  title: 'docspace',
  description: 'A file-driven documentation site for projects.',
  footerText: 'docspace',
  defaultTheme: 'deepspace',
  defaultGradient: 'linear-gradient(135deg, #0B0D17 0%, #1A1040 30%, #0D1B2A 60%, #0B0D17 100%)',
  singleSpaceRedirect: true,
  numericPrefixInPageSlugs: false,
  numericPrefixInSpaceSlugs: false,
  contentWidthOptions: [
    { value: '55ch',  label: 'Narrow',     description: 'Compact, very readable' },
    { value: '65ch',  label: 'Default',    description: 'Balanced for prose' },
    { value: '80ch',  label: 'Wide',       description: 'Good for code-heavy pages' },
    { value: '100ch', label: 'Extra Wide', description: 'Maximum reading area' },
  ],
}

export default config
```

### Option Reference

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `'docspace Docs'` | Site name — navbar, browser tab, and landing hero |
| `description` | `string` | `'A file-driven...'` | HTML meta description |
| `footerText` | `string` | `'docspace Docs'` | Text shown in the footer on every page |
| `defaultTheme` | `string` | `'deepspace'` | Theme for the landing page, 404, and standalone pages |
| `defaultGradient` | `string` | CSS gradient | Background gradient for default-themed pages; `''` to disable |
| `singleSpaceRedirect` | `boolean` | `true` | Skip the landing page when only one space exists |
| `numericPrefixInPageSlugs` | `boolean` | `false` | Keep `01-` prefixes in page URLs |
| `numericPrefixInSpaceSlugs` | `boolean` | `false` | Keep `01-` prefixes in space URLs |
| `contentWidthOptions` | `array` | 4 presets | Width choices shown in the reader settings modal |

### App Icon

Place an image file in `public/appicon/` to add a favicon and navbar icon:

```
public/
  appicon/
    icon.png      ← or .svg, .ico, .jpg, .webp
```

docspace auto-detects the file at build time. If no file is found, no icon is shown — just the site title.

### Content Width Options

The `contentWidthOptions` array defines which width presets appear in the settings modal. Each entry has a `value` (any valid CSS width), a `label`, and a `description`. The first entry is the default for new visitors.

```typescript
contentWidthOptions: [
  { value: '80ch',  label: 'Standard', description: 'Good for mixed content' },
  { value: '100ch', label: 'Wide',     description: 'Comfortable for code' },
  { value: '120ch', label: 'Full',     description: 'Maximum reading area' },
],
```

### URL Slugs

By default, docspace strips numeric prefixes (like `01-`, `02-`) from URLs. Keeps URLs clean while still letting you use prefixes for sort order in the file system.

| File / Folder | Default slug | With prefix enabled |
|---|---|---|
| `01-overview.md` | `/space/overview` | `/space/01-overview` |
| `02-getting-started/` | `/getting-started` | `/02-getting-started` |

```typescript
numericPrefixInPageSlugs: true,   // 01-overview.md → /space/01-overview
numericPrefixInSpaceSlugs: true,  // 01-guides/ → /01-guides
```

> [!NOTE]
> Numeric prefixes are always used for ordering regardless of these settings. These options only affect URL generation.

### Default Theme & Gradient

`defaultTheme` controls the landing page, 404 page, and standalone pages. Use any theme from `themes/`, or the built-in `'dark'` / `'light'`.

`defaultGradient` overlays on top of the theme. Set it to `''` if you want the theme's plain `base-100` background instead.
