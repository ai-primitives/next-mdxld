import withMdxld from 'next-mdxld'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true
  }
}

export default withMdxld(nextConfig)
