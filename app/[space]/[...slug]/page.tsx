import { notFound } from 'next/navigation'
import { getManifest, getPage, readPageContent } from '@/lib/docs-walker'
import { renderMarkdown } from '@/lib/markdown'
import { getThemeConfig } from '@/lib/themes'
import Shell from '@/components/layout/Shell'
import DocPage from '@/components/docs/DocPage'
import TableOfContents from '@/components/layout/TableOfContents'
import ColorFeatureHydrator from '@/components/docs/ColorFeatureHydrator'
import { getAppIconPath } from '@/lib/appicon'

interface DocPageRouteProps {
  params: Promise<{ space: string; slug: string[] }>
}

export const dynamicParams = false

export function generateStaticParams() {
  const manifest = getManifest()
  const params: { space: string; slug: string[] }[] = []

  for (const space of manifest.spaces) {
    for (const page of space.pages) {
      params.push({ space: space.slug, slug: page.slug.split('/') })
    }
  }

  return params
}

export default async function DocPageRoute({ params }: DocPageRouteProps) {
  const { space: spaceSlug, slug: slugSegments } = await params
  const slug = slugSegments.join('/')
  const manifest = getManifest()
  const result = getPage(spaceSlug, slug)

  if (!result) {
    notFound()
  }

  const { space, page } = result
  const { content, data } = readPageContent(page.filePath)

  // Per-page theme override: frontmatter `theme` takes priority over space theme
  const pageThemeOverride = data.theme as string | undefined
  const effectiveTheme = pageThemeOverride || space.theme
  const { html, headings } = await renderMarkdown(content, effectiveTheme)
  const themeConfig = getThemeConfig(effectiveTheme)

  // Find prev/next pages
  const pageIndex = space.pages.findIndex(p => p.slug === page.slug)
  const prevPage = pageIndex > 0
    ? { slug: space.pages[pageIndex - 1].slug, title: space.pages[pageIndex - 1].title, spaceSlug: space.slug }
    : undefined
  const nextPage = pageIndex < space.pages.length - 1
    ? { slug: space.pages[pageIndex + 1].slug, title: space.pages[pageIndex + 1].title, spaceSlug: space.slug }
    : undefined

  return (
    <Shell
      spaces={manifest.spaces}
      currentSpace={space}
      currentPage={page}
      toc={<TableOfContents headings={headings} />}
      themeStyles={{
        headingFont: themeConfig.headingFont,
        bodyFont: themeConfig.bodyFont,
        background: themeConfig.background,
        gradient: themeConfig.gradient,
        customCSS: themeConfig.customCSS,
        customHTML: themeConfig.customHTML,
        isDark: themeConfig.isDark,
      }}
      pageTheme={pageThemeOverride}
      appIconPath={getAppIconPath()}
    >
      <div data-pagefind-meta={`space:${space.title}`} hidden />
      <div data-pagefind-meta={`theme:${effectiveTheme}`} hidden />
      <DocPage
        html={html}
        title={(data.title as string) || page.title}
        description={data.description as string | undefined}
        lastModified={page.lastModified}
        prevPage={prevPage}
        nextPage={nextPage}
      />
      <ColorFeatureHydrator />
    </Shell>
  )
}

