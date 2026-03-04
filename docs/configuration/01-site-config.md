---
title: Site Config
order: 1
description: The manifold.config.ts file and all available options.
---

## Config File

All site-wide settings live in `manifold.config.ts` at the project root.

```typescript
const config = {
  title: 'Manifold',
  description: 'A file-driven documentation site.',
  favicon: '/favicon.svg',
  footerText: 'Built with Manifold',
  homeTheme: 'deepspace',
  homeGradient: 'linear-gradient(135deg, #0B0D17 0%, #1A1040 30%, #0D1B2A 60%, #0B0D17 100%)',
  singleSpaceRedirect: true,
  contentMaxWidth: '65ch',
}

export default config
```

## Option Reference

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `'Manifold'` | Site name — navbar, browser tab, hero |
| `description` | `string` | `'A file-driven...'` | HTML meta description |
| `favicon` | `string` | `'/favicon.svg'` | Path relative to `/public` |
| `footerText` | `string` | `'Built with Manifold'` | Footer text on every page |
| `homeTheme` | `string` | `'deepspace'` | Theme for the landing page |
| `homeGradient` | `string` | CSS gradient | Landing page background; `''` to disable |
| `singleSpaceRedirect` | `boolean` | `true` | Skip landing when only one space exists |
| `contentMaxWidth` | `string` | `'65ch'` | Max width of the prose content area |

## Content Width

The `contentMaxWidth` controls how wide the text column is on doc pages. This is the **default** — readers can override it via the settings modal.

| Value | Feel |
|---|---|
| `55ch` | Narrow — very comfortable for prose |
| `65ch` | Default — balanced |
| `80ch` | Wide — good for code-heavy docs |
| `100ch` | Extra wide — maximum reading area |

## Single-Space Mode

When `singleSpaceRedirect` is `true` and `docs/` has one space, `/` redirects to that space. Add a second space and the landing page returns automatically.

> [!NOTE]
> The landing page theme (`homeTheme`) is independent of space themes. You can use any theme from `themes/`, or `'dark'`/`'light'`.

