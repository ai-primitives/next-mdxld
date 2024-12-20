import React from 'react'
import type { ComponentType, ReactNode } from 'react'
import { useMDXComponents as baseUseMDXComponents } from '@mdx-js/react'

interface WrapperProps {
  children: ReactNode
  frontmatter?: Record<string, unknown>
}

export function useMDXComponents(components: Record<string, ComponentType<any>>) {
  return {
    ...baseUseMDXComponents(components),
    // Add custom components here
    wrapper: ({ children, frontmatter }: WrapperProps) => (
      <article className="prose dark:prose-invert max-w-none">
        {children}
      </article>
    )
  }
}
