/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    urlImports: {
      allowedUris: [
        'https://esm.sh/**',
        'https://cdn.skypack.dev/**',
        'https://unpkg.com/**'
      ]
    }
  },
  components: {
    // 'https://schema.org/BlogPosting': 'https://esm.sh/@mdxui/blog/components'
  },
  layouts: {
    // Blog: 'https://esm.sh/@mdxui/blog/layouts/default'
  }
}

export default nextConfig
