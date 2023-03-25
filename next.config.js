/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    subgraph_url: 'https://api.studio.thegraph.com/query/25176/medikai/v0.0.1',
  },
}

module.exports = nextConfig
