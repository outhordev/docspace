---
title: Deployment
order: 3
description: Building and deploying your docspace site.
---

## Build

```bash
npm run build
```

This runs `next build` followed by `npx pagefind --site out`. The result is a self-contained `out/` directory with:

- Pre-rendered HTML for every page
- CSS and JS bundles
- The Pagefind search index
- All static assets from `public/`

## Hosting

docspace outputs **pure static files**. Any hosting provider that can serve HTML works.

### GitHub Pages

Add this workflow to `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Pages
on:
  push:
    branches: [main]

permissions:
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
      - id: deploy
        uses: actions/deploy-pages@v4
```

### Netlify

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `out` |

### Vercel

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `out` |
| Framework preset | Next.js |

### Other Providers

The `out/` folder works with **Cloudflare Pages**, **AWS S3 + CloudFront**, **Azure Static Web Apps**, or a simple `npx serve out` for local preview.

## Base Path

If you deploy to a subpath like `example.com/docs/`, update `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
  basePath: '/docs',
}
```

> [!WARNING]
> After changing the base path, double-check any hardcoded paths in your config (e.g. the favicon).

## Search After Deploy

The Pagefind search index is generated during `npm run build` and lives in `out/pagefind/`. It runs entirely client-side — no server-side component needed.

| Detail | Value |
|---|---|
| Trigger | `Ctrl+K` or the navbar search hint |
| Engine | Pagefind (static, client-side) |
| Indexed content | All visible text + space and theme metadata |

> [!TIP]
> To test search locally, run `npm run build` first, then preview with `npx serve out`. Search won't return results in dev mode unless you've built at least once.
