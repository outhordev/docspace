'use client'

import { icons, type LucideProps } from 'lucide-react'

/**
 * Renders any Lucide icon by its kebab-case name (e.g. "book-open", "cpu", "scroll-text").
 *
 * Browse the full icon set at https://lucide.dev/icons
 *
 * Falls back to "file-text" if the icon name is not found.
 */
export default function DynamicIcon({
  name,
  ...props
}: { name: string } & Omit<LucideProps, 'ref'>) {
  // Convert kebab-case to PascalCase: "book-open" → "BookOpen"
  const pascalName = name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  const IconComponent = icons[pascalName as keyof typeof icons]

  if (!IconComponent) {
    const Fallback = icons['FileText']
    return Fallback ? <Fallback {...props} /> : null
  }

  return <IconComponent {...props} />
}

