---
title: Callouts
order: 3
description: Styled callout blocks for notes, tips, warnings, and danger.
---

## Callout Types

Callouts are blockquotes with a special marker. They render with an icon, label, and themed background.

| Type | Color | Use for |
|---|---|---|
| Note | Blue | General information |
| Tip | Green | Helpful advice, shortcuts |
| Warning | Yellow | Gotchas, potential issues |
| Danger | Red | Breaking changes, critical warnings |

## Syntax

Manifold supports two callout formats:

### GitHub-Style

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

### Bold-Prefix

```markdown
> **Note:** This also works as a note callout.

> **Tip:** And this as a tip.
```

## Live Examples

> [!NOTE]
> Callout colors come from the current theme's `info`, `success`, `warning`, and `error` tokens. They look correct in both dark and light modes.

> [!TIP]
> Use callouts sparingly. If everything is highlighted, nothing stands out.

> [!WARNING]
> Callouts only work inside blockquotes. The marker must be the very first thing in the blockquote.

> [!DANGER]
> Never use callouts for regular content. Reserve `DANGER` for things that will genuinely cause data loss or broken builds.

## Multi-Line Callouts

Callouts can span multiple paragraphs:

```markdown
> [!NOTE]
> First paragraph of the callout.
>
> Second paragraph with more detail.
```

> [!NOTE]
> First paragraph of the callout.
>
> Second paragraph with more detail. Everything inside the blockquote is part of the callout body.

