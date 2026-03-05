---
title: Cyberpunk
theme: cyberpunk
icon: moon
order: 5
description: A dark theme with neon accents, scrolling scanlines, and glowing orbs.
---

## The Cyberpunk Theme

Cyberpunk is bold and unapologetic. Neon green and hot pink cut through a pitch-dark background, while floating glow orbs and slowly scrolling scanlines create a retro-futuristic atmosphere. The *Space Grotesk* heading font keeps things sharp and modern.

### When to Use It

For content that's meant to feel edgy, futuristic, or just plain fun: game design docs, hacking guides, sci-fi worldbuilding, or any project that doesn't take itself too seriously.

### Colors at a Glance

```palette
Primary (Neon Mint)     #00FFC8
Secondary (Hot Pink)    #FF0080
Accent (Purple)         #7B61FF
Base 100 (Background)   #0A0A12
Base Content (Text)     #D0E8E0
```

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

The background is built from separate layers: colored glow orbs that drift lazily across the viewport in their own container, and faint CRT-style scanlines layered independently on top. The scanlines use `mix-blend-mode: screen` so they interact with the glows without merging into a grid.

> [!WARNING]
> Cyberpunk's animated background is more performance-intensive than simpler themes. It's all CSS (no JS), but the multiple animations may be noticeable on very low-end devices.

### Tags

This theme auto-assigns to spaces with content about: `cyber`, `neon`, `hacking`, `punk`, `futuristic`, `dystopia`, `android`, `augmentation`, `synth`, `glitch`, `matrix`, `virtual reality`, `neural`, `implant`.

