---
title: Code Blocks
order: 2
description: Syntax highlighting, supported languages, and the copy button.
---

## Basic Usage

Wrap code in triple backticks with a language identifier:

````markdown
```typescript
const greeting = 'Hello, docspace!'
console.log(greeting)
```
````

This renders a styled block with **Shiki syntax highlighting**, a **language label** in the header, and a **copy button**.

## Supported Languages

| Language | Identifier |
|---|---|
| JavaScript | `javascript` or `js` |
| TypeScript | `typescript` or `ts` |
| JSX / TSX | `jsx` / `tsx` |
| HTML | `html` |
| CSS | `css` |
| JSON | `json` |
| YAML | `yaml` |
| TOML | `toml` |
| Python | `python` |
| C# | `csharp` |
| C / C++ | `c` / `cpp` |
| Rust | `rust` |
| Lua | `lua` |
| GDScript | `gdscript` |
| GLSL | `glsl` |
| SQL | `sql` |
| Bash | `bash` or `shell` |
| Markdown | `markdown` |
| Plain text | `text` |

If you omit the language, docspace falls back to plain `text`.

## Examples

```typescript
interface Space {
  slug: string
  title: string
  theme: string
  pages: Page[]
}
```

```python
def build_manifest(docs_dir: str) -> dict:
    """Walk the docs directory and return the full site manifest."""
    spaces = []
    for entry in os.scandir(docs_dir):
        if entry.is_dir():
            spaces.append(parse_space(entry.path))
    return {"spaces": spaces}
```

```bash
npm run build
npx serve out
```

## Theme-Aware Highlighting

Code blocks are highlighted with **dual Shiki themes** — one for dark mode, one for light mode. The correct palette is applied automatically based on the reader's active theme.

For example, a space using the `blueprint` theme (dark, `dracula`) will show `dracula` colors in dark mode and `github-light` in light mode. Switching themes in the settings modal updates code blocks instantly.

## Copy Button

Every fenced code block has a **Copy** button in its header bar. Clicking it copies the raw code to the clipboard and briefly shows a "Copied!" confirmation.

> [!TIP]
> The copy button works automatically on all fenced code blocks — no extra configuration needed.
