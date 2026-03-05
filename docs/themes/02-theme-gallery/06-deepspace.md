---
title: Deep Space
theme: deepspace
icon: moon
order: 6
description: A cosmic dark theme with an animated multi-layer starfield and nebula.
---

## The Deep Space Theme

Deep Space transports you to the cosmos. Three layers of stars drift at different speeds and sizes, creating genuine parallax depth. A soft nebula gradient in purples and pinks adds color to the void. Clean *Inter* headings keep the content grounded.

### When to Use It

A great default for any dark documentation. Works especially well for space-related content, science writing, project overviews, or anything that benefits from a calm, expansive atmosphere.

### Colors at a Glance

```palette
Primary (Violet)        #A78BFA
Secondary (Purple)      #7C3AED
Accent (Pink)           #F472B6
Base 100 (Background)   #0B0D17
Base Content (Text)     #C8C6D8
```

### Code Example

```rust
struct Spacecraft {
    name: String,
    velocity: f64,    // km/s
    fuel: f64,        // tonnes
    destination: String,
}

impl Spacecraft {
    fn time_to_arrival(&self, distance_km: f64) -> f64 {
        distance_km / self.velocity / 3600.0 // hours
    }

    fn burn(&mut self, delta_v: f64, fuel_cost: f64) {
        self.velocity += delta_v;
        self.fuel -= fuel_cost;
        println!("{} now traveling at {:.1} km/s", self.name, self.velocity);
    }
}
```

### Sample Content

> *At 4.24 light-years distant, Proxima Centauri is our nearest stellar neighbor. Even at one-tenth the speed of light, the journey would take over four decades. The immensity of interstellar space humbles every engineering ambition — and yet we keep designing ships.*

The starfield animation is built from pure CSS radial gradients at three scale layers, each drifting independently. The nebula overlay uses soft radial gradients for color without impacting readability.

> [!NOTE]
> Deep Space is the default `homeTheme` in `docspace.config.ts`. It's designed to look impressive on landing pages while remaining readable for long-form documentation.

### Tags

This theme auto-assigns to spaces with content about: `space`, `cosmos`, `galaxy`, `planet`, `orbit`, `astronaut`, `rocket`, `nebula`, `star`, `exploration`, `universe`, `astronomy`, `mission`, `satellite`.

