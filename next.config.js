/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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

