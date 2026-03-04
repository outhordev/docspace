---
title: Code Blocks
order: 2
description: Syntax highlighting, language support, and copy buttons.
---

## Basic Usage

Wrap code in triple backticks with a language identifier:

````markdown
```typescript
const manifest = getManifest()
```
````

This renders a styled block with **syntax highlighting** (Shiki), a **language label**, and a **copy button**.

## Supported Languages

| Language | Identifier |
|---|---|
| JavaScript | `javascript` / `js` |
| TypeScript | `typescript` / `ts` |
| JSX / TSX | `jsx` / `tsx` |
| HTML / CSS | `html` / `css` |
| JSON / YAML / TOML | `json` / `yaml` / `toml` |
| Python | `python` |
| C# | `csharp` |
| C / C++ | `c` / `cpp` |
| Rust | `rust` |
| Lua | `lua` |
| GDScript | `gdscript` |
| GLSL | `glsl` |
| SQL | `sql` |
| Bash | `bash` / `shell` |
| Markdown | `markdown` |
| Plain text | `text` |

## Examples

```csharp
public class PlayerController : NetworkBehaviour
{
    [SyncVar] private int _currentHealth = 100;
    
    [Server]
    public void TakeDamage(int amount)
    {
        _currentHealth = Mathf.Max(0, _currentHealth - amount);
    }
}
```

```bash
# Build and preview
npm run build
npx serve out
```

## Theme-Aware Highlighting

Code blocks use the **Shiki theme** configured for the current space. For example, `blueprint` uses `github-dark`, while `canvas` uses `github-light`.

When a reader switches themes via the settings modal, code blocks adjust automatically.

## Copy Button

Every code block includes a **Copy** button in its header. Clicking it copies the raw code and briefly shows "Copied!".

> [!TIP]
> The copy button works on all fenced code blocks automatically — no configuration needed.

