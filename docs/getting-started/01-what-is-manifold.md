---
title: What is Manifold
order: 1
description: A quick overview of what Manifold does and how it works.
---

## Overview

Manifold is a **file-driven documentation site** built on Next.js. You write Markdown files in a `docs/` folder, and Manifold turns them into a themed, searchable, static site.

It was designed for **game development teams** but works for any project that needs organized, multi-section documentation.

### Core Concepts

- **Spaces** — top-level folders inside `docs/` that become separate documentation sections, each with their own theme
- **Pages** — Markdown files inside a space, sorted by numeric prefix
- **Themes** — per-space visual identities (colors, fonts, code highlighting) defined as JSON
- **Config** — a single `manifold.config.ts` file that controls site-wide behavior

### How It Works

```
docs/
  getting-started/        ← Space (becomes /getting-started)
    _meta.md              ← Space config (title, theme, icon)
    01-intro.md           ← Page (order 1)
    02-setup.md           ← Page (order 2)
  configuration/
    _meta.md
    01-settings.md
```

Manifold walks this directory at build time, extracts frontmatter, and generates the full site — sidebar, search index, and all.

### What You Get

| Feature | Implementation |
|---|---|
| Multi-space navigation | Space switcher + sidebar per space |
| Per-space theming | JSON theme files with DaisyUI tokens |
| Full-text search | Pagefind (static, no server) |
| Code blocks | Shiki highlighting + copy button |
| Table of contents | Auto-generated from h2/h3 headings |
| Static export | Deploy anywhere — no server needed |

> [!TIP]
> Manifold outputs a fully static site. The `out/` directory can be deployed to GitHub Pages, Netlify, Vercel, S3, or any web server.

