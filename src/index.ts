import type { NextConfig } from 'next'
import type { Configuration as WebpackConfig } from 'webpack'
import type { WebpackConfigContext } from 'next/dist/server/config-shared'
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
    webpack: (config: WebpackConfig, options: WebpackConfigContext): WebpackConfig => {
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options)
      }

      config.module = config.module || {}
      config.module.rules = config.module.rules || []

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
