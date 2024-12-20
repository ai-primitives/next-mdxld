import type { NextConfig } from 'next'
import type { Configuration as WebpackConfig } from 'webpack'
import remarkMdxld from 'remark-mdxld'

interface WithMdxldOptions {
  urlImports?: {
    domains?: string[]
    importMap?: Record<string, string>
  }
}

const withMdxld = (nextConfig: NextConfig & WithMdxldOptions = {}) => {
  return {
    ...nextConfig,
    webpack: (config: WebpackConfig, options: any) => {
      // Handle existing webpack config
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options)
      }

      // Initialize module and rules if they don't exist
      config.module = config.module || {}
      config.module.rules = config.module.rules || []

      // Add MDX support with remark-mdxld
      config.module.rules.push({
        test: /\.mdx?$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            options: {
              remarkPlugins: [remarkMdxld],
              providerImportSource: '@mdx-js/react'
            }
          }
        ]
      })

      // Support URL imports
      config.module.rules.push({
        test: /^https?:\/\//,
        loader: 'url-loader',
        options: {
          limit: false,
          publicPath: '/_next/static/chunks/',
          outputPath: 'static/chunks/',
        }
      })

      return config
    }
  }
}

export default withMdxld
export type { WithMdxldOptions }
