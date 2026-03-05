---
title: Ocean
theme: ocean
icon: moon
order: 10
description: A deep dark theme with gentle wave animations and underwater caustic light.
---

## The Ocean Theme

Ocean immerses your content in a stormy sea. Six smaller, overlapping wave bands drift slowly across the viewport at staggered speeds — the same blurred-gradient technique as Aurora, but scaled down and slowed to feel like deep ocean swells. A depth gradient darkens toward the bottom and a faint surface mist glows at the top. *Playfair Display* serif headings give it an elegant, editorial quality, while *Source Sans 3* keeps body text clean.

### When to Use It

Ideal for marine biology docs, travel writing, environmental content, nautical projects, or any documentation that benefits from a calm, immersive dark atmosphere without being as stark as space themes.

### Colors at a Glance

```palette
Primary (Sky Blue)      #38BDF8
Secondary (Ocean Blue)  #0EA5E9
Accent (Teal)           #2DD4BF
Base 100 (Background)   #07111F
Base Content (Text)     #C4DCE8
```

### Code Example

```python
from dataclasses import dataclass, field
from typing import List

@dataclass
class CoralReef:
    name: str
    depth_m: float
    species: List[str] = field(default_factory=list)
    health: str = "healthy"  # "healthy" | "bleached" | "recovering"

    def biodiversity_index(self) -> float:
        """Simple species richness relative to depth."""
        return len(self.species) / max(self.depth_m, 1)

reefs = [
    CoralReef("Great Barrier", 35.0, ["staghorn", "brain", "fan", "table"], "recovering"),
    CoralReef("Tubbataha", 20.0, ["elkhorn", "pillar", "star"], "healthy"),
]
```

### Sample Content

> *Below the thermocline the world changes. Light fades from blue to black in imperceptible gradients. Pressure builds. And yet, life persists — bioluminescent organisms painting the darkness with cold light, tube worms anchored to hydrothermal vents, entire ecosystems thriving without a single photon from the sun.*

The background is built from six overlapping wave bands — each a horizontal gradient of deep blues with a 70px blur, wide enough that their edges dissolve well offscreen. They sway, scale, and pulse in opacity within a narrow range at very slow intervals (48–82s cycles), so overlapping bands blend smoothly without flickering. A depth gradient at the bottom anchors the scene, and a faint mist at the top adds surface atmosphere.

> [!TIP]
> Ocean's animations are all pure CSS — no JavaScript. The slow timing (48–82s cycles) keeps the effect calming rather than distracting, and the layered approach means no single element draws too much attention.

### Tags

This theme auto-assigns to spaces with content about: `ocean`, `sea`, `water`, `marine`, `aquatic`, `dive`, `coral`, `tide`, `wave`, `nautical`, `sailing`, `coast`, `underwater`, `deep`.

