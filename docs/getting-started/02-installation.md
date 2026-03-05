---
title: Installation
order: 2
description: Clone the repo, install dependencies, and see your first page.
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

## Project Layout

| Path | Purpose |
|---|---|
| `docspace.config.ts` | Site-wide settings — title, theme, footer, width options |
| `docs/` | All of your documentation content |
| `themes/` | Custom theme JSON files |
| `public/` | Static assets (favicon, images) |
| `app/` | Next.js routing (you rarely touch this) |
| `components/` | UI components (sidebar, search, settings) |
| `lib/` | Core logic — Markdown pipeline, theme loader, docs walker |

## Your First Space

Create a folder and a `_meta.md`:

```bash
mkdir docs/handbook
```

```markdown
---
title: Handbook
icon: book-open
theme: blueprint
description: Internal team documentation.
---
```

Then add a page:

```markdown
---
title: Welcome
order: 1
description: Start here.
---

## Hello, World

Your first docspace page is live. Edit this file and the dev server will refresh.
```

## Production Build

```bash
npm run build
```

This runs `next build` followed by `npx pagefind --site out`, producing a fully static `out/` directory with pre-rendered HTML, bundled assets, and a search index.

> [!NOTE]
> docspace uses `output: 'export'` in the Next.js config. Everything is pre-rendered — no server process needed in production.
