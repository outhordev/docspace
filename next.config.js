/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH || '',
  images: {
    unoptimized: true,
  },
  // Silence the IM Fell English font override warning
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
}

module.exports = nextConfig

