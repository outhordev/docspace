---
title: What Is Axiom
order: 1
description: A quick overview of what Axiom does and why it exists.
---

## The Idea

Axiom is a **file-driven documentation site** built on Next.js. Drop Markdown files into a `docs/` folder, and Axiom turns them into a themed, searchable, statically-exported website — no database, no CMS, no server at runtime.

It works for any project that needs well-organized, multi-section documentation — engineering teams, open-source projects, internal wikis, or personal knowledge bases.

## Core Concepts

| Concept | What it means |
|---|---|
| **Space** | A top-level folder inside `docs/`. Each space becomes its own section with a unique theme, sidebar, and URL namespace. |
| **Page** | A Markdown file inside a space. Sorted by numeric prefix or frontmatter `order`. |
| **Theme** | A JSON file in `themes/` that controls colors, fonts, code highlighting, and more — assigned per-space. |
| **Config** | A single `axiom.config.ts` at the project root that controls site-wide behavior. |

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

At build time, Axiom walks this tree, reads every file's frontmatter, and generates the full site — sidebars, search index, and all.

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
