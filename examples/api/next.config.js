import { withMDXLD } from 'next-mdxld'

const config = withMDXLD({
  contentDirBasePath: '/content',
  urlImports: {
    domains: ['esm.sh', 'cdn.skypack.dev', 'unpkg.com'],
    importMap: {
      '@mdxui/api': 'https://esm.sh/@mdxui/api@latest',
      '@mdxui/shadcn': 'https://esm.sh/@mdxui/shadcn@latest'
    }
  },
  components: {
    'https://mdx.org.ai/API': 'https://esm.sh/@mdxui/api/components'
  },
  layouts: {
    API: 'https://esm.sh/@mdxui/api/layouts/default'
  },
  experimental: {
    serverActions: true
  }
})

export default config
