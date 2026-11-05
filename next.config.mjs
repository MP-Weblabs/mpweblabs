/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // /portfolio se renombró a /proyectos: 301 para conservar enlaces y posiciones.
  async redirects() {
    return [
      { source: '/portfolio', destination: '/proyectos', permanent: true },
      { source: '/portfolio/:slug', destination: '/proyectos/:slug', permanent: true },
    ]
  },
}

export default nextConfig
