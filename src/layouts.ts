import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'

export interface LayoutResolutionOptions {
  type: string
  context?: string
  layouts?: Record<string, string>
}

const defaultLayouts: Record<string, ComponentType> = {
  'blog': dynamic(() => import('./layouts/BlogLayout')),
  'https://schema.org/BlogPosting': dynamic(() => import('./layouts/BlogLayout'))
}

/**
 * Resolves a layout based on type and context from MDX frontmatter
 */
export async function resolveLayout({ type, context, layouts = {} }: LayoutResolutionOptions): Promise<ComponentType | null> {
  try {
    // Use default layout if available
    if (defaultLayouts[type]) {
      return defaultLayouts[type]
    }

    // Use custom layout if provided
    if (layouts[type]) {
      return dynamic(() => import(layouts[type]))
    }

    return null
  } catch (error) {
    console.error(`Failed to resolve layout for type: ${type}`, error)
    return null
  }
}
