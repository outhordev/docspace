import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import config from '@/docspace.config'
import { getGoogleFontsURL } from '@/lib/themes'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

// Collect all fonts declared by theme JSON files
const themeFontsURL = getGoogleFontsURL()

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  icons: {
    icon: config.favicon,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={inter.variable}
    >
      <head>
        {/* Preconnect for faster Google Fonts loading */}
        {themeFontsURL && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="stylesheet" href={themeFontsURL} />
          </>
        )}
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Blocking script: read theme preference before first paint to prevent flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              var t = localStorage.getItem('docspace-theme-override');
              if (t && (t === 'dark' || t === 'light' || t === 'custom')) {
                document.documentElement.setAttribute('data-theme-override', t);
              }
            } catch(e) {}
          })();
        `}} />
        {children}
      </body>
    </html>
  )
}
