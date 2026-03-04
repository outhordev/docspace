---
title: Page Groups
order: 3
description: Organize pages into collapsible sidebar sections using subfolders.
---

## Page Groups
Inside of a space, you can group pages together using subfolders. Each subfolder becomes a collapsible section in the sidebar, helping you organize large documentation sets into manageable chunks.

For example, the file structure shown below visualizes the sidebar in the current space:
```
docs/
  getting-started/
    _meta.md
    01-what-is-axiom.md
    02-installation.md
    03-spaces-and-pages.md
    04-navigation.md
    05-page-groups/   <- this folder becomes a collapsible group in the sidebar
      01-page-groups.md  <- this page is inside the group
      _meta.md      <- optional metadata for the group (title, order)
```

### Group `_meta.md`

Each group folder can have its own `_meta.md` to set a display title and sort order:

```markdown
---
title: Guides
order: 3
---
```

Without `_meta.md`, the group title is derived from the folder name and order from a numeric prefix. Same as with pages.

### Nesting

Groups can be nested — a subfolder inside a subfolder becomes a nested collapsible section. In practice, one level of grouping covers most use cases.

### Behavior

- Groups that contain the **active page** are automatically expanded
- Clicking a group header toggles it open/closed
- The page count shown next to the group title reflects all pages inside (including nested groups)
- **Prev/next navigation** follows the sidebar tree order (depth-first), so readers move naturally through groups