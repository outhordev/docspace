/** @type {import('tailwindcss').Config} */

// Load theme files at build time
const fs = require('fs')
const path = require('path')

function loadDaisyUIThemes() {
  const themesDir = path.join(__dirname, 'themes')
  const themes = []

  // Built-in dark
  themes.push({
    dark: {
      'primary': '#6C63FF',
      'primary-content': '#E0E0E0',
      'secondary': '#4A4458',
      'secondary-content': '#E0E0E0',
      'accent': '#FF6584',
      'accent-content': '#1a1a2e',
      'neutral': '#2A2A3E',
      'neutral-content': '#CCCCDD',
      'base-100': '#1a1a2e',
      'base-200': '#222238',
      'base-300': '#2A2A42',
      'base-content': '#CCCCDD',
      'info': '#3B82F6',
      'success': '#22C55E',
      'warning': '#EAB308',
      'error': '#EF4444',
    },
  })

  // Built-in light
  themes.push({
    light: {
      'primary': '#4F46E5',
      'primary-content': '#FFFFFF',
      'secondary': '#7C3AED',
      'secondary-content': '#FFFFFF',
      'accent': '#EC4899',
      'accent-content': '#FFFFFF',
      'neutral': '#374151',
      'neutral-content': '#F9FAFB',
      'base-100': '#FFFFFF',
      'base-200': '#F9FAFB',
      'base-300': '#F3F4F6',
      'base-content': '#1F2937',
      'info': '#3B82F6',
      'success': '#22C55E',
      'warning': '#EAB308',
      'error': '#EF4444',
    },
  })

  // Load custom themes from /themes/*.json
  if (fs.existsSync(themesDir)) {
    const files = fs.readdirSync(themesDir).filter(f => f.endsWith('.json'))
    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(themesDir, file), 'utf-8'))
        const name = file.replace('.json', '')
        if (data.colors) {
          themes.push({ [name]: data.colors })
        }
      } catch { /* skip malformed */ }
    }
  }

  return themes
}

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: loadDaisyUIThemes(),
  },
}
