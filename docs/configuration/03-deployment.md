---
title: Deployment
order: 3
description: Building and deploying your Manifold site.
---

## Build Command

```bash
npm run build
```

This generates the `out/` directory containing pre-rendered HTML, CSS/JS bundles, the Pagefind search index, and static assets.

## Hosting

Since Manifold outputs **pure static files**, it works with any hosting provider.

### GitHub Pages

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
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
      - uses: actions/deploy-pages@v4
```

### Netlify

- **Build command:** `npm run build`
- **Publish directory:** `out`

### Vercel

- **Build command:** `npm run build`
- **Output directory:** `out`
- **Framework preset:** Next.js

### Other Providers

The `out/` folder works with AWS S3 + CloudFront, Cloudflare Pages, Azure Static Web Apps, or `npx surge out`.

## Base Path

If deploying to a subpath like `example.com/docs/`:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  basePath: '/docs',
}
```

> [!WARNING]
> After changing the base path, update any hardcoded paths in your config (like the favicon).

## Search

Search is powered by **Pagefind** and indexed during the build step. The index lives in `out/pagefind/` and runs entirely client-side.

| Detail | Value |
|---|---|
| Trigger | `Ctrl+K` or navbar button |
| Engine | Pagefind (static) |
| Indexed | All visible text + space/theme metadata |
| Server required | No |

> [!TIP]
> Search only works after a build. To test locally: `npm run build` then `npx serve out`.

