/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: false,
  },
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
