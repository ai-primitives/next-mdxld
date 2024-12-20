import type { FC } from 'react'
import type { MDXProps } from 'mdx/types'
import type { ComponentType } from 'react'
import { importComponents, resolveImportUrl } from './imports'

export interface ComponentResolutionOptions {
  type: string
  context?: string
  components?: Record<string, string>
}

export interface ComponentsMap {
  [key: string]: FC<MDXProps>
}

const defaultComponents: Record<string, string> = {
  'https://schema.org/BlogPosting': 'https://esm.sh/@mdxui/blog/components/BlogPosting',
  'https://schema.org/WebSite': 'https://esm.sh/@mdxui/site/components/Website',
  'https://mdx.org.ai/API': 'https://esm.sh/@mdxui/api/components/API',
  'https://mdx.org.ai/Agent': 'https://esm.sh/@mdxui/agent/components/Agent'
}

// Context-specific component mappings
const contextComponents: Record<string, Record<string, string>> = {
  'https://mdx.org.ai/docs': {
    'https://schema.org/BlogPosting': 'https://esm.sh/@mdxui/docs/components/BlogPosting',
    'https://mdx.org.ai/API': 'https://esm.sh/@mdxui/docs/components/API'
  }
}

export async function resolveComponent({ type, context, components = {} }: ComponentResolutionOptions): Promise<ComponentType | null> {
  try {
    // Try context-specific component first
    if (context && contextComponents[context]?.[type]) {
      const module = await import(contextComponents[context][type])
      return module.default || null
    }

    // Merge user-provided components with defaults, giving precedence to user components
    const componentMap = {
      ...defaultComponents,
      ...components
    }

    // Attempt to resolve component from map
    const componentUrl = componentMap[type]
    if (!componentUrl) return null

    // Dynamic import of component from URL
    const module = await import(componentUrl)
    return module.default || null
  } catch (error) {
    console.error(`Failed to resolve component for type: ${type}`, error)
    return null
  }
}

export async function getComponents(
  componentsUrl?: string,
  allowedDomains?: string[]
): Promise<ComponentsMap> {
  if (!componentsUrl) {
    return {}
  }

  const resolvedUrl = resolveImportUrl(componentsUrl, allowedDomains)
  return importComponents(resolvedUrl)
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
