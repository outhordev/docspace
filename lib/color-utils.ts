import chroma from 'chroma-js'

/**
 * Convert a hex color to RGB string.
 */
export function toRGB(hex: string): string {
  const [r, g, b] = chroma(hex).rgb()
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * Convert a hex color to HSL string.
 */
export function toHSL(hex: string): string {
  const [h, s, l] = chroma(hex).hsl()
  const hue = Math.round(isNaN(h) ? 0 : h)
  const sat = Math.round(s * 100)
  const light = Math.round(l * 100)
  return `hsl(${hue}, ${sat}%, ${light}%)`
}

/**
 * Convert a hex color to Unity Color float format.
 */
export function toUnity(hex: string): string {
  const [r, g, b] = chroma(hex).gl()
  const a = chroma(hex).alpha()
  return `new Color(${r.toFixed(3)}f, ${g.toFixed(3)}f, ${b.toFixed(3)}f, ${a.toFixed(0)}f)`
}

/**
 * Convert a hex color to a CSS variable declaration.
 */
export function toCSSVar(hex: string, name?: string): string {
  const varName = name || 'color'
  return `--${varName}: ${hex};`
}

/**
 * Get all copy formats for a hex color.
 */
export function getAllFormats(hex: string): { label: string; value: string }[] {
  const normalizedHex = chroma(hex).hex()
  return [
    { label: 'Hex', value: normalizedHex.toUpperCase() },
    { label: 'RGB', value: toRGB(hex) },
    { label: 'HSL', value: toHSL(hex) },
    { label: 'Unity', value: toUnity(hex) },
    { label: 'CSS Var', value: toCSSVar(normalizedHex.toUpperCase()) },
  ]
}

/**
 * Check if a string is a valid hex color.
 */
export function isValidHex(str: string): boolean {
  try {
    chroma(str)
    return /^#([0-9A-Fa-f]{3,8})$/.test(str)
  } catch {
    return false
  }
}

