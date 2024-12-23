import type { ComponentType } from 'react'
import type { Frontmatter } from './page'
import dynamic from 'next/dynamic'

export interface ComponentResolutionOptions {
  type: string
  [key: string]: unknown
}

export interface BlogPostingProps {
  frontmatter: Frontmatter
  children: React.ReactNode
}

const components: Record<string, ComponentType<BlogPostingProps>> = {
  'https://schema.org/BlogPosting': dynamic(() => import('./components/BlogPosting')),
  'https://schema.org/Article': dynamic(() => import('./components/BlogPosting'))
}

export function resolveComponent(options: ComponentResolutionOptions): ComponentType<BlogPostingProps> {
  const { type } = options
  const component = components[type]
  if (!component) {
    throw new Error(`No component found for type: ${type}`)
  }
  return component
}
