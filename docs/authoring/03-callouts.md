---
title: Callouts
order: 3
description: Styled callout blocks for notes, tips, warnings, and danger.
---

## Overview

Callouts are blockquotes with a special marker on the first line. They render with an icon, a label, and themed colors.

| Type | Use for |
|---|---|
| **Note** | General context the reader should be aware of |
| **Tip** | Helpful advice, shortcuts, best practices |
| **Warning** | Gotchas, things that might go wrong |
| **Danger** | Breaking changes, data loss, critical warnings |

## Syntax

docspace supports two callout formats.

### GitHub-Style (Recommended)

```markdown
> [!NOTE]
> This is an informational note.

> [!TIP]
> A helpful tip for the reader.

> [!WARNING]
> Something to watch out for.

> [!DANGER]
> This will break things if ignored.
```

### Bold-Prefix Style

```markdown
> **Note:** This also works as a note callout.

> **Tip:** And this as a tip.
```

Both styles produce the same output.

## Live Examples

> [!NOTE]
> Callout colors come from the current theme's `info`, `success`, `warning`, and `error` tokens. They adapt to both dark and light modes automatically.

> [!TIP]
> Use callouts sparingly — when everything is highlighted, nothing stands out.

> [!WARNING]
> The marker must be the very first content in the blockquote. Text before it will prevent the callout from rendering.

> [!DANGER]
> Reserve `DANGER` for things that will genuinely cause data loss, broken builds, or irreversible actions.

## Multi-Line Callouts

Callouts can contain multiple paragraphs, lists, and even code:

```markdown
> [!NOTE]
> First paragraph of the callout.
>
> Second paragraph with more detail, including a list:
> - Item one
> - Item two
```

> [!NOTE]
> First paragraph of the callout.
>
> Second paragraph with more detail. Everything inside the blockquote is part of the callout body.
