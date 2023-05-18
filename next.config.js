/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/:path*`,
      },
    ]
  },
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
