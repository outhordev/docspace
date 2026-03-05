'use client'

import Link from 'next/link'
import Image from 'next/image'
import SearchTrigger from '../search/SearchTrigger'
import SettingsModal, { useContentWidth } from './SettingsModal'
import { useThemeOverride } from './ThemeToggle'
import SpaceSwitcher from './SpaceSwitcher'
import type { Space } from '@/lib/docs-walker'
import config from '@/docspace.config'

interface HomeNavbarProps {
  spaces: Space[]
  appIconPath?: string | null
}

export default function HomeNavbar({ spaces, appIconPath }: HomeNavbarProps) {
  const [, setThemeOverride] = useThemeOverride()
  const [, setContentWidth] = useContentWidth()

  return (
    <header className="navbar bg-base-200/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-50 px-4">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost gap-2 text-lg font-bold normal-case px-2">
          {appIconPath && (
            <Image src={appIconPath} alt="" width={24} height={24} className="w-6 h-6" />
          )}
          <span className="hidden sm:inline">{config.title}</span>
        </Link>
      </div>
      <div className="navbar-end gap-1">
        <SearchTrigger />
        <SettingsModal onThemeChange={setThemeOverride} onWidthChange={setContentWidth} />
        <SpaceSwitcher spaces={spaces} />
      </div>
    </header>
  )
}

