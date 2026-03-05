# docspace

A Markdown driven documentation site to keep track of cool projects. Generates a static site from the docs folder on build. 
Primarily made this because I wanted a documentation site that would let me organize docs into different spaces, have each space feel like its own thing.

## Quick Start

```bash
git clone <your-repo-url> my-docs
cd my-docs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How It Works

```
docs/                     ← Drop folders + Markdown files here
  my-project/
    _meta.md              ← Space config (title, icon, theme)
    01-intro.md           ← Pages, sorted by prefix
    02-setup.md
themes/                   ← Custom theme JSONs
docspace.config.ts        ← Site-wide settings
```

Folders under `/docs` become **spaces**. Subfolders per space are supported, allowing for nested organization.
`.md` files placed in a space become **pages**. Bunch of Markdown and frontmatter features are supported.

Each space can be given a theme, icon, and description via a `_meta.md` file. This is optional, by default spaces are themed based on keywords in the docs, or round-robin if no keywords are found.

Custom themes can be added by dropping JSON files in the `/themes` folder. Each theme is a JSON file defining colors, fonts, and other styles. Themes can also inject custom CSS.

## Build & Deploy

```bash
npm run build
```

Produces a static `out/` directory. The `out/` directory can be deployed to any static hosting service. Like Github pages, Cloudflare Pages, Netlify, Vercel, or your own server with Nginx or Apache.

## App Icon

Place an image in `public/appicon/` (png, svg, ico, etc.) and it becomes the favicon + navbar logo automatically. No icon = no logo.

## Documentation

Full docs are included in the `docs/` folder of this repo and deployed using docspace here:

**[→ Read the docs](https://outhordev.github.io/docspace/)**
