---
title: Overview
order: 1
description: What even is docspace
---

## The Idea

docspace is a Markdown driven documentation site built on Next.js. Drop Markdown files into a `docs/` folder and it
turns them into a themed, searchable, statically-exported website.

All you ever have to do is create folders and Markdown files in the `docs/` directory. Top level folders become "
spaces", like the one you're in now (getting started). Markdown files become pages.
Subfolders are a way to group pages together inside a space. The `_meta.md` file in each folder is where you set the
title, description, icon, and theme for that space or group.

## How it works

```
docs/
  getting-started/          ← Space → /getting-started
    _meta.md                ← Title, icon, theme, description
    01-intro.md             ← Page (order 1)
    02-setup.md             ← Page (order 2)
    guides/                 ← Page group (collapsible sidebar section)
      _meta.md
      01-first-guide.md
  api-reference/
    _meta.md
    01-endpoints.md
```

At build time, docspace walks this tree, reads every file's frontmatter and content and then turns these into html
pages. The `_meta.md` files are used to set space-level metadata like the title, description, icon, and theme.

## Keeping it simple

Almost everything in these docs describes cool but **optional** features. When you don't configure things, docspace just does its best to make something that works:

| If you skip...       | docspace will...                            |
|----------------------|---------------------------------------------|
| `_meta.md`           | Derive the space title from the folder name |
| `icon`               | Use a default file icon                     |
| `theme`              | Auto-assign a built-in theme                |
| `order`              | Sort pages alphabetically                   |
| `description`        | Leave it blank (nothing breaks)             |
| Frontmatter entirely | Derive the page title from the filename     |

All you really need is a folder and a Markdown file inside of `docs/`.

## Features

- **Spaces** — Nice way to organize content in a way that makes it all feel unique but still part of the same site
- **Per-space theming** — JSON themes that set colors, fonts, and code highlighting
- **Full-text search** — Pagefind, fully static, runs in the browser
- **Syntax highlighting** — Shiki with dual light/dark themes and a copy button
- **Table of contents** — auto-generated from `h2` / `h3` headings
- **Color tools** — inline hex swatches, palette grids, gradient previews. Like this:  #ff5733
- **Reader settings** — theme override (dark/light/space), content width presets
- **Static export** — deploy to GitHub Pages, Cloudflare, Netlify, or anywhere

> [!NOTE]
> The `out/` directory that `npm run build` produces is pure static HTML. No Node.js process needed to serve it.

