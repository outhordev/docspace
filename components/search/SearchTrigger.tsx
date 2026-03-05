'use client'

import { useEffect, useCallback } from 'react'
import { Search } from 'lucide-react'

export default function SearchTrigger() {
  const openSearch = useCallback(() => {
    const modal = document.getElementById('search-modal') as HTMLDialogElement | null
    if (modal) modal.showModal()
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        openSearch()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [openSearch])

  return (
    <>
      <button
        className="btn btn-ghost btn-sm gap-2 group"
        onClick={openSearch}
        aria-label="Search documentation"
      >
        <Search size={15} className="text-base-content/50 group-hover:text-base-content transition-colors" />
        <span className="hidden sm:inline text-base-content/50 text-sm">Search</span>
        <kbd className="kbd kbd-xs hidden sm:inline text-base-content/30">⌘K</kbd>
      </button>
      <SearchModal />
    </>
  )
}

function SearchModal() {
  useEffect(() => {
    const modal = document.getElementById('search-modal') as HTMLDialogElement | null
    if (!modal) return

    const observer = new MutationObserver(() => {
      if (modal.open) {
        setTimeout(() => {
          const input = document.getElementById('search-input') as HTMLInputElement
          if (input) input.focus()
        }, 50)
      }
    })
    observer.observe(modal, { attributes: true, attributeFilter: ['open'] })
    return () => observer.disconnect()
  }, [])

  return (
    <dialog id="search-modal" className="modal modal-top sm:modal-middle">
      <div className="modal-box max-w-2xl p-0 overflow-hidden rounded-xl">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-base-300">
          <Search size={18} className="text-base-content/40 shrink-0" />
          <SearchInput />
          <form method="dialog">
            <kbd className="kbd kbd-sm cursor-pointer hover:bg-base-300 transition-colors">Esc</kbd>
          </form>
        </div>
        <div id="search-results" className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
          <div className="text-center py-12 text-base-content/30 text-sm">
            Type to search across all documentation
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

function SearchInput() {
  useEffect(() => {
    let pagefind: any = null
    let basePath = ''

    async function loadPagefind() {
      try {
        // Detect basePath from Next.js script tags (they always include it)
        const nextScript = document.querySelector('script[src*="/_next/"]') as HTMLScriptElement | null
        basePath = nextScript?.src?.match(/^(.*?)\/_next\//)?.[1]?.replace(window.location.origin, '') || ''
        const url = `${nextScript?.src?.match(/^(.*?)\/_next\//)?.[1] || ''}/pagefind/pagefind.js`
        // @ts-ignore – dynamic import of external module
        pagefind = await import(/* webpackIgnore: true */ url)
        await pagefind.init()
      } catch {
        // Not available in dev
      }
    }
    loadPagefind()

    const input = document.getElementById('search-input') as HTMLInputElement
    const results = document.getElementById('search-results')
    if (!input || !results) return

    let debounceTimer: ReturnType<typeof setTimeout>

    async function handleInput() {
      const query = input.value.trim()
      if (!query) {
        results!.innerHTML = `<div class="text-center py-12 text-base-content/30 text-sm">Type to search across all documentation</div>`
        return
      }
      if (!pagefind) {
        results!.innerHTML = `<div class="text-center py-8 text-base-content/40 text-sm">
          <p>Search index not available.</p>
          <p class="text-xs mt-1">Run <code class="bg-base-200 px-1.5 py-0.5 rounded text-xs">npm run build</code> to generate it.</p>
        </div>`
        return
      }

      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(async () => {
        try {
          const search = await pagefind.search(query)
          if (search.results.length === 0) {
            results!.innerHTML = `
              <div class="text-center py-12">
                <p class="text-base-content/30 text-sm">No results for &ldquo;${query}&rdquo;</p>
              </div>
            `
            return
          }
          const items = await Promise.all(
            search.results.slice(0, 8).map(async (r: any) => r.data())
          )
          results!.innerHTML = items
            .map(
              (item: any) => {
                // Pagefind URLs are relative to site root; prepend basePath for subpath deployments
                const href = basePath + (item.url || '')
                return `
            <a href="${href}"
               class="flex flex-col gap-1 p-3 rounded-lg hover:bg-base-200 transition-colors cursor-pointer"
               onclick="document.getElementById('search-modal').close()">
              <div class="text-sm font-medium text-base-content">${item.meta?.title || 'Untitled'}</div>
              <div class="text-xs text-base-content/50 line-clamp-2">${item.excerpt || ''}</div>
            </a>
          `
              }
            )
            .join('')
        } catch {
          results!.innerHTML = '<p class="text-error text-center py-8 text-sm">Search error</p>'
        }
      }, 150)
    }

    input.addEventListener('input', handleInput)
    return () => {
      input.removeEventListener('input', handleInput)
      clearTimeout(debounceTimer)
    }
  }, [])

  return (
    <input
      id="search-input"
      type="text"
      placeholder="Search documentation..."
      className="flex-1 bg-transparent border-none outline-none text-base-content placeholder:text-base-content/30 text-sm"
      autoComplete="off"
      spellCheck="false"
    />
  )
}
