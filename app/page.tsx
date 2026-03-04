import { getManifest } from '@/lib/docs-walker'
import { getThemeConfig } from '@/lib/themes'
import { BookOpen, FolderOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ScrollText, Cpu, Palette, Newspaper } from 'lucide-react'
import config from '@/manifold.config'

const ICON_MAP: Record<string, React.ReactNode> = {
  'scroll-text': <ScrollText size={20} />,
  'cpu': <Cpu size={20} />,
  'palette': <Palette size={20} />,
  'book-open': <BookOpen size={20} />,
  'newspaper': <Newspaper size={20} />,
}

export default function HomePage() {
  const manifest = getManifest()
  const totalPages = manifest.spaces.reduce((sum, s) => sum + s.pages.length, 0)
  const homeTheme = getThemeConfig(config.homeTheme)

  // Single-space redirect: skip landing page when there's only one space
  if (config.singleSpaceRedirect && manifest.spaces.length === 1) {
    redirect(`/${manifest.spaces[0].slug}`)
  }

  const bgStyle: React.CSSProperties = {}
  if (config.homeGradient) {
    bgStyle.background = config.homeGradient
  }
  if (homeTheme.background) {
    bgStyle.backgroundImage = homeTheme.background
  }

  return (
    <div data-theme={config.homeTheme} className="min-h-screen bg-base-100 text-base-content relative overflow-hidden flex flex-col"
      style={bgStyle}>

      {/* Inject theme custom CSS + HTML */}
      {homeTheme.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: homeTheme.customCSS }} />
      )}
      {homeTheme.customHTML && (
        <div dangerouslySetInnerHTML={{ __html: homeTheme.customHTML }} />
      )}

      {/* Navbar */}
      <header className="navbar bg-black/20 border-b border-white/5 sticky top-0 z-50 backdrop-blur-md px-4">
        <div className="navbar-start">
          <a href="/" className="btn btn-ghost gap-2 text-lg font-bold normal-case px-2">
            <span className="text-primary">📚</span>
            <span className="drop-shadow-lg">{config.title}</span>
          </a>
        </div>
        <div className="navbar-end gap-1">
          <div className="text-xs text-base-content/40">
            <kbd className="kbd kbd-xs">Ctrl+K</kbd> search
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 page-enter flex-1">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl font-bold mb-5 tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
            {config.title}
          </h1>
          <p className="text-base text-base-content/70 max-w-md mx-auto leading-relaxed drop-shadow-md">
            {manifest.spaces.length} spaces · {totalPages} pages
          </p>
        </div>

        {manifest.spaces.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5 p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-base-200/30 mb-6">
              <FolderOpen size={32} className="text-base-content/50" />
            </div>
            <h2 className="text-2xl font-bold mb-3 drop-shadow-lg">No documentation yet</h2>
            <p className="text-base-content/60 max-w-md mx-auto mb-6 drop-shadow-md">
              Create a <code className="bg-base-200 px-2 py-0.5 rounded border border-base-300 text-sm">docs/</code> folder
              and add Markdown files to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {manifest.spaces.map(space => {
              const lastModified = space.pages.reduce((latest, page) => {
                if (!page.lastModified) return latest
                if (!latest) return page.lastModified
                return page.lastModified > latest ? page.lastModified : latest
              }, '' as string)
              const formattedDate = lastModified
                ? new Date(lastModified).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : null

              return (
                <Link
                  key={space.slug}
                  href={`/${space.slug}`}
                  className="group block rounded-xl border border-white/10 hover:border-white/20 bg-black/25 hover:bg-black/35 backdrop-blur-md transition-all duration-300 p-5 shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="p-2.5 rounded-lg bg-white/5 text-base-content/60 group-hover:text-primary group-hover:bg-primary/15 transition-colors shrink-0">
                      {ICON_MAP[space.icon] || <BookOpen size={20} />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h2 className="text-base font-semibold text-base-content group-hover:text-primary transition-colors truncate drop-shadow-sm">
                          {space.title}
                        </h2>
                        <span className="text-xs text-base-content/40 font-mono shrink-0">
                          {space.pages.length}p
                        </span>
                      </div>
                      {space.description && (
                        <p className="text-sm text-base-content/55 mt-0.5 truncate drop-shadow-sm">
                          {space.description}
                        </p>
                      )}
                    </div>

                    {/* Meta + arrow */}
                    <div className="flex items-center gap-3 shrink-0">
                      {formattedDate && (
                        <span className="text-xs text-base-content/35 hidden sm:block">{formattedDate}</span>
                      )}
                      <ArrowRight size={16} className="text-base-content/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6 mt-auto bg-black/10 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-base-content/35">
          {config.footerText}
        </div>
      </footer>
    </div>
  )
}
