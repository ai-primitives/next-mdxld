import React from 'react'
import type { MDXComponents } from 'mdx/types'
import { defaultLayouts } from './layouts'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children, frontmatter }) => {
      const Layout = frontmatter?.$type ?
        defaultLayouts[frontmatter.$type] || defaultLayouts.default :
        defaultLayouts.default

      return <Layout frontmatter={frontmatter}>{children}</Layout>
    },
    ...components
  }
}
