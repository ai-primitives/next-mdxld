import { withMDXLD } from 'next-mdxld'

const config = withMDXLD({
  contentDirBasePath: '/content',
  urlImports: {
    domains: ['esm.sh', 'cdn.skypack.dev', 'unpkg.com'],
    importMap: {
      '@mdxui/blog': 'https://esm.sh/@mdxui/blog@latest',
      '@mdxui/shadcn': 'https://esm.sh/@mdxui/shadcn@latest'
    }
  },
  components: {
    'https://schema.org/BlogPosting': 'https://esm.sh/@mdxui/blog/components'
  },
  layouts: {
    Blog: 'https://esm.sh/@mdxui/blog/layouts/default'
  }
})

export default config
