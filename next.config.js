/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    subgraph_url: 'https://api.studio.thegraph.com/query/25176/medikai/v0.0.1',
  },
}

module.exports = nextConfig
