---
title: Aurora
theme: aurora
order: 2
description: A dark theme with animated northern lights dancing across the sky.
---

## The Aurora Theme

Aurora brings the northern lights to your documentation. Soft greens, blues, and purples drift across a deep night-sky background through subtle CSS animations. The *Bitter* serif heading font adds a grounded, editorial quality.

### When to Use It

A versatile dark theme that works well for general-purpose documentation, onboarding guides, research notes, or any content that wants an atmospheric but not overpowering backdrop.

### Colors at a Glance

| Token | Color | Usage |
|---|---|---|
| `primary` | `#22C55E` | Emerald green — links, active states |
| `secondary` | `#38BDF8` | Sky blue — supporting elements |
| `accent` | `#A855F7` | Purple — highlights |
| `base-100` | `#060818` | Deep navy-black — page background |
| `base-content` | `#D0E0F0` | Cool white — body text |

### Code Example

```python
import numpy as np

def simulate_aurora(latitude: float, kp_index: int) -> dict:
    """Predict aurora visibility based on geomagnetic activity."""
    visibility = max(0, min(100, (kp_index * 15) - abs(latitude - 65) * 2))
    return {
        "latitude": latitude,
        "kp_index": kp_index,
        "visibility_pct": round(visibility, 1),
        "colors": ["green", "blue"] if kp_index < 5 else ["green", "purple", "red"]
    }
```

### Sample Content

> *On clear winter nights, the aurora borealis paints the sky in luminous curtains of green and violet. The phenomenon occurs when charged solar particles collide with atmospheric gases — oxygen producing greens and reds, nitrogen contributing blues and purples.*

The Aurora theme mirrors this interplay of color through its animated background bands that gently shift and pulse, never quite repeating.

> [!TIP]
> The animated aurora background is pure CSS — no JavaScript, no canvas. It performs well even on lower-end hardware.

### Tags

This theme auto-assigns to spaces with content about: `overview`, `introduction`, `getting started`, `onboarding`, `welcome`, `general`, `weather`, `climate`, `atmosphere`, `science`, `research`, `analysis`, `data`, `discovery`.

