'use client'

import React from 'react'
import type { ReactNode } from 'react'
import type { Frontmatter } from './page'
import BlogLayout from './layouts/BlogLayout'
import BlogPosting from './components/BlogPosting'

export interface MDXRendererProps {
  children: ReactNode
  frontmatter: Frontmatter
}

export default function MDXRenderer({ children, frontmatter }: MDXRendererProps) {
  return (
    <BlogLayout>
      <BlogPosting frontmatter={frontmatter}>
        {children}
      </BlogPosting>
    </BlogLayout>
  )
} 