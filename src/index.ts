import type { NextConfig } from 'next'
import type { WebpackConfigContext } from 'next/dist/server/config-shared'
import type { Configuration } from 'webpack'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import { resolveComponent, type ComponentResolutionOptions } from './components'
import { resolveLayout, type LayoutResolutionOptions } from './layouts'
import { resolveURLImports, createImportAliases, type URLImportsConfig } from './config'
import { useMDXComponents, type MDXFrontmatter, type MDXComponents } from './hooks'

interface MDXLDConfig extends NextConfig {
  contentDirBasePath?: string
  urlImports?: Partial<URLImportsConfig>
  components?: Record<string, string>
  layouts?: Record<string, string>
  webpack?: (config: Configuration, options: WebpackConfigContext) => Configuration
}

export function withMDXLD(nextConfig: MDXLDConfig = {}) {
  return {
    ...nextConfig,
    webpack: (config: Configuration, options: WebpackConfigContext) => {
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options)
      }

      // Configure URL imports
      const urlImports = resolveURLImports(nextConfig.urlImports)

      // Add trusted domains to webpack config
      config.resolve = config.resolve || {}
      config.resolve.alias = {
        ...config.resolve.alias,
        ...createImportAliases(urlImports)
      }

      config.module = config.module || { rules: [] }
      config.module.rules = config.module.rules || []

      config.module.rules.push({
        test: /\.mdx?$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            options: {
              remarkPlugins: [
                remarkGfm,
                [remarkMdxFrontmatter, {
                  name: 'frontmatter',
                  yaml: {
                    alias: {
                      '@': '$',
                    }
                  }
                }]
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
export { resolveComponent, resolveLayout, useMDXComponents }
export type { ComponentResolutionOptions, LayoutResolutionOptions, MDXLDConfig, URLImportsConfig, MDXFrontmatter, MDXComponents }
