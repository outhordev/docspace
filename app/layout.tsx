import type { Metadata } from 'next'
import { Inter, IM_Fell_English, JetBrains_Mono, Lora, Bitter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import config from '@/manifold.config'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const imFellEnglish = IM_Fell_English({ weight: '400', subsets: ['latin'], variable: '--font-heading-arcane' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-heading-blueprint' })
const lora = Lora({ subsets: ['latin'], variable: '--font-heading-canvas' })
const bitter = Bitter({ subsets: ['latin'], variable: '--font-heading-scroll' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading-dispatch' })

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
      className={`${inter.variable} ${imFellEnglish.variable} ${jetbrainsMono.variable} ${lora.variable} ${bitter.variable} ${spaceGrotesk.variable}`}
    >
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
