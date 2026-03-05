---
title: Navigation & UI
order: 3
description: Landing page, sidebar, space switcher, settings, and search.
---

## Landing Page

Visiting the root URL (`/`) shows a landing page listing every space as a card with an icon, title, description, page count, and most recent edit date.

If you only have one space, you can set `singleSpaceRedirect: true` in `docspace.config.ts` to skip the landing page and go straight to that space. Once you add a second space, the landing page will automatically be enabled again.

## Sidebar

Inside a space, the sidebar lists every page in sort order. Active-page indicator style (`border` or `pill`) is configured per-theme. On mobile, the sidebar slides in as a drawer.

## Space Switcher

The navbar has a **Spaces** dropdown for jumping between spaces. Shows each space's icon, title, and page count.

## Settings

Click the ⚙️ icon in the navbar for reader settings:

- **Appearance** — space's custom theme, universal dark mode, or universal light mode. Saved in the browser.
- **Content Width** — how wide the text column should be. Presets are defined by `contentWidthOptions` in `docspace.config.ts`: [Installation & Config](/getting-started/installation#site-config).

## Search

Press **Ctrl+K** to open full-text search. Powered by [Pagefind](https://pagefind.app/).

> [!TIP]
> Search only returns results after a production build (`npm run build`). During dev, the index may be missing or stale.