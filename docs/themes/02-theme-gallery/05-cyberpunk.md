---
title: Cyberpunk
theme: cyberpunk
order: 5
description: A dark theme with neon accents, scrolling scanlines, and glowing orbs.
---

## The Cyberpunk Theme

Cyberpunk is bold and unapologetic. Neon green and hot pink cut through a pitch-dark background, while floating glow orbs and slowly scrolling scanlines create a retro-futuristic atmosphere. The *Space Grotesk* heading font keeps things sharp and modern.

### When to Use It

For content that's meant to feel edgy, futuristic, or just plain fun: game design docs, hacking guides, sci-fi worldbuilding, or any project that doesn't take itself too seriously.

### Colors at a Glance

| Token | Color | Usage |
|---|---|---|
| `primary` | `#00FFC8` | Neon mint — links, active states |
| `secondary` | `#FF0080` | Hot pink — supporting accents |
| `accent` | `#7B61FF` | Electric purple — highlights |
| `base-100` | `#0A0A12` | Near-black — page background |
| `base-content` | `#D0E8E0` | Soft green-white — body text |

### Code Example

```javascript
class NeuralLink {
  #bandwidth = 0
  #latency = Infinity

  constructor(implantId) {
    this.implantId = implantId
    this.connected = false
  }

  async connect(subnet) {
    console.log(`[NEURAL] Establishing link to ${subnet}...`)
    this.#bandwidth = 1024 * Math.random()
    this.#latency = 5 + Math.random() * 15
    this.connected = true
    return { bandwidth: this.#bandwidth, latency: this.#latency }
  }
}
```

### Sample Content

> *The neon signs flicker in the rain-slicked alleyways of Neo-Shibuya. Augmented eyes scan the crowd, parsing facial recognition data in real-time. In this city, information is currency — and everyone's running low on credit.*

The background is built from three layers: colored glow orbs that drift lazily across the viewport, and faint CRT-style scanlines that scroll downward at an almost imperceptible speed. No grid, no noise — just atmosphere.

> [!WARNING]
> Cyberpunk's animated background is more performance-intensive than simpler themes. It's all CSS (no JS), but the multiple animations may be noticeable on very low-end devices.

### Tags

This theme auto-assigns to spaces with content about: `cyber`, `neon`, `hacking`, `punk`, `futuristic`, `dystopia`, `android`, `augmentation`, `synth`, `glitch`, `matrix`, `virtual reality`, `neural`, `implant`.

