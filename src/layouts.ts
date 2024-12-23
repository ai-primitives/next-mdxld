import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'

export interface LayoutResolutionOptions {
  type: string
  [key: string]: unknown
}

export interface BlogLayoutProps {
  children: React.ReactNode
}

const layouts: Record<string, ComponentType<BlogLayoutProps>> = {
  'https://schema.org/Blog': dynamic(() => import('./layouts/BlogLayout')),
  'blog': dynamic(() => import('./layouts/BlogLayout'))
}

export function resolveLayout(options: LayoutResolutionOptions): ComponentType<BlogLayoutProps> {
  const { type } = options
  const layout = layouts[type]
  if (!layout) {
    throw new Error(`No layout found for type: ${type}`)
  }
  return layout
}
