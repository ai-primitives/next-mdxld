import { describe, it, expect } from 'vitest'
import withMdxld from './index'
import type { NextConfig } from 'next'
import type { MDXLDConfig } from './config'

describe('withMdxld', () => {
  it('should return a configuration object with typography support', () => {
    const config = withMdxld()
    expect(typeof config).toBe('object')
    expect(typeof config.webpack).toBe('function')
    expect(config.experimental?.urlImports).toBeDefined()
  })

  it('should support URL imports configuration', () => {
    const config = withMdxld({
      urlImports: {
        domains: ['test.com'],
        importMap: {
          '@test/components': 'https://test.com/components'
        }
      }
    })
    expect(config.experimental?.urlImports?.domains).toContain('test.com')
    expect(config.experimental?.urlImports?.domains).toContain('esm.sh')
  })

  it('should preserve existing webpack configuration', () => {
    const baseConfig: NextConfig & MDXLDConfig = {
      webpack: (config) => {
        config.resolve = config.resolve || {}
        config.resolve.alias = { '@test': './test' }
        return config
      }
    }
    const config = withMdxld(baseConfig)
    expect(config.webpack).toBeDefined()
    expect(typeof config.webpack).toBe('function')
  })

  it('should merge URL imports with defaults', () => {
    const config = withMdxld()
    expect(config.experimental?.urlImports?.domains).toContain('esm.sh')
    expect(config.experimental?.urlImports?.domains).toContain('cdn.skypack.dev')
    expect(config.experimental?.urlImports?.domains).toContain('unpkg.com')
  })
})
