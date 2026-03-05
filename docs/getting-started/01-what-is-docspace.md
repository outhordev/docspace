---
title: What Is docspace
order: 1
description: A quick overview
---

## The Idea

docspace is a **file-driven documentation site** built on Next.js. Drop Markdown files into a `docs/` folder, and docspace turns them into a themed, searchable, statically-exported website — no database, no CMS, no server at runtime.

It works for any project that needs well-organized, multi-section documentation — engineering teams, open-source projects, internal wikis, or personal knowledge bases.

## Core Concepts

| Concept | What it means |
|---|---|
| **Space** | A top-level folder inside `docs/`. Each space becomes its own section with a unique theme, sidebar, and URL namespace. |
| **Page** | A Markdown file inside a space. Sorted by numeric prefix or frontmatter `order`. |
| **Theme** | A JSON file in `themes/` that controls colors, fonts, code highlighting, and more — assigned per-space. |
| **Config** | A single `docspace.config.ts` at the project root that controls site-wide behavior. |

## Directory → Site

```
docs/
  getting-started/          ← Space → /getting-started
    _meta.md                ← Title, icon, theme, description
    01-intro.md             ← Page (order 1)
    02-setup.md             ← Page (order 2)
  configuration/
    _meta.md
    01-settings.md
```

At build time, docspace walks this tree, reads every file's frontmatter, and generates the full site — sidebars, search index, and all.

## What You Get

- **Multi-space navigation** — space switcher dropdown + sidebar per space
- **Per-space theming** — JSON files that set DaisyUI color tokens, fonts, and code themes
- **Full-text search** — Pagefind, fully static, runs in the browser
- **Syntax highlighting** — Shiki with dual light/dark themes and a copy button
- **Table of contents** — auto-generated from `h2` / `h3` headings
- **Color tools** — inline hex swatches, palette grids, gradient previews
- **Reader settings** — theme override (dark/light/space), content width presets
- **Static export** — deploy to GitHub Pages, Netlify, Vercel, S3, or anywhere

> [!TIP]
> The `out/` directory that `npm run build` produces is pure static HTML. No Node.js process is needed to serve it.
> 
> ## Spaces

Every **directory** inside `docs/` becomes a space. Each space has its own sidebar, theme, icon, and URL namespace.

### The `_meta.md` File

Put a `_meta.md` in any space folder to configure it:

```markdown
---
title: World Building
icon: scroll-text
theme: arcane
order: 2
description: Lore, factions, and cosmology.
---
```

All fields are optional. Without `_meta.md`, docspace derives a title from the folder name and auto-assigns a theme.

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Display name (falls back to folder name) |
| `icon` | `string` | Any Lucide icon name in kebab-case |
| `theme` | `string` | A theme from `themes/` or `dark` / `light` |
| `order` | `number` | Sort position on the landing page and space switcher |
| `description` | `string` | Short blurb shown on the landing page card |

### Ordering

Spaces are sorted by — in order of priority:

1. **`order`** field in `_meta.md` frontmatter
2. **Numeric folder-name prefix** (`01-getting-started`, `02-guides`, etc.)
3. **Alphabetical title** (fallback)

This works exactly the same way as page ordering. For example:

```
docs/
  getting-started/    ← _meta.md has order: 1
  authoring/          ← _meta.md has order: 2
  configuration/      ← _meta.md has order: 3
```

### Icons

The `icon` field accepts any name from the **Lucide** icon library — over 1,500 icons. Use the kebab-case form exactly as shown on their site.

Browse the full set at [lucide.dev/icons](https://lucide.dev/icons).

> [!TIP]
> If an icon name isn't recognised, docspace falls back to a generic file icon. No error — just double-check the spelling at [lucide.dev/icons](https://lucide.dev/icons).

### Auto-Theme Assignment

If you omit `theme`, docspace picks one, by looking for keywords in your documents and meta that match tags in a theme's `tags` array. If nothing matches, it round-robins through unused custom themes so every space gets something unique.

## Pages

Any `.md` file inside a space becomes a page. Files that start with `_` (like `_meta.md`) are excluded from navigation.

### Ordering

Pages are sorted by — in order of priority:

1. **`order`** field in frontmatter
2. **Numeric filename prefix** (`01-`, `02-`, etc.)
3. **Alphabetical title** (fallback)

### Frontmatter

```markdown
---
title: Architecture
order: 1
icon: cpu
description: System architecture and tech stack overview.
---
```

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Display title (falls back to filename) |
| `order` | `number` | Sort position in the sidebar |
| `icon` | `string` | Any Lucide icon name in kebab-case (falls back to `file-text`) |
| `description` | `string` | Shown in the page header below the title |
| `lastModified` | `string` | ISO date string; falls back to file mtime |

> [!WARNING]
> Files whose names start with `_` are always excluded from navigation.