'use client'

import React from 'react'
import { useMDXComponents } from './hooks'
import type { MDXFrontmatter } from './hooks'
import { MDXProvider } from '@mdx-js/react'

export interface MDXContentProps {
  content: React.ComponentType<any>
  frontmatter: MDXFrontmatter
}

export default function MDXContent({ content: Content, frontmatter }: MDXContentProps) {
  const { components } = useMDXComponents(frontmatter)
  
  return (
    <MDXProvider components={components}>
      <Content />
    </MDXProvider>
  )
} 