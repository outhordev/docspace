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

### Cloudflare Pages

**Option A — Connect your repo (recommended):**

1. Go to [Cloudflare Dashboard → Workers & Pages → Create](https://dash.cloudflare.com/)
2. Connect your GitHub/GitLab repo
3. Configure:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | `20` (set via environment variable `NODE_VERSION = 20`) |

4. Deploy. Cloudflare will rebuild on every push to `main`.

**Option B — Direct upload via CLI:**

```bash
npm run build
npx wrangler pages deploy out --project-name=my-docs
```

You'll need the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) and a Cloudflare account.

> [!TIP]
> Cloudflare Pages handles SPA routing and trailing slashes automatically — no extra config needed for a static export.

### Self-Hosted (Nginx, Caddy, or Docker)

Build locally (or in CI), then serve the `out/` folder with any web server.

**Quick local preview:**

```bash
npm run build
npx serve out
```

**Nginx:**

```nginx
server {
    listen       80;
    server_name  docs.example.com;
    root         /var/www/docspace/out;
    index        index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /pagefind/ {
        expires 1d;
    }
}
```

**Caddy:**

```
docs.example.com {
    root * /var/www/docspace/out
    file_server
    try_files {path} {path}/ {path}.html
}
```

**Docker (minimal):**

```dockerfile
FROM nginx:alpine
COPY out/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

For any self-hosted setup: `npm run build`, copy `out/` to your server, point your web server at it.

### Other Providers

The `out/` folder also works with **Netlify**, **Vercel**, **AWS S3 + CloudFront**, **Azure Static Web Apps**, or any other static hosting. Just set the build command to `npm run build` and the output directory to `out`.

## Base Path

If you deploy to a subpath like `example.com/docs/`, update `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
  basePath: '/docs',
}
```

> [!WARNING]
> After changing the base path, double-check that your `public/appicon/` image still loads correctly.

## Search After Deploy

The Pagefind search index is generated during `npm run build` and lives in `out/pagefind/`. It runs entirely client-side — no server-side component needed.

| Detail | Value |
|---|---|
| Trigger | `Ctrl+K` or the navbar search hint |
| Engine | Pagefind (static, client-side) |
| Indexed content | All visible text + space and theme metadata |

> [!TIP]
> To test search locally, run `npm run build` first, then preview with `npx serve out`. Search won't return results in dev mode unless you've built at least once.
