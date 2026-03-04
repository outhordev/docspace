---
title: Spaces and pages
order: 3
description: How the file system maps to your documentation structure.
---

## Spaces

Every **directory** inside `docs/` becomes a space. Each space has its own sidebar, theme, icon, and URL namespace.

### The `_meta.md` File

Put a `_meta.md` in any space folder to configure it:

```markdown
---
title: World Building
icon: scroll-text
theme: arcane
order: 2
description: Lore, factions, and cosmology.
---
```

All fields are optional. Without `_meta.md`, Axiom derives a title from the folder name and auto-assigns a theme.

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Display name (falls back to folder name) |
| `icon` | `string` | Any Lucide icon name in kebab-case |
| `theme` | `string` | A theme from `themes/` or `dark` / `light` |
| `order` | `number` | Sort position on the landing page and space switcher |
| `description` | `string` | Short blurb shown on the landing page card |

### Ordering

Spaces are sorted by — in order of priority:

1. **`order`** field in `_meta.md` frontmatter
2. **Numeric folder-name prefix** (`01-getting-started`, `02-guides`, etc.)
3. **Alphabetical title** (fallback)

This works exactly the same way as page ordering. For example:

```
docs/
  getting-started/    ← _meta.md has order: 1
  authoring/          ← _meta.md has order: 2
  configuration/      ← _meta.md has order: 3
```

### Icons

The `icon` field accepts any name from the **Lucide** icon library — over 1,500 icons. Use the kebab-case form exactly as shown on their site.

Browse the full set at [lucide.dev/icons](https://lucide.dev/icons).

> [!TIP]
> If an icon name isn't recognised, Axiom falls back to a generic file icon. No error — just double-check the spelling at [lucide.dev/icons](https://lucide.dev/icons).

### Auto-Theme Assignment

If you omit `theme`, Axiom picks one based on folder-name keywords:

| Keywords | Theme |
|---|---|
| worldbuilding, lore, narrative | `arcane` |
| technical, engineering, code, api | `blueprint` |
| artstyle, art, visual | `canvas` |
| gamedesign, design, mechanics | `scroll` |
| devlog, production, pipeline | `dispatch` |

If nothing matches, it round-robins through unused custom themes so every space gets something unique.

## Pages

Any `.md` file inside a space becomes a page. Files that start with `_` (like `_meta.md`) are excluded from navigation.

### Ordering

Pages are sorted by — in order of priority:

1. **`order`** field in frontmatter
2. **Numeric filename prefix** (`01-`, `02-`, etc.)
3. **Alphabetical title** (fallback)

### Frontmatter

```markdown
---
title: Architecture
order: 1
description: System architecture and tech stack overview.
---
```

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Display title (falls back to filename) |
| `order` | `number` | Sort position in the sidebar |
| `description` | `string` | Shown in the page header below the title |
| `lastModified` | `string` | ISO date string; falls back to file mtime |

> [!WARNING]
> Files whose names start with `_` are always excluded from navigation. The file `progress.md` at the docs root is also excluded by convention.
