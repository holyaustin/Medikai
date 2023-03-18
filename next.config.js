/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    subgraph_url: 'https://api.studio.thegraph.com/query/31392/medichain-goerli/v0.0.1',
  },
}

module.exports = nextConfig
