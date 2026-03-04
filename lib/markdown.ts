import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { createHighlighter, type Highlighter } from 'shiki'
import { ThemeName, getThemeConfig, getAllShikiThemes } from './themes'
import type { Root, Element, Text, ElementContent } from 'hast'
import { visit } from 'unist-util-visit'

export interface Heading {
  id: string
  text: string
  level: number
}

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: getAllShikiThemes(),
      langs: [
        'javascript', 'typescript', 'jsx', 'tsx', 'html', 'css', 'json',
        'markdown', 'bash', 'shell', 'python', 'csharp', 'c', 'cpp',
        'yaml', 'toml', 'lua', 'rust', 'gdscript', 'glsl', 'sql', 'text',
      ],
    })
  }
  return highlighterPromise
}

/**
 * Custom rehype plugin for Shiki syntax highlighting.
 * Wraps output in a container with language label and copy button data attributes.
 */
function rehypeShiki(themeName: ThemeName) {
  const shikiTheme = getThemeConfig(themeName).shikiTheme

  return () => async (tree: Root) => {
    const highlighter = await getHighlighter()
    const nodesToProcess: { node: Element; parent: Element; index: number }[] = []

    visit(tree, 'element', (node: Element, index, parent) => {
      if (
        node.tagName === 'pre' &&
        node.children.length === 1 &&
        (node.children[0] as Element).tagName === 'code'
      ) {
        nodesToProcess.push({ node, parent: parent as Element, index: index as number })
      }
    })

    for (const { node, parent, index } of nodesToProcess) {
      const codeEl = node.children[0] as Element
      const className = ((codeEl.properties?.className as string[]) || [])[0] || ''
      const lang = className.replace('language-', '')

      // Skip palette and gradient blocks (handled by other plugins)
      if (['palette', 'gradient'].includes(lang)) continue

      const codeText = getTextContent(codeEl)

      try {
        const highlighted = highlighter.codeToHtml(codeText, {
          lang: lang || 'text',
          theme: shikiTheme,
        })

        const displayLang = lang || 'text'

        // Wrap in a container with language label + copy button placeholder
        const newNode: Element = {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['code-block-wrapper', 'group', 'relative', 'my-4'],
            'data-lang': displayLang,
            'data-code': codeText,
          },
          children: [
            // Language label
            {
              type: 'element',
              tagName: 'div',
              properties: {
                className: ['code-block-header'],
              },
              children: [
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: ['code-lang-label'] },
                  children: [{ type: 'text', value: displayLang }],
                },
                {
                  type: 'element',
                  tagName: 'button',
                  properties: {
                    className: ['code-copy-btn'],
                    'data-copy': codeText,
                    type: 'button',
                    'aria-label': 'Copy code',
                  },
                  children: [{ type: 'text', value: 'Copy' }],
                },
              ],
            } as Element,
            // The highlighted code
            { type: 'raw', value: highlighted } as unknown as ElementContent,
          ],
        }

        if (parent && parent.children) {
          parent.children[index] = newNode
        }
      } catch {
        // If highlighting fails, leave the original node
      }
    }
  }
}

/**
 * Extract text content from a hast element.
 */
function getTextContent(node: Element | Text): string {
  if (node.type === 'text') return (node as Text).value
  if ('children' in node) {
    return (node.children as (Element | Text)[]).map(getTextContent).join('')
  }
  return ''
}

/**
 * Rehype plugin to transform blockquotes with callout syntax.
 *
 * Detects two formats:
 *   1. GitHub-style:  [!NOTE], [!TIP], [!WARNING], [!DANGER]
 *   2. Bold-prefix:   **Note:**, **Tip:**, **Warning:**, **Danger:**
 */
function rehypeCallouts() {
  return (tree: Root) => {
    const nodesToProcess: { node: Element; type: string }[] = []

    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'blockquote') return

      const firstP = node.children.find(
        (c): c is Element => (c as Element).tagName === 'p'
      )
      if (!firstP) return

      // --- Try GitHub-style [!TYPE] on a text node ---
      let type: string | null = null

      const firstText = firstP.children.find(
        (c): c is Text => c.type === 'text'
      )
      if (firstText) {
        const ghMatch = firstText.value.match(/^\[!(NOTE|TIP|WARNING|DANGER)]\s*/)
        if (ghMatch) {
          type = ghMatch[1].toLowerCase()
          firstText.value = firstText.value.replace(ghMatch[0], '')
        }
      }

      // --- Try bold-prefix **Type:** on a <strong> as first child ---
      if (!type) {
        const firstChild = firstP.children[0]
        if (
          firstChild &&
          (firstChild as Element).tagName === 'strong'
        ) {
          const strongEl = firstChild as Element
          const strongText = getTextContent(strongEl)
          const boldMatch = strongText.match(/^(Note|Tip|Warning|Danger):?$/i)
          if (boldMatch) {
            type = boldMatch[1].toLowerCase()
            firstP.children.splice(0, 1)
            const nextChild = firstP.children[0]
            if (nextChild && nextChild.type === 'text') {
              (nextChild as Text).value = (nextChild as Text).value.replace(/^:?\s*/, '')
            }
          }
        }
      }

      if (!type) return
      nodesToProcess.push({ node, type })
    })

    for (const { node, type } of nodesToProcess) {
      const iconMap: Record<string, string> = {
        note: '💡',
        tip: '✅',
        warning: '⚠️',
        danger: '🚫',
      }

      const contentDiv: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['callout-content'] },
        children: [...node.children],
      }

      node.tagName = 'div'
      node.properties = {
        className: [`callout`, `callout-${type}`],
        role: 'alert',
      }

      const iconSpan: Element = {
        type: 'element',
        tagName: 'span',
        properties: { className: ['callout-icon'], 'aria-hidden': 'true' },
        children: [{ type: 'text', value: iconMap[type] || '' }],
      }

      const labelSpan: Element = {
        type: 'element',
        tagName: 'span',
        properties: { className: ['callout-label'] },
        children: [{ type: 'text', value: type.charAt(0).toUpperCase() + type.slice(1) }],
      }

      node.children = [
        {
          type: 'element',
          tagName: 'div',
          properties: { className: ['callout-header'] },
          children: [iconSpan, labelSpan],
        } as Element,
        contentDiv,
      ]
    }
  }
}

/**
 * Rehype plugin to add DaisyUI table classes + wrap in responsive container.
 */
function rehypeTables() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'table') return
      node.properties = {
        ...node.properties,
        className: ['table', 'table-zebra', 'w-full'],
      }

      // Wrap in overflow container
      if (parent && 'children' in parent && typeof index === 'number') {
        const wrapper: Element = {
          type: 'element',
          tagName: 'div',
          properties: { className: ['overflow-x-auto', 'rounded-lg', 'border', 'border-base-300', 'my-4'] },
          children: [node],
        }
        ;(parent as Element).children[index] = wrapper
      }
    })
  }
}


/**
 * Rehype plugin to handle palette code blocks.
 */
function rehypePalette() {
  return (tree: Root) => {
    const nodesToProcess: Element[] = []

    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'pre') return
      const codeEl = node.children[0] as Element | undefined
      if (!codeEl || codeEl.tagName !== 'code') return

      const className = ((codeEl.properties?.className as string[]) || [])[0] || ''
      if (className !== 'language-palette') return

      nodesToProcess.push(node)
    })

    for (const node of nodesToProcess) {
      const codeEl = node.children[0] as Element
      const code = getTextContent(codeEl)
      const swatches: { label: string; color: string }[] = []

      // Match each line: "Label Name   #HEXCODE"
      const lineRegex = /^[ \t]*(.+?)[ \t]+(#[0-9A-Fa-f]{3,8})[ \t]*$/gm
      let m: RegExpExecArray | null
      while ((m = lineRegex.exec(code)) !== null) {
        swatches.push({ label: m[1].trim(), color: m[2] })
      }

      if (swatches.length === 0) continue

      node.tagName = 'div'
      node.properties = {
        className: ['palette-grid'],
        'data-palette': JSON.stringify(swatches),
      }
      node.children = swatches.map(s => {
        const swatch = s as { label: string; color: string }
        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['palette-swatch'], 'data-color': swatch.color },
          children: [
            {
              type: 'element',
              tagName: 'div',
              properties: {
                className: ['palette-swatch-color'],
                style: `background-color: ${swatch.color}`,
              },
              children: [],
            },
            {
              type: 'element',
              tagName: 'div',
              properties: { className: ['palette-swatch-info'] },
              children: [
                {
                  type: 'element',
                  tagName: 'div',
                  properties: { className: ['font-medium', 'text-sm'] },
                  children: [{ type: 'text', value: swatch.label }],
                },
                {
                  type: 'element',
                  tagName: 'div',
                  properties: { className: ['text-xs', 'font-mono', 'opacity-70', 'hex-swatch-code'], 'data-color': swatch.color },
                  children: [{ type: 'text', value: swatch.color }],
                },
              ],
            },
          ],
        } as Element
      })
    }
  }
}

/**
 * Rehype plugin to handle gradient code blocks.
 */
function rehypeGradient() {
  return (tree: Root) => {
    const nodesToProcess: Element[] = []

    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'pre') return
      const codeEl = node.children[0] as Element | undefined
      if (!codeEl || codeEl.tagName !== 'code') return

      const className = ((codeEl.properties?.className as string[]) || [])[0] || ''
      if (className !== 'language-gradient') return

      nodesToProcess.push(node)
    })

    for (const node of nodesToProcess) {
      const codeEl = node.children[0] as Element
      const code = getTextContent(codeEl)
      const match = code.trim().match(/^(#[0-9A-Fa-f]{3,8})\s*→\s*(#[0-9A-Fa-f]{3,8})$/)
      if (!match) continue

      const [, color1, color2] = match

      node.tagName = 'div'
      node.properties = {
        className: ['gradient-preview'],
        style: `background: linear-gradient(to right, ${color1}, ${color2})`,
        'data-gradient': JSON.stringify({ from: color1, to: color2 }),
      }
      node.children = [
        {
          type: 'element',
          tagName: 'span',
          properties: { className: ['hex-swatch-code', 'text-white', 'drop-shadow-md'], 'data-color': color1 },
          children: [{ type: 'text', value: color1 }],
        } as Element,
        {
          type: 'element',
          tagName: 'span',
          properties: { className: ['hex-swatch-code', 'text-white', 'drop-shadow-md'], 'data-color': color2 },
          children: [{ type: 'text', value: color2 }],
        } as Element,
      ]
    }
  }
}

/**
 * Rehype plugin to extract headings for TOC.
 */
function rehypeExtractHeadings(options: { headings: Heading[] }) {
  return () => (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (!['h2', 'h3'].includes(node.tagName)) return
      const id = (node.properties?.id as string) || ''
      const textChildren = node.children.filter((child) => {
        if (child.type === 'element' && (child as Element).properties?.className) {
          const classes = (child as Element).properties!.className as string[]
          if (classes.includes('heading-anchor')) return false
        }
        return true
      })
      const text = textChildren.map(c => getTextContent(c as Element | Text)).join('')
      const level = parseInt(node.tagName.charAt(1), 10)
      options.headings.push({ id, text, level })
    })
  }
}

/**
 * Rehype plugin for inline hex swatches.
 */
function rehypeHexSwatches() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || !('children' in parent)) return
      const parentEl = parent as Element
      // Don't process inside code elements
      if (parentEl.tagName === 'code' || parentEl.tagName === 'pre') return
      // Don't process inside already-processed swatch elements
      if (parentEl.properties?.className &&
          (parentEl.properties.className as string[]).includes('hex-swatch-code')) return

      const hexRegex = /#[0-9A-Fa-f]{3,8}\b/g
      const text = node.value
      const matches = [...text.matchAll(hexRegex)]

      if (matches.length === 0) return

      const newChildren: (Element | Text)[] = []
      let lastIndex = 0

      for (const match of matches) {
        const hex = match[0]
        const start = match.index!

        // Text before the hex
        if (start > lastIndex) {
          newChildren.push({ type: 'text', value: text.slice(lastIndex, start) })
        }

        // Swatch dot + hex code
        newChildren.push({
          type: 'element',
          tagName: 'span',
          properties: {
            className: ['hex-swatch-inline'],
            'data-color': hex,
          },
          children: [
            {
              type: 'element',
              tagName: 'span',
              properties: {
                className: ['hex-swatch-dot'],
                style: `background-color: ${hex}`,
              },
              children: [],
            },
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['hex-swatch-code'], 'data-color': hex },
              children: [{ type: 'text', value: hex }],
            },
          ],
        })

        lastIndex = start + hex.length
      }

      // Remaining text
      if (lastIndex < text.length) {
        newChildren.push({ type: 'text', value: text.slice(lastIndex) })
      }

      // Replace the text node with our new children
      const parentChildren = parentEl.children as (Element | Text)[]
      parentChildren.splice(index as number, 1, ...newChildren)
    })
  }
}

/**
 * Render markdown to HTML with all plugins.
 */
export async function renderMarkdown(
  raw: string,
  themeName: ThemeName,
): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = []

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: { className: ['heading-anchor'], ariaHidden: true },
      content: {
        type: 'element',
        tagName: 'span',
        properties: {},
        children: [{ type: 'text', value: '#' }],
      },
    })
    .use(rehypeCallouts as any)
    .use(rehypePalette as any)
    .use(rehypeGradient as any)
    .use(rehypeTables as any)
    .use(rehypeShiki(themeName) as any)
    .use(rehypeExtractHeadings({ headings }) as any)
    .use(rehypeHexSwatches as any)

  processor.use(rehypeStringify as any, { allowDangerousHtml: true })

  const result = await processor.process(raw)
  return { html: String(result), headings }
}
