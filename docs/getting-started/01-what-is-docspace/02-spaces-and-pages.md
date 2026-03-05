---
title: Spaces & Pages
order: 2
description: How folders become spaces, files become pages, and subfolders become groups.
---

## Spaces

Folders under `/docs` become **spaces**. Each space gets its own sidebar, theme, icon, and URL namespace. Bunch of
Markdown and frontmatter features are supported. Each space can be given a theme, icon, and description via a `_meta.md`
file.

### The `_meta.md` File

Drop a `_meta.md` in any space folder to configure it:

```markdown
---
title: Handbook
icon: book-open
theme: blueprint
order: 1
description: Internal team documentation.
---
```

All fields are optional. Without `_meta.md`, docspace derives a title from the folder name and auto-assigns a theme.

| Field         | Type     | Description                                                    |
|---------------|----------|----------------------------------------------------------------|
| `title`       | `string` | Display name (falls back to folder name)                       |
| `icon`        | `string` | Any [Lucide](https://lucide.dev/icons) icon name in kebab-case |
| `theme`       | `string` | A theme from `themes/` or `dark` / `light`                     |
| `order`       | `number` | Sort position on the landing page and space switcher           |
| `description` | `string` | Short blurb shown on the landing page card                     |

### Ordering

Spaces (and pages, and page groups) are all sorted by the same priority:

1. **`order`** field in frontmatter
2. **Numeric prefix** in folder/file name (`01-getting-started`, `02-guides`, etc.)
3. **Alphabetical title** (fallback)

### Icons

The `icon` field accepts any name from the [Lucide icon library](https://lucide.dev/icons) — over 1,500 icons. Use the
kebab-case form exactly as shown on their site.

> [!TIP]
> If an icon name isn't recognised, docspace falls back to a generic file icon.

### Auto-Theme Assignment

By default, spaces are themed by looking for keywords in the underlying Markdown files and tries to match these to themes
with similar keywords in a `theme.json`. For example, a page that uses the word 'code' a lot, will probably get
assigned the blueprint theme. If there are no matches, docspace round-robins through the available themes to assign a
unique one to each space.
Naturally you can override this by setting a specific theme in the space's `_meta.md`.
The idea is to give you a nice-looking site with minimal configuration, while still letting you customize as much as you
want.
More info on keywords in  [Theming](/themes/theming#content-aware-auto-assignment).

## Pages

Any `.md` file inside a space becomes a **page**. Files starting with `_` (like `_meta.md`) are excluded from
navigation.

### Frontmatter

```markdown
---
title: Welcome
order: 1
icon: cpu
description: Start here.
---
```

| Field          | Type     | Description                                                                |
|----------------|----------|----------------------------------------------------------------------------|
| `title`        | `string` | Display title (falls back to filename)                                     |
| `order`        | `number` | Sort position in the sidebar                                               |
| `icon`         | `string` | Lucide icon name (falls back to `file-text`)                               |
| `description`  | `string` | Shown in the page header below the title                                   |
| `theme`        | `string` | Per-page theme override (see [Theming](/themes/theming#per-page-override)) |
| `lastModified` | `string` | ISO date string; falls back to file mtime                                  |

If you include `lastModified` in the frontmatter, docspace will use that value. If you don't, docspace will look at the file's last modified time on disk and use that.

## Page Groups

Subfolders inside a space become collapsible sections in the sidebar. Handy for organizing larger documentation sets.

Each group folder can have its own `_meta.md` to set a display title and sort order. Without one, the group title is
derived from the folder name. Same rules as spaces and pages.

Groups can be nested. In practice one level covers most use cases. Groups containing the active page are automatically
expanded, and prev/next navigation follows the sidebar tree in depth-first order.