const createMDX = require('@next/mdx')
const remarkMdxld = require('remark-mdxld')

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMdxld],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react'
  }
})

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    urlImports: {
      domains: ['esm.sh', 'cdn.skypack.dev', 'unpkg.com']
    }
  }
})
