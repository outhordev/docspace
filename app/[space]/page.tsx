import { notFound } from 'next/navigation'
import { getManifest, getSpace, readPageContent } from '@/lib/docs-walker'
import { renderMarkdown } from '@/lib/markdown'
import { getThemeConfig } from '@/lib/themes'
import Shell from '@/components/layout/Shell'
import DocPage from '@/components/docs/DocPage'
import TableOfContents from '@/components/layout/TableOfContents'
import ColorFeatureHydrator from '@/components/docs/ColorFeatureHydrator'
import { getAppIconPath } from '@/lib/appicon'

interface SpacePageProps {
  params: Promise<{ space: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  const manifest = getManifest()
  return manifest.spaces.map(s => ({ space: s.slug }))
}

export default async function SpacePage({ params }: SpacePageProps) {
  const { space: spaceSlug } = await params
  const manifest = getManifest()
  const space = getSpace(spaceSlug)

  if (!space) notFound()

  const themeConfig = getThemeConfig(space.theme)
  const themeStyles = {
    headingFont: themeConfig.headingFont,
    bodyFont: themeConfig.bodyFont,
    background: themeConfig.background,
    gradient: themeConfig.gradient,
    customCSS: themeConfig.customCSS,
    customHTML: themeConfig.customHTML,
    isDark: themeConfig.isDark,
  }

  if (space.pages.length > 0) {
    const firstPage = space.pages[0]
    const { content, data } = readPageContent(firstPage.filePath)

    // Per-page theme override: frontmatter `theme` takes priority over space theme
    const pageThemeOverride = data.theme as string | undefined
    const effectiveTheme = pageThemeOverride || space.theme
    const { html, headings } = await renderMarkdown(content, effectiveTheme)

    // If this page overrides the theme, rebuild themeStyles from the page theme
    const effectiveThemeConfig = pageThemeOverride ? getThemeConfig(effectiveTheme) : null
    const effectiveThemeStyles = effectiveThemeConfig ? {
      headingFont: effectiveThemeConfig.headingFont,
      bodyFont: effectiveThemeConfig.bodyFont,
      background: effectiveThemeConfig.background,
      gradient: effectiveThemeConfig.gradient,
      customCSS: effectiveThemeConfig.customCSS,
      customHTML: effectiveThemeConfig.customHTML,
      isDark: effectiveThemeConfig.isDark,
    } : themeStyles

    const nextPage = space.pages.length > 1
      ? { slug: space.pages[1].slug, title: space.pages[1].title, spaceSlug: space.slug }
      : undefined

    return (
      <Shell
        spaces={manifest.spaces}
        currentSpace={space}
        currentPage={firstPage}
        toc={<TableOfContents headings={headings} />}
        themeStyles={effectiveThemeStyles}
        pageTheme={pageThemeOverride}
        appIconPath={getAppIconPath()}
      >
        <div data-pagefind-meta={`space:${space.title}`} hidden />
        <div data-pagefind-meta={`theme:${effectiveTheme}`} hidden />
        <DocPage
          html={html}
          title={(data.title as string) || firstPage.title}
          description={data.description as string | undefined}
          lastModified={firstPage.lastModified}
          nextPage={nextPage}
        />
        <ColorFeatureHydrator />
      </Shell>
    )
  }

  return (
    <Shell spaces={manifest.spaces} currentSpace={space} themeStyles={themeStyles} appIconPath={getAppIconPath()}>
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold mb-4">{space.title}</h1>
        {space.description && (
          <p className="text-base-content/60 text-lg mb-4">{space.description}</p>
        )}
        <p className="text-base-content/50">
          No pages yet. Add <code className="bg-base-300 px-2 py-0.5 rounded">.md</code> files
          to <code className="bg-base-300 px-2 py-0.5 rounded">docs/{space.slug}/</code> to get started.
        </p>
      </div>
    </Shell>
  )
}
