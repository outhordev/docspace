---
title: Color Features
order: 4
description: Interactive palettes, hex swatches, and gradient previews.
---

## Overview

axiom has built-in support for documenting colors — ideal for art direction docs, style guides, and design systems. You can click any color swatch to copy its hex code, hsl, or rgb value to your clipboard.

## Inline Hex Swatches

Any hex code in your text is automatically converted into a clickable inline swatch with a color dot. For example, writing `#D97706` in your Markdown renders as a swatch: #D97706

> [!TIP]
> To insert a hex code without rendering a swatch, wrap it in backticks: `` `#D97706` ``. This renders as inline code instead of a swatch.

## Palette Blocks

Use a fenced code block with `palette` as the language to showcase multiple colors together:

````markdown
```palette
Amber Gold    #D97706
Deep Brown    #92400E
Surface       #251A12
```
````

```palette
Amber Gold    #D97706
Deep Brown    #92400E
Surface       #251A12
```

Each line is a **color name** followed by a **hex code** (separated by two or more spaces). Renders as a grid of clickable swatches.

## Gradient Blocks

Use the `gradient` language for gradient previews:

````markdown
```gradient
#22D3EE → #0A0F1E
```
````

```gradient
#22D3EE → #0A0F1E
```

Renders a visual preview with start and end colors labeled. Click either color to copy it.
