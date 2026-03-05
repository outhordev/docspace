'use client'

import { useEffect, useCallback, useRef } from 'react'

/**
 * Client component that hydrates interactive color features.
 * Click on any swatch/hex-code to open a popup with copy options (Hex, Unity, RGB).
 */
export default function ColorFeatureHydrator() {
  const popupRef = useRef<HTMLDivElement | null>(null)

  const removePopup = useCallback(() => {
    if (popupRef.current) {
      popupRef.current.remove()
      popupRef.current = null
    }
  }, [])

  const copyAndFlash = useCallback(async (text: string, itemEl: HTMLElement) => {
    try {
      await navigator.clipboard.writeText(text)
      const valueEl = itemEl.querySelector('.value')
      if (valueEl) {
        const orig = valueEl.textContent
        valueEl.textContent = '✓ Copied!'
        setTimeout(() => { valueEl.textContent = orig }, 1200)
      }
    } catch { /* clipboard not available */ }
  }, [])

  const showPopup = useCallback((hex: string, anchorRect: DOMRect) => {
    removePopup()

    // Normalize hex
    const normalizedHex = hex.toUpperCase()

    // Compute RGB
    const r = parseInt(hex.length > 4 ? hex.slice(1, 3) : hex.slice(1, 2).repeat(2), 16)
    const g = parseInt(hex.length > 4 ? hex.slice(3, 5) : hex.slice(2, 3).repeat(2), 16)
    const b = parseInt(hex.length > 4 ? hex.slice(5, 7) : hex.slice(3, 4).repeat(2), 16)
    const rgbColor = `rgb(${r}, ${g}, ${b})`

    // Compute HSL
    const rf = r / 255, gf = g / 255, bf = b / 255
    const max = Math.max(rf, gf, bf), min = Math.min(rf, gf, bf)
    const l = (max + min) / 2
    let h = 0, s = 0
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      if (max === rf) h = ((gf - bf) / d + (gf < bf ? 6 : 0)) / 6
      else if (max === gf) h = ((bf - rf) / d + 2) / 6
      else h = ((rf - gf) / d + 4) / 6
    }
    const hslColor = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`

    const popup = document.createElement('div')
    popup.className = 'color-copy-popup'

    popup.innerHTML = `
      <div class="color-copy-popup-header">
        <div class="color-copy-popup-swatch" style="background-color: ${hex}"></div>
        <span class="font-mono text-xs text-base-content/70">${normalizedHex}</span>
      </div>
      <div class="color-copy-popup-item" data-copy="${normalizedHex}">
        <span class="label">Hex</span>
        <span class="value">${normalizedHex}</span>
      </div>
      <div class="color-copy-popup-item" data-copy="${rgbColor}">
        <span class="label">RGB</span>
        <span class="value">${rgbColor}</span>
      </div>
      <div class="color-copy-popup-item" data-copy="${hslColor}">
        <span class="label">HSL</span>
        <span class="value">${hslColor}</span>
      </div>
    `

    // Position popup below/above the anchor
    const top = anchorRect.bottom + 6
    const left = Math.min(anchorRect.left, window.innerWidth - 200)

    popup.style.top = `${top}px`
    popup.style.left = `${left}px`

    // If it would overflow bottom, position above
    if (top + 160 > window.innerHeight) {
      popup.style.top = `${anchorRect.top - 160}px`
    }

    const portalTarget = document.getElementById('theme-portal') || document.body
    portalTarget.appendChild(popup)
    popupRef.current = popup

    // Handle clicks on items
    popup.querySelectorAll('.color-copy-popup-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const el = (e.currentTarget as HTMLElement)
        const val = el.dataset.copy || ''
        copyAndFlash(val, el)
        e.stopPropagation()
      })
    })
  }, [removePopup, copyAndFlash])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement

      // Close existing popup if clicking outside
      if (popupRef.current && !popupRef.current.contains(target)) {
        removePopup()
      }

      // Hex swatch dot click
      if (target.classList.contains('hex-swatch-dot')) {
        const parent = target.closest('.hex-swatch-inline') as HTMLElement
        const color = parent?.dataset?.color || target.dataset?.color
        if (color) {
          e.stopPropagation()
          showPopup(color, target.getBoundingClientRect())
        }
        return
      }

      // Hex swatch code click
      if (target.classList.contains('hex-swatch-code')) {
        const color = target.dataset.color || target.textContent
        if (color && color.startsWith('#')) {
          e.stopPropagation()
          showPopup(color, target.getBoundingClientRect())
        }
        return
      }

      // Palette swatch click
      const swatch = target.closest('.palette-swatch') as HTMLElement
      if (swatch) {
        const color = swatch.dataset.color
        if (color) {
          e.stopPropagation()
          showPopup(color, swatch.getBoundingClientRect())
        }
        return
      }
    }

    // Close on scroll or Escape
    function handleDismiss() { removePopup() }
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') removePopup() }

    document.addEventListener('click', handleClick)
    window.addEventListener('scroll', handleDismiss, { passive: true })
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleDismiss)
      document.removeEventListener('keydown', handleKey)
      removePopup()
    }
  }, [removePopup, showPopup])

  return null
}
