---
title: Keep It Simple Stupid
order: 1
description: Minimal setup to get a working docs site.
---

## Setup

Here's everything you need to do to have a working documentation site:

1. Clone this template
2. Create a folder in `docs/`, remove the placeholder content
2. Add a `.md` file
3. Run `npm run dev`

Axiom generates the sidebar, navigation, search, and theming from your folder and file names. No configuration required.
```
docs/
  my-project/
    getting-started.md
    api-reference.md
```

This produces a full documentation site with two pages. Repeat for as many pages and spaces as you need.

## Essentials

Almost everything in these docs describes **optional** features. Here's what happens when you don't configure things:

| If you skip... | Axiom will... |
|---|---|
| _meta.md | Derive the space title from the folder name |
| icon | Use a default file icon |
| theme | Auto-assign a built-in theme |
| order | Sort pages alphabetically |
| description | Leave it blank (nothing breaks) |
| Frontmatter entirely | Derive the page title from the filename |

Nothing breaks. You get a working documentation site. 

## Stepping it up
When you *want* more control, here's the general progression:

### Light Organization
Prefix filenames with numbers (01-, 02-) to control sidebar order. Still zero config.

### Metadata
Add _meta.md to your spaces for custom titles, icons, and descriptions. Add frontmatter to pages for titles and descriptions. The landing page starts looking intentional.

### Theming
Create a custom theme JSON in themes/ with your own colors, fonts, and code highlighting. Assign it to a space. Your docs now have a visual identity.

### More Organization
Use page groups (subfolders) for complex navigation. Add color palettes and gradient previews for design docs. Tweak axiom.config.ts for custom width presets and landing page styling. Inject custom CSS and HTML through themes.

## tl;dr
You don't have to use any of this. A folder and a Markdown file is a documentation site. Everything else is there if you want it.