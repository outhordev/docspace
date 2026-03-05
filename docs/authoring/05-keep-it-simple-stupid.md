---
title: Keep It Simple Stupid
order: 5
description: You don't have to use any of this.
---

## The Minimum

A folder and a Markdown file is a documentation site:

```
docs/
  my-project/
    getting-started.md
    api-reference.md
```

That's two pages, a sidebar, navigation, search, and a theme — all generated from folder and file names. No configuration required.

## What Happens When You Skip Things

Almost everything in these docs describes **optional** features. Here's what docspace does when you don't configure things:

| If you skip... | docspace will... |
|---|---|
| `_meta.md` | Derive the space title from the folder name |
| `icon` | Use a default file icon |
| `theme` | Auto-assign a built-in theme |
| `order` | Sort pages alphabetically |
| `description` | Leave it blank (nothing breaks) |
| Frontmatter entirely | Derive the page title from the filename |

Nothing breaks. You get a working documentation site.

## When You Want More

General progression for when you feel like it:

**Light organization** — Prefix filenames with numbers (`01-`, `02-`) to control sidebar order. Still zero config.

**Metadata** — Add `_meta.md` to spaces for custom titles, icons, and descriptions. Add frontmatter to pages. The landing page starts looking intentional.

**Theming** — Create a custom theme JSON in `themes/` with your own colors, fonts, and code highlighting. Assign it to a space via `_meta.md`. Your docs now have a visual identity.

**More organization** — Use [page groups](/getting-started/what-is-docspace/spaces-and-pages#page-groups) (subfolders) for complex navigation. Add [color palettes and gradients](/authoring/color-features) for design docs. Tweak `docspace.config.ts` for [custom width presets](/getting-started/installation#content-width-options) and landing page styling. Inject custom CSS and HTML through [themes](/themes/theming#theme-file-format).

## tl;dr

You don't have to use any of this. A folder and a Markdown file is a documentation site. Everything else is there if you want it.