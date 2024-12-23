import { useMDXComponents } from 'next-mdxld/components'
import type { MDXComponents as MDXComponentsType } from 'mdx/types'

export function MDXComponents(components: MDXComponentsType = {}) {
  return {
    ...useMDXComponents({ type: 'blog' }),
    ...components
  }
}
