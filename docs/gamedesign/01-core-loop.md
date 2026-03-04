---
title: Core Loop
order: 1
description: The fundamental gameplay loop and player progression.
---

## Core Gameplay Loop

The game follows a **three-phase loop** that repeats on both micro (per-session) and macro (per-season) scales.

### Phase 1: Explore

Players navigate the archipelago by boat, discovering new islands, underwater ruins, and floating debris fields.

**Key mechanics:**
- Procedural island generation (seeded by server)
- Fog of war reveals as you explore
- Points of interest marked on the player's personal map
- Environmental storytelling through discoverable logs

### Phase 2: Gather

Resources are collected from explored locations and brought back to the player's base island.

**Resource types:**
| Resource | Source | Use |
|---|---|---|
| Driftwood | Surface debris | Building, fuel |
| Coral Shards | Underwater nodes | Crafting, trade |
| Echo Fragments | Undercurrent zones | Upgrades, lore |
| Salvage | Elder ruins | Advanced crafting |

> [!NOTE]
> Echo Fragments are the premium resource. They're rare, non-tradeable, and required for endgame upgrades. This creates a natural time gate without monetisation.

### Phase 3: Build

Players use gathered resources to expand their base island, craft equipment, and upgrade their vessel.

**Build categories:**
1. **Structures** — housing, workshops, defences
2. **Vessels** — boats, submarines, rafts
3. **Equipment** — tools, weapons, diving gear
4. **Research** — unlocks new recipes and exploration abilities

### Loop Diagram

The core loop flows: **🗺 Explore → ⛏ Gather → 🔨 Build → 🗺 Explore**. Building unlocks new areas to explore, and gathered resources can be traded with NPCs for building materials.

## Session Pacing

A typical 45-minute session should include:
- **5 min** — Planning at base (check map, set goals)
- **15 min** — Exploration voyage
- **10 min** — Resource gathering at destination
- **10 min** — Return trip + building at base
- **5 min** — Review progress, plan next session

> [!TIP]
> Design all activities to be interruptible. Players should be able to save and quit at any point without losing meaningful progress. Auto-save every 30 seconds.

