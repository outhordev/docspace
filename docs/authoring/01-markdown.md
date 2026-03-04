---
title: Markdown
order: 1
description: Supported Markdown syntax and frontmatter.
---

## Supported Syntax

Manifold uses **GitHub Flavored Markdown** (GFM) via `remark-gfm`. All standard Markdown works, plus tables, strikethrough, and task lists.

### Headings

Use `##` through `####`. The page title comes from frontmatter, so content should start at `##`.

Headings auto-generate **anchor links** (visible on hover) and populate the **Table of Contents** sidebar.

### Text Formatting

```markdown
**Bold text** and *italic text* and ~~strikethrough~~.

Inline `code` looks like this.
```

### Links

```markdown
[External link](https://example.com)
[Internal link](./02-code-blocks)
```

### Lists

```markdown
- Unordered item
  - Nested item

1. Ordered item
   1. Nested ordered
```

### Tables

```markdown
| Feature | Status | Notes |
|---|---|---|
| Markdown | ✅ | Full GFM |
| Search | ✅ | Pagefind |
| Themes | ✅ | Per-space |
```

### Blockquotes

```markdown
> A regular blockquote. Styled with a left border
> and subtle background.
```

### Images

Place images in `public/` and reference them with a `/` prefix:

```markdown
![Screenshot](/images/my-screenshot.png)
```

## Frontmatter

Every page starts with YAML frontmatter:

```markdown
---
title: My Page
order: 1
description: A brief summary.
---
```

Frontmatter is stripped from the rendered output and used for metadata only.

> [!NOTE]
> If you omit `title`, Manifold generates one from the filename. If you omit `order`, it uses the numeric filename prefix (like `01-`), or defaults to 999.

