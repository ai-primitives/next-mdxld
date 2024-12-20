import { describe, it, expect } from 'vitest'
import withMdxld from './index'

describe('withMdxld', () => {
  it('should return a configuration object', () => {
    const config = withMdxld()
    expect(typeof config).toBe('object')
    expect(typeof config.webpack).toBe('function')
  })
})
