import type { FC } from 'react'
import type { MDXProps } from 'mdx/types'
import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'
export * from './hooks.js'

export interface ComponentResolutionOptions {
  type: string
  context?: string
  components?: Record<string, string>
}

export interface ComponentsMap {
  [key: string]: FC<MDXProps>
}

const defaultComponents: Record<string, ComponentType> = {
  'blog': dynamic(() => import('./components/BlogPosting')),
  'https://schema.org/BlogPosting': dynamic(() => import('./components/BlogPosting'))
}

export async function resolveComponent({ type, context, components = {} }: ComponentResolutionOptions): Promise<ComponentType | null> {
  try {
    // Use default component if available
    if (defaultComponents[type]) {
      return defaultComponents[type]
    }

    // Use custom component if provided
    if (components[type]) {
      return dynamic(() => import(components[type]))
    }

    return null
  } catch (error) {
    console.error(`Failed to resolve component for type: ${type}`, error)
    return null
  }
}

export function mergeComponents(
  base: ComponentsMap,
  override: ComponentsMap
): ComponentsMap {
  return {
    ...base,
    ...override
  }
}
