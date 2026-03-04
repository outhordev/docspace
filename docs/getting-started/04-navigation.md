---
title: Navigation
order: 4
description: Landing page, sidebar, space switcher, and single-space mode.
---

## Landing Page

Visiting `/` shows a landing page with all spaces listed as cards. Each card displays the space title, description, page count, and last modified date.

### Single-Space Redirect

If there's only **one space** in `docs/`, the landing page is redundant. Set `singleSpaceRedirect: true` in `manifold.config.ts` to redirect `/` straight into that space.

```typescript
const config = {
  singleSpaceRedirect: true,
}
```

When you add a second space, the landing page reappears automatically.

## Sidebar

Inside a space, the sidebar lists all pages in order. It supports:

- **Active page indicator** — `border` (left bar) or `pill` (background), set per-theme
- **Mobile drawer** — slides out on small screens, closes with `Escape`
- **Space description** — shown at the top of the sidebar

## Space Switcher

The navbar includes a **space switcher** dropdown that lets you jump between spaces. It shows each space's icon, title, and page count.

## Settings

The ⚙️ icon in the navbar opens a settings modal with:

**Appearance** — switch between the space's custom theme, universal dark, or universal light mode. The reader's preference is saved in their browser.

**Content Width** — adjust how wide the text column is. Options range from narrow (55ch) to extra wide (100ch).

> [!NOTE]
> The theme toggle affects all spaces at once. Switching to "Dark" or "Light" overrides per-space themes until you switch back to "Space Theme".

## Search

Press **Ctrl+K** to open full-text search. Results show the page title and a content snippet with the search term highlighted.

Search is powered by **Pagefind** and runs entirely in the browser — no server needed.

> [!TIP]
> Search only works after a production build (`npm run build`). During development, results will be empty unless you've built at least once.

