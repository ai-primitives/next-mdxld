import type { NextConfig } from 'next'
import type { Configuration as WebpackConfig } from 'webpack'
import type { WebpackConfigContext } from 'next/dist/server/config-shared'
import remarkMdxld from 'remark-mdxld'
import remarkGfm from 'remark-gfm'
import { resolveComponent, type ComponentResolutionOptions } from './components'
import { resolveLayout, type LayoutResolutionOptions } from './layouts'
import { resolveURLImports, createImportAliases, type MDXLDConfig } from './config'
import { useMDXComponents } from './hooks'

const withMdxld = (nextConfig: NextConfig & MDXLDConfig = {}) => {
  return {
    ...nextConfig,
    experimental: {
      ...nextConfig.experimental,
      urlImports: {
        domains: ['esm.sh', 'cdn.skypack.dev', 'unpkg.com'],
        ...(nextConfig.urlImports?.domains && { domains: nextConfig.urlImports.domains })
      }
    },
    webpack: (config: WebpackConfig, options: WebpackConfigContext): WebpackConfig => {
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options)
      }

      // Configure URL imports
      const urlImports = resolveURLImports(nextConfig.urlImports)

      // Add trusted domains to webpack config
      config.resolve = config.resolve || {}
      config.resolve.alias = {
        ...config.resolve.alias,
        ...(urlImports && createImportAliases(urlImports))
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
                remarkGfm,
                remarkMdxld
              ],
              providerImportSource: '@mdx-js/react'
            }
          }
        ]
      })

      // Add URL loader for remote imports
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
export { resolveComponent, resolveLayout, useMDXComponents }
export type { MDXLDConfig, ComponentResolutionOptions, LayoutResolutionOptions }
