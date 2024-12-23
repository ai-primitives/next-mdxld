import type { NextConfig } from 'next'
import type { Configuration as WebpackConfig } from 'webpack'
import type { WebpackConfigContext } from 'next/dist/server/config-shared'
import remarkMdxld from './remark-mdxld'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import { createMDXPage, type Frontmatter, type MDXPageComponent } from './page.js'
import { default as BlogLayout } from './layouts/BlogLayout.js'
import { default as BlogPosting } from './components/BlogPosting.js'

const withMdxld = (nextConfig: NextConfig = {}) => {
  return {
    ...nextConfig,
    experimental: {
      ...nextConfig.experimental,
      urlImports: true
    },
    webpack: (config: WebpackConfig, options: WebpackConfigContext): WebpackConfig => {
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options)
      }

      // Configure experiments for URL imports
      config.experiments = {
        ...config.experiments,
        buildHttp: {
          allowedUris: [
            'https://esm.sh/',
            'https://cdn.skypack.dev/',
            'https://unpkg.com/'
          ]
        }
      }

      config.module = config.module || {}
      config.module.rules = config.module.rules || []

      // Add MDX loader configuration
      config.module.rules.push({
        test: /\.mdx?$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            options: {
              remarkPlugins: [
                remarkFrontmatter,
                remarkGfm,
                remarkMdxld
              ],
              providerImportSource: '@mdx-js/react'
            }
          }
        ]
      })

      return config
    }
  }
}

export default withMdxld
export { createMDXPage, remarkMdxld }
export type { Frontmatter, MDXPageComponent }
export { BlogLayout, BlogPosting }
