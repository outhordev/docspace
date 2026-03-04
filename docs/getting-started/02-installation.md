---
title: Installation
order: 2
description: Setting up Manifold and running your first build.
---

## Prerequisites

- **Node.js** 18+
- **npm**, **yarn**, or **pnpm**
- A text editor (VS Code recommended)

## Quick Start

```bash
git clone https://github.com/your-org/manifold.git my-docs
cd my-docs
npm install
npm run dev
```

Open `http://localhost:3000`. You should see the landing page.

## Project Structure

| Path | Purpose |
|---|---|
| `manifold.config.ts` | Site-wide settings (title, theme, behavior) |
| `docs/` | Your documentation content |
| `themes/` | Custom theme JSON files |
| `app/` | Next.js pages (usually untouched) |
| `lib/` | Core libraries (Markdown, themes, walker) |
| `public/` | Static assets (favicon, images) |

## Creating a Space

Create a folder inside `docs/`:

```bash
mkdir docs/my-space
```

Add a `_meta.md` to configure it:

```markdown
---
title: My Space
icon: book-open
theme: blueprint
description: A short description for the landing page.
---
```

Add your first page:

```markdown
---
title: Hello World
order: 1
---

## Welcome

This is your first page.
```

The dev server picks up changes automatically.

## Production Build

```bash
npm run build
```

This runs `next build` followed by `npx pagefind --site out`. The result is a static `out/` directory ready for deployment.

> [!NOTE]
> The build uses `output: 'export'` in Next.js config — everything is pre-rendered to HTML. No Node.js server required in production.

