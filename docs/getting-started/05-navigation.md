---
title: Navigation & UI
order: 4
description: Landing page, sidebar, space switcher, settings, and search.
---

## Landing Page

Visiting `/` shows a landing page listing every space as a card. Each card displays the space's icon, title, description, page count, and most recent edit date.

### Single-Space Redirect

When you only have **one** space, the landing page is redundant. Set `singleSpaceRedirect: true` in `docspace.config.ts` and `/` will redirect straight into that space.

```typescript
singleSpaceRedirect: true,
```

Add a second space later and the landing page comes back automatically.

## Sidebar

Inside a space, the sidebar lists every page in sort order. Features include:

- **Active-page indicator** — either a left-border accent (`border`) or a filled pill (`pill`), configured per-theme
- **Full title display** — long page titles are never truncated
- **Mobile drawer** — on small screens, the sidebar slides in from the left and can be dismissed with the ✕ button or by pressing `Escape`

## Space Switcher

The navbar has a **Spaces** dropdown that lets you jump between spaces. It shows each space's icon, title, and page count at a glance.

## Settings Modal

Click the ⚙️ icon in the navbar to open the settings modal:

**Appearance** — choose between the space's custom theme, universal dark mode, or universal light mode. The preference is saved in the reader's browser.

**Content Width** — choose how wide the text column should be. The available presets are defined in `docspace.config.ts` under `contentWidthOptions`:

```typescript
contentWidthOptions: [
  { value: '55ch',  label: 'Narrow',     description: 'Compact, very readable' },
  { value: '65ch',  label: 'Default',    description: 'Balanced for prose' },
  { value: '80ch',  label: 'Wide',       description: 'Good for code-heavy pages' },
  { value: '100ch', label: 'Extra Wide', description: 'Maximum reading area' },
],
```

You can add, remove, or reorder entries freely. The first option is the default.

> [!NOTE]
> Theme and width preferences are stored in `localStorage` and persist across sessions. Choosing "Space Theme" restores the per-space custom themes.

## Search

Press **Ctrl+K** (or click the search hint in the navbar) to open full-text search. Results show the page title, space name, and a content snippet with your query highlighted.

Search is powered by **Pagefind** and runs entirely client-side — no backend required.

> [!TIP]
> Search only returns results after a production build (`npm run build`). During `npm run dev`, the search index may be missing or stale.
