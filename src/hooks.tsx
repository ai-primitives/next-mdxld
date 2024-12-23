'use client'

import React, { useEffect, useState } from 'react'
import type { ComponentType, ReactNode } from 'react'
import { resolveComponent, type BlogPostingProps } from './components'
import { resolveLayout, type BlogLayoutProps } from './layouts'
import type { Frontmatter } from './page'

export interface UseMDXOptions {
  frontmatter: Frontmatter
  children: ReactNode
}

export function useMDX({ frontmatter, children }: UseMDXOptions): ReactNode {
  const [Component, setComponent] = useState<ComponentType<BlogPostingProps> | null>(null)
  const [Layout, setLayout] = useState<ComponentType<BlogLayoutProps> | null>(null)

  useEffect(() => {
    try {
      const component = resolveComponent({ type: frontmatter.type })
      setComponent(component)
    } catch (error) {
      console.error('Failed to resolve component:', error)
    }
  }, [frontmatter.type])

  useEffect(() => {
    try {
      const layout = resolveLayout({ type: frontmatter.type })
      setLayout(layout)
    } catch (error) {
      console.error('Failed to resolve layout:', error)
    }
  }, [frontmatter.type])

  if (!Component || !Layout) {
    return null
  }

  const LayoutComponent = Layout
  const ContentComponent = Component

  return (
    <LayoutComponent>
      <ContentComponent frontmatter={frontmatter}>
        {children}
      </ContentComponent>
    </LayoutComponent>
  )
} 