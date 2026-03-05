---
title: Site Config
order: 1
description: The docspace.config.ts file and all available options.
---

## Config File

All site-wide settings live in `docspace.config.ts` at the project root:

```typescript
const config = {
  title: 'docspace',
  description: 'A file-driven documentation site for projects.',
  footerText: 'docspace',
  defaultTheme: 'deepspace',
  defaultGradient: 'linear-gradient(135deg, #0B0D17 0%, #1A1040 30%, #0D1B2A 60%, #0B0D17 100%)',
  singleSpaceRedirect: true,
  numericPrefixInPageSlugs: false,
  numericPrefixInSpaceSlugs: false,
  contentWidthOptions: [
    { value: '55ch',  label: 'Narrow',     description: 'Compact, very readable' },
    { value: '65ch',  label: 'Default',    description: 'Balanced for prose' },
    { value: '80ch',  label: 'Wide',       description: 'Good for code-heavy pages' },
    { value: '100ch', label: 'Extra Wide', description: 'Maximum reading area' },
  ],
}

export default config
```

## Option Reference

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `'docspace Docs'` | Site name — navbar, browser tab, and landing hero |
| `description` | `string` | `'A file-driven...'` | HTML meta description |
| `footerText` | `string` | `'docspace Docs'` | Text shown in the footer on every page |
| `defaultTheme` | `string` | `'deepspace'` | Theme for the landing page, 404, and standalone pages |
| `defaultGradient` | `string` | CSS gradient | Background gradient for default-themed pages; `''` to disable |
| `singleSpaceRedirect` | `boolean` | `true` | Skip the landing page when only one space exists |
| `numericPrefixInPageSlugs` | `boolean` | `false` | Keep `01-` prefixes in page URLs |
| `numericPrefixInSpaceSlugs` | `boolean` | `false` | Keep `01-` prefixes in space URLs |
| `contentWidthOptions` | `array` | 4 presets | Width choices shown in the reader settings modal |

## App Icon

To add a favicon and navbar icon, place an image file in `public/appicon/`:

```
public/
  appicon/
    icon.png      ← or .svg, .ico, .jpg, .webp
```

docspace auto-detects the file at build time and uses it as:
- The **browser favicon** (tab icon)
- The **navbar logo** (next to the site title)

If no file is found in `public/appicon/`, no icon is shown — just the site title.

## Content Width Options

The `contentWidthOptions` array defines which width presets appear in the settings modal (⚙ icon in the navbar). Each entry has three fields:

| Field | Description |
|---|---|
| `value` | Any valid CSS width — `'65ch'`, `'720px'`, `'48rem'`, etc. |
| `label` | Display name shown in the modal |
| `description` | Short helper text below the label |

The **first entry** in the array is the default for new visitors. You can add, remove, or reorder entries freely. For example, a code-heavy project might prefer wider defaults:

```typescript
contentWidthOptions: [
  { value: '80ch',  label: 'Standard', description: 'Good for mixed content' },
  { value: '100ch', label: 'Wide',     description: 'Comfortable for code' },
  { value: '120ch', label: 'Full',     description: 'Maximum reading area' },
],
```

## Single-Space Mode

When `singleSpaceRedirect` is `true` and there is only one space in `docs/`, the root URL `/` redirects directly into that space. The landing page reappears automatically once you add a second space.

## URL Slugs

By default, docspace strips numeric prefixes (like `01-`, `02-`) from URLs. This keeps URLs clean while still letting you use prefixes to control sort order in the file system.

| File / Folder | Default slug | With prefix enabled |
|---|---|---|
| `01-overview.md` | `/space/overview` | `/space/01-overview` |
| `02-getting-started/` | `/getting-started` | `/02-getting-started` |

To keep prefixes in URLs, set either or both options to `true`:

```typescript
numericPrefixInPageSlugs: true,   // 01-overview.md → /space/01-overview
numericPrefixInSpaceSlugs: true,  // 01-guides/ → /01-guides
```

> [!NOTE]
> Numeric prefixes are always used for ordering regardless of these settings. These options only affect how the URL slug is generated.

## Default Theme

The `defaultTheme` setting controls the visual style of the landing page, the 404 page, and any other standalone pages. Use any theme name from `themes/`, or the built-in `'dark'` / `'light'`.

> [!TIP]
> The `defaultGradient` overlays on top of the theme. Set it to an empty string `''` if you want the theme's default `base-100` background instead.
