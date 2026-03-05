---
title: Markdown
order: 1
description: Supported syntax, formatting, and frontmatter.
---

## Supported Syntax

docspace uses **GitHub Flavored Markdown** (GFM) via `remark-gfm`. All standard Markdown works out of the box, plus tables, strikethrough, task lists, and autolinks.

## Headings

Use `##` through `####` for your content. The page title comes from frontmatter, so body content should start at `##`.

Every heading gets an **anchor link** (visible on hover) and feeds the **Table of Contents** in the right sidebar.

```markdown
## Section Title
### Subsection
#### Minor heading
```

## Text Formatting

**Bold**, *italic*, ~~strikethrough~~, and inline `code` all work as expected:

```markdown
**Bold text** and *italic text* and ~~strikethrough~~.

Inline `code` renders in a monospace font with a subtle background.
```

## Links

```markdown
[External link](https://example.com)
[Link to another page](./02-code-blocks)
```

Internal links use relative paths. They resolve to the correct URL at build time.

## Lists

Unordered and ordered lists, including nesting:

```markdown
- First item
  - Nested item
  - Another nested item
- Second item

1. Step one
2. Step two
   1. Sub-step
```

## Tables

Standard GFM tables:

```markdown
| Feature | Status |
|---|---|
| Markdown | ✅ |
| Search | ✅ |
| Themes | ✅ |
```

| Feature | Status |
|---|---|
| Markdown | ✅ |
| Search | ✅ |
| Themes | ✅ |

Tables render with zebra-striping and a rounded border that matches the current theme.

## Blockquotes

```markdown
> A regular blockquote. Renders with a left border
> and a subtle background.
```

> A regular blockquote. Renders with a left border and a subtle background.

## Images

Place images in `public/` and reference them with an absolute path:

```markdown
![Screenshot](/images/my-screenshot.png)
```

## Frontmatter

Every page starts with YAML frontmatter inside `---` fences. It is stripped from the rendered output and used only for metadata:

```markdown
---
title: My Page
order: 1
description: A brief summary shown in the page header.
---
```

See [Spaces & Pages](/getting-started/what-is-docspace/spaces-and-pages#frontmatter) for the full list of supported frontmatter fields.
