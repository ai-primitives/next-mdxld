import { describe, it, expect } from 'vitest'
import withMdxld from './index'
import type { WebpackConfigContext } from 'next/dist/server/config-shared'
import type { NextConfig } from 'next'

describe('withMdxld', () => {
  it('should merge user config with defaults', () => {
    const config = withMdxld({
      experimental: {
        urlImports: true
      }
    })

    expect(config.experimental?.urlImports).toBe(true)
    expect(config.webpack).toBeDefined()
  })

  it('should configure webpack', () => {
    const config = withMdxld()
    const context: Partial<WebpackConfigContext> = {
      dir: '.',
      dev: true,
      isServer: false,
      buildId: 'test',
      defaultLoaders: {
        babel: 'babel-loader'
      },
      totalPages: 1,
      webpack: null as any
    }
    const webpackConfig = config.webpack({
      experiments: {},
      module: {
        rules: []
      }
    }, context as WebpackConfigContext)

    expect(webpackConfig.experiments?.buildHttp).toEqual({
      allowedUris: [
        'https://esm.sh/',
        'https://cdn.skypack.dev/',
        'https://unpkg.com/'
      ]
    })
  })
})
