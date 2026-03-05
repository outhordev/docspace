---
title: Arcane
theme: arcane
icon: moon
order: 1
description: A dark theme with amber tones and a mystical, ancient feel.
---

## The Arcane Theme

Arcane draws from old-world aesthetics — warm amber tones on deep parchment-dark backgrounds. The serif heading font (*IM Fell English*) lends a manuscript quality to titles and section headers.

### When to Use It

This theme suits content with a narrative or historical character: worldbuilding documents, lore compendiums, RPG campaign notes, or any writing that benefits from a touch of gravitas.

### Colors at a Glance

```palette
Primary (Amber)         #D97706
Accent (Golden)         #F59E0B
Base 100 (Background)   #1C1410
Base Content (Text)     #E8D5B0
```

### Code Example

```typescript
interface Grimoire {
  name: string
  spells: Spell[]
  school: 'evocation' | 'abjuration' | 'necromancy'
}

function castSpell(grimoire: Grimoire, index: number): void {
  const spell = grimoire.spells[index]
  console.log(`Casting ${spell.name} from the school of ${grimoire.school}`)
}
```

### Sample Content

> *The archive stretches back centuries, its shelves bowed under the weight of accumulated knowledge. Each volume tells a story — not just in its text, but in the foxing of its pages, the fading of its ink, the pressed flowers left as bookmarks by readers long forgotten.*

The Arcane theme captures this feeling through its restrained palette and classical typography. Headings feel like chapter titles; body text reads like well-set prose.

> [!NOTE]
> Arcane uses the `vesper` Shiki theme for code blocks, which provides warm syntax colors that complement the amber palette.

### Tags

This theme auto-assigns to spaces with content about: `lore`, `worldbuilding`, `narrative`, `story`, `fantasy`, `magic`, `mythology`, `history`, `quest`, `ancient`, `legend`, `rpg`, `dungeon`, `chronicle`.

