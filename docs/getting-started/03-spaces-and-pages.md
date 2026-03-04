---
title: Spaces & Pages
order: 3
description: How the file system maps to your documentation structure.
---

## Spaces

Any **directory** inside `docs/` becomes a space. Each space has its own sidebar, theme, and URL namespace.

### The _meta.md File

Each space can have a `_meta.md` with frontmatter:

```markdown
---
title: World Building
icon: scroll-text
theme: arcane
description: Lore, factions, and cosmology.
colorFeatures: true
---
```

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Display name (falls back to folder name) |
| `icon` | `string` | Lucide icon name |
| `theme` | `string` | Theme from `themes/` or `dark`/`light` |
| `description` | `string` | Shown on the landing page |
| `colorFeatures` | `boolean` | Enable interactive color swatches |

### Available Icons

- `book-open` — general docs
- `scroll-text` — lore / narrative
- `cpu` — technical / engineering
- `palette` — art and design
- `newspaper` — devlogs / production

### Auto-Theme Assignment

If you omit `theme`, Manifold assigns one based on folder name keywords:

| Keywords | Theme |
|---|---|
| worldbuilding, lore, narrative | `arcane` |
| technical, engineering, code, api | `blueprint` |
| artstyle, art, visual | `canvas` |
| gamedesign, design, mechanics | `scroll` |
| devlog, production, pipeline | `dispatch` |

If nothing matches, it round-robins through unused custom themes.

## Pages

Any `.md` file inside a space (except `_`-prefixed files) becomes a page.

### Ordering

Pages are sorted by:

1. `order` field in frontmatter (highest priority)
2. Numeric filename prefix like `01-`, `02-`
3. Alphabetical title (fallback)

### Page Frontmatter

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
| `order` | `number` | Sort position in sidebar |
| `description` | `string` | Shown in the page header |
| `lastModified` | `string` | ISO date; falls back to file mtime |

> [!WARNING]
> Files starting with `_` are excluded from navigation. The file `progress.md` at the docs root is also excluded by default.

