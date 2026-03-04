---
title: Color Palette
order: 1
description: The primary and secondary color palettes for the game.
---

## Primary Palette

The game uses a warm, muted palette inspired by aged parchment and deep ocean hues.

```palette
Amber Gold    #D97706
Deep Brown    #92400E
Dark Parchment #1C1410
Surface       #251A12
Light Text    #E8D5B0
```

## Secondary Palette

These colors are used for UI accents and status indicators.

```palette
Cyan Glow     #22D3EE
Indigo        #6366F1
Forest Green  #166534
Warm Orange   #EA580C
Soft Red      #F87171
```

## Gradients

### Sky Gradient (Day)

```gradient
#D97706 → #92400E
```

### Ocean Depth

```gradient
#22D3EE → #0A0F1E
```

### Forest Canopy

```gradient
#166534 → #14532D
```

## Usage Guidelines

- Primary #D97706 is used for all **interactive elements** (buttons, links, highlights)
- Background should always be #1C1410 for dark themes or #FDF8F0 for light themes
- Never use pure white (#FFFFFF) or pure black (#000000) — always use the palette values
- Status colors follow the convention: #22C55E for success, #FBBD23 for warning, #F87272 for error

> [!NOTE]
> When implementing these colors in Unity, use the Color constructor with float values. The wiki's copy feature can export in Unity format automatically — just click any swatch above.

