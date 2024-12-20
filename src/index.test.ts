import { describe, it, expect } from 'vitest'
import { withMDXLD, type MDXLDConfig } from './index'
import type { Configuration } from 'webpack'
import type { WebpackConfigContext } from 'next/dist/server/config-shared'

describe('withMDXLD', () => {
  it('should return a valid Next.js config object', () => {
    const baseConfig: MDXLDConfig = { reactStrictMode: true }
    const mdxConfig = withMDXLD(baseConfig)

    expect(mdxConfig).toHaveProperty('webpack')
    expect(mdxConfig).toHaveProperty('reactStrictMode', true)
    expect(mdxConfig.experimental?.urlImports).toBeDefined()
  })

  it('should preserve existing webpack config if present', () => {
    const baseConfig: MDXLDConfig = {
      webpack: (config: Configuration): Configuration => {
        config.resolve = config.resolve || {}
        config.resolve.alias = { '@test': './test' }
        return config
      }
    }
    const mdxConfig = withMDXLD(baseConfig)

    expect(mdxConfig.webpack).toBeDefined()
    expect(typeof mdxConfig.webpack).toBe('function')
  })
})
