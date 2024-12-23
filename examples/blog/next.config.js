import withMdxld from 'next-mdxld'

const config = withMdxld({
  experimental: {
    urlImports: {
      domains: ['esm.sh', 'cdn.skypack.dev', 'unpkg.com']
    }
  },
  components: {
    // 'https://schema.org/BlogPosting': 'https://esm.sh/@mdxui/blog/components'
  },
  layouts: {
    // Blog: 'https://esm.sh/@mdxui/blog/layouts/default'
  }
})

export default config
