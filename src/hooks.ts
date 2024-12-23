'use client'

import { useState, useEffect } from 'react'
import type { ComponentType } from 'react'
import { resolveComponent } from './components.js'
import { resolveLayout } from './layouts.js'

export interface MDXFrontmatter {
  type: string
  title: string
  author: string
  datePublished: string
  context?: string
  components?: Record<string, string>
  layouts?: Record<string, string>
  [key: string]: unknown
}

export interface MDXComponents {
  components: Record<string, ComponentType>
  layout: ComponentType | null
  isLoading: boolean
  error?: Error
}

/**
 * React hook for resolving MDX components and layout based on frontmatter
 */
export function useMDXComponents(frontmatter: MDXFrontmatter): MDXComponents {
  const [state, setState] = useState<MDXComponents>({
    components: {},
    layout: null,
    isLoading: true
  })

  useEffect(() => {
    if (!frontmatter.type) {
      setState({
        components: {},
        layout: null,
        isLoading: false,
        error: new Error('Missing required frontmatter type')
      })
      return
    }

    const { type, context, components: componentMap, layouts: layoutMap } = frontmatter

    async function resolveComponents() {
      try {
        // Resolve components based on type and context
        const resolvedComponents = await resolveComponent({
          type,
          context,
          components: componentMap
        })

        // Resolve layout based on type and context
        const resolvedLayout = await resolveLayout({
          type,
          context,
          layouts: layoutMap
        })

        setState({
          components: resolvedComponents || {},
          layout: resolvedLayout,
          isLoading: false
        })
      } catch (error) {
        setState({
          components: {},
          layout: null,
          isLoading: false,
          error: error instanceof Error ? error : new Error('Failed to resolve components')
        })
      }
    }

    resolveComponents()
  }, [frontmatter])

  return state
}
