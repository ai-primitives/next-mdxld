import createMDX from '@next/mdx'
import remarkMdxld from 'remark-mdxld'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Allow URL imports from trusted domains
  experimental: {
    urlImports: ['https://esm.sh']
  }
}

const withMDX = createMDX({
  // Add markdown plugins here
  options: {
    remarkPlugins: [remarkMdxld],
    rehypePlugins: []
  }
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
