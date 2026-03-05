---
title: Meadow
theme: meadow
icon: sun
order: 8
description: A warm, cozy light theme inspired by kraft paper and soft parchment tones.
---

## The Meadow Theme

Meadow wraps your content in the warmth of a handwritten letter on craft paper. The palette is built around soft tans, warm beiges, and light caramels — nothing is pure white or stark, every value carries a gentle yellow-brown warmth. *Lora* serif headings and *Nunito* body text give it a rounded, approachable feel.

### When to Use It

A natural fit for anything cozy and inviting: cooking guides, gardening docs, journal-style content, craft tutorials, wellness writing, or any project that wants to feel like a warm afternoon rather than a corporate dashboard.

### Colors at a Glance

```palette
Primary (Sage)          #5b7a5e
Secondary (Brown)       #8b7355
Accent (Terracotta)     #b86f50
Base 100 (Background)   #f5e6c8
Base Content (Text)     #3d3225
```

### Code Example

```python
from dataclasses import dataclass
from typing import List

@dataclass
class Plant:
    name: str
    sun: str       # "full" | "partial" | "shade"
    water: str     # "daily" | "weekly" | "biweekly"
    zone: int

def garden_plan(plants: List[Plant], zone: int) -> List[Plant]:
    """Filter plants suitable for the given hardiness zone."""
    return [p for p in plants if p.zone <= zone]

herbs = [
    Plant("Basil", "full", "daily", 4),
    Plant("Mint", "partial", "weekly", 3),
    Plant("Lavender", "full", "biweekly", 5),
]
```

### Sample Content

> *There's a particular kind of contentment that comes from slow work done well. Kneading dough, tending a garden, pressing flowers between the pages of a heavy book. These aren't shortcuts — they're the whole point. The rhythm itself is the reward.*

The background uses a tiled botanical pattern — tiny scattered seed and leaf shapes drifting slowly on a diagonal, like the grain of handmade paper. A fine speckle layer adds additional texture. Both are deliberately ultra-low contrast (3–5% opacity) so they read as natural material, not decoration.

> [!NOTE]
> Meadow's warm palette uses all analogous colors — no high-contrast jumps. Even the info and error tones are dusty and muted, keeping the entire page feeling cohesive and calm.

### Tags

This theme auto-assigns to spaces with content about: `nature`, `garden`, `cozy`, `organic`, `plant`, `ecology`, `sustainability`, `recipe`, `wellness`, `mindful`, `craft`, `outdoor`, `farm`, `botanical`.

