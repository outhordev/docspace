---
title: Scroll
theme: scroll
order: 9
description: A light scholarly theme with forest green accents and clean typography.
---

## The Scroll Theme

Scroll channels the feel of a well-organized reference manual or academic paper. Off-white backgrounds, forest green accents, and *Bitter* serif headings create a scholarly, authoritative tone. The subtle herringbone-like background pattern adds texture.

### When to Use It

Excellent for game design documents, rule books, reference manuals, specification documents, wikis, knowledge bases, or any content that prioritizes clarity and structure over flair.

### Colors at a Glance

| Token | Color | Usage |
|---|---|---|
| `primary` | `#166534` | Forest green — links, active states |
| `accent` | `#15803D` | Green — highlights |
| `base-100` | `#FAFAF5` | Off-white — page background |
| `base-content` | `#1F2937` | Dark grey — body text |

### Code Example

```markdown
## 3.2 Combat Resolution

When two units engage in combat, resolve as follows:

1. **Attacker** rolls `2d6 + ATK modifier`
2. **Defender** rolls `2d6 + DEF modifier`
3. Compare totals:
   - Attacker wins by **5+** → Critical hit (double damage)
   - Attacker wins by **1–4** → Standard hit
   - Tie → Both take glancing damage
   - Defender wins → Attack is blocked

| Unit Type | ATK | DEF | HP |
|-----------|-----|-----|----|
| Infantry  | +2  | +1  | 10 |
| Cavalry   | +4  | +0  | 8  |
| Siege     | +6  | -1  | 6  |
```

### Sample Content

> *A well-written rule book is an act of empathy. You're not writing for yourself — you're writing for someone who has never played your game, who is confused, tired, and possibly reading these rules at midnight before tomorrow's session. Every ambiguity you leave in the text is a future argument at someone's table.*

Scroll's understated palette keeps the focus entirely on the content. The `pill` sidebar indicator style reinforces the clean, organized feel.

> [!TIP]
> Scroll uses the `everforest-light` Shiki theme — a muted, natural palette that complements the forest-green accent without overwhelming the page.

### Tags

This theme auto-assigns to spaces with content about: `game design`, `mechanics`, `rules`, `tutorial`, `guide`, `handbook`, `reference`, `manual`, `specification`, `policy`, `procedure`, `documentation`, `wiki`, `knowledge base`.

