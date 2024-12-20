import type { ComponentType } from 'react'

export interface LayoutResolutionOptions {
  type: string
  context?: string
  layouts?: Record<string, string>
}

/**
 * Resolves a layout based on $type and $context from MDX frontmatter
 */
export async function resolveLayout({ type, context, layouts = {} }: LayoutResolutionOptions): Promise<ComponentType | null> {
  // Default layout mappings for known types
  const defaultLayouts: Record<string, string> = {
    'https://schema.org/BlogPosting': 'https://esm.sh/@mdxui/blog/layouts/default',
    'https://schema.org/WebSite': 'https://esm.sh/@mdxui/site/layouts/default',
    'https://mdx.org.ai/API': 'https://esm.sh/@mdxui/api/layouts/default',
    'https://mdx.org.ai/Agent': 'https://esm.sh/@mdxui/agent/layouts/default'
  }

  // Context-specific layout mappings
  const contextLayouts: Record<string, Record<string, string>> = {
    'https://mdx.org.ai/docs': {
      'https://schema.org/BlogPosting': 'https://esm.sh/@mdxui/docs/layouts/blog',
      'https://mdx.org.ai/API': 'https://esm.sh/@mdxui/docs/layouts/api'
    }
  }

  try {
    // Try context-specific layout first
    if (context && contextLayouts[context]?.[type]) {
      const module = await import(contextLayouts[context][type])
      return module.default || null
    }

    // Merge user-provided layouts with defaults, giving precedence to user layouts
    const layoutMap = {
      ...defaultLayouts,
      ...layouts
    }

    // Attempt to resolve layout from map
    const layoutUrl = layoutMap[type]
    if (!layoutUrl) return null

    // Dynamic import of layout from URL
    const module = await import(layoutUrl)
    return module.default || null
  } catch (error) {
    console.error(`Failed to resolve layout for type: ${type}`, error)
    return null
  }
}
