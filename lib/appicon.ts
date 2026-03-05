import fs from 'fs'
import path from 'path'

const APPICON_DIR = path.join(process.cwd(), 'public', 'appicon')
const SUPPORTED_EXTENSIONS = ['.svg', '.png', '.ico', '.jpg', '.jpeg', '.webp']

/**
 * Detect an app icon in public/appicon/.
 * Returns the public URL path (e.g. '/appicon/icon.png') or null if none found.
 */
export function getAppIconPath(): string | null {
  if (!fs.existsSync(APPICON_DIR)) return null

  const files = fs.readdirSync(APPICON_DIR)
  for (const ext of SUPPORTED_EXTENSIONS) {
    const match = files.find(f => f.toLowerCase().endsWith(ext))
    if (match) return `/appicon/${match}`
  }

  return null
}

/**
 * Get the MIME type for a favicon based on file extension.
 */
export function getIconMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  switch (ext) {
    case '.svg': return 'image/svg+xml'
    case '.png': return 'image/png'
    case '.ico': return 'image/x-icon'
    case '.jpg':
    case '.jpeg': return 'image/jpeg'
    case '.webp': return 'image/webp'
    default: return 'image/png'
  }
}

