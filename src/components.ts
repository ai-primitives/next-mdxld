import type { ComponentType } from 'react'

export interface ComponentResolutionOptions {
  type: string
  context?: string
  components?: Record<string, string>
}

/**
 * Resolves a component based on $type and $context from MDX frontmatter
 */
export async function resolveComponent({ type, context, components = {} }: ComponentResolutionOptions): Promise<ComponentType | null> {
  // Default component mappings for known types
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
