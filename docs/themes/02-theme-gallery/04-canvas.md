---
title: Canvas
theme: canvas
order: 4
description: A warm light theme with cream tones and artistic serif headings.
---

## The Canvas Theme

Canvas evokes the feeling of a well-loved sketchbook — warm cream backgrounds, rich brown accents, and elegant *Lora* serif headings. The subtle dot-pattern background adds texture without distraction.

### When to Use It

Perfect for art direction docs, style guides, design systems, portfolio write-ups, or any content with an artistic or editorial sensibility.

### Colors at a Glance

| Token | Color | Usage |
|---|---|---|
| `primary` | `#92400E` | Burnt sienna — links, active states |
| `accent` | `#B45309` | Warm amber — highlights |
| `base-100` | `#FDF8F0` | Warm cream — page background |
| `base-content` | `#1C1917` | Near-black — body text |

### Code Example

```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.gallery-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.gallery-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
```

### Sample Content

> *Good design is as little design as possible. Less, but better — because it concentrates on the essential aspects, and the products are not burdened with non-essentials. Back to purity, back to simplicity.*

Canvas keeps the focus on your words and images. The warm palette reduces eye strain during long reading sessions while the serif headings add a touch of editorial refinement.

> [!TIP]
> Canvas pairs beautifully with image-heavy content. The warm cream background makes photographs and illustrations pop without competing with them.

### Tags

This theme auto-assigns to spaces with content about: `art`, `visual`, `design`, `illustration`, `creative`, `painting`, `drawing`, `sketch`, `color`, `typography`, `aesthetic`, `gallery`, `portfolio`, `style guide`.

