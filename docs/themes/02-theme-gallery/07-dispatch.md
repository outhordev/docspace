---
title: Dispatch
theme: dispatch
icon: sun
order: 7
description: A clean light theme with warm stone tones and orange accents.
---

## The Dispatch Theme

Dispatch has the feel of a well-designed news bulletin or project update. Clean stone backgrounds, bold orange accents, and *Space Grotesk* headings create an efficient, action-oriented reading experience. The grid-pattern background adds subtle structure.

### When to Use It

Built for devlogs, changelogs, release notes, sprint reports, roadmaps, and any content that's about progress, updates, and shipping things.

### Colors at a Glance

```palette
Primary (Orange)        #EA580C
Accent (Bright Orange)  #F97316
Base 100 (Background)   #FAFAF9
Base Content (Text)     #1C1917
```

### Code Example

```yaml
# release-notes.yml
version: 2.4.0
date: 2026-03-01
highlights:
  - Per-page theme overrides via frontmatter
  - Content-aware auto-theme assignment
  - New Theme Gallery documentation space

breaking_changes: []

contributors:
  - name: "Core Team"
    commits: 47
```

### Sample Content

> *This sprint we shipped three major features and closed 23 bugs. The new theme system landed ahead of schedule thanks to the simplified JSON format. Performance benchmarks show a 12% improvement in static build times after the markdown pipeline refactor.*

Dispatch's orange accent draws the eye to links and interactive elements — perfect for content where readers need to quickly scan for action items and key information.

> [!TIP]
> Dispatch pairs well with structured content: numbered lists, tables, and status badges all look sharp against its clean background.

### Tags

This theme auto-assigns to spaces with content about: `devlog`, `production`, `pipeline`, `update`, `changelog`, `release`, `sprint`, `roadmap`, `milestone`, `progress`, `report`, `blog`, `news`, `announcement`.

