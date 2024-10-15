/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['generativelanguage.googleapis.com'],
  },
  env: {
    GOOGLE_GEMINI_API_KEY: process.env.GOOGLE_GEMINI_API_KEY,
  },
}

module.exports = nextConfig