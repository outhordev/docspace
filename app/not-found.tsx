import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Compass } from 'lucide-react'
import config from '@/docspace.config'
import { getThemeConfig } from '@/lib/themes'
import { getAppIconPath } from '@/lib/appicon'

export default function NotFound() {
  const theme = getThemeConfig(config.defaultTheme)
  const appIconPath = getAppIconPath()

  const bgStyle: React.CSSProperties = {}
  if (config.defaultGradient) {
    bgStyle.background = config.defaultGradient
  }
  if (theme.background) {
    bgStyle.backgroundImage = theme.background
  }

  return (
    <div
      data-theme={config.defaultTheme}
      className="min-h-screen bg-base-100 text-base-content relative overflow-hidden flex flex-col"
      style={bgStyle}
    >
      {theme.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: theme.customCSS }} />
      )}
      {theme.customHTML && (
        <div dangerouslySetInnerHTML={{ __html: theme.customHTML }} />
      )}

      {/* Navbar */}
      <header className="navbar bg-base-200/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-50 px-4">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost gap-2 text-lg font-bold normal-case px-2">
            {appIconPath && (
              <Image src={appIconPath} alt="" width={24} height={24} className="w-6 h-6" />
            )}
            <span className="hidden sm:inline">{config.title}</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto page-enter">
          {/* Animated icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 mb-8">
            <Compass size={48} className="text-primary animate-[spin_8s_linear_infinite]" />
          </div>

          {/* Error code */}
          <h1 className="text-8xl font-bold tracking-tighter mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            404
          </h1>

          {/* Message */}
          <h2 className="text-2xl font-semibold mb-3 drop-shadow-lg">
            Page not found
          </h2>
          <p className="text-base-content/60 mb-10 leading-relaxed drop-shadow-md">
            The page you're looking for doesn't exist or may have been moved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="btn btn-primary gap-2 px-6"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </div>
        </div>
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

