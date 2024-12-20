import React, { type ReactNode } from 'react'
import { useMemo } from 'react'

interface ComponentMap {
  [key: string]: React.ComponentType<any>
}

interface WrapperProps {
  children: ReactNode
}

/**
 * Resolves a component based on the provided type from frontmatter
 * @param type The $type or @type from frontmatter
 * @param components Map of available components
 * @returns The resolved component or null
 */
export function resolveComponent(type: string | undefined, components: ComponentMap): React.ComponentType<any> | null {
  if (!type) return null

  // Support both @ and $ prefixes
  const normalizedType = type.startsWith('@') ? type : `@${type.replace(/^\$/, '')}`
  return components[normalizedType] || components[type] || null
}

/**
 * React hook for resolving components based on frontmatter type
 * @param type The $type or @type from frontmatter
 * @param baseComponents Base component map
 * @returns Enhanced component map with resolved wrapper
 */
export function useComponents(type: string | undefined, baseComponents: ComponentMap): ComponentMap {
  return useMemo(() => {
    const TypeComponent = resolveComponent(type, baseComponents)
    const DefaultWrapper = ({ children }: WrapperProps) => React.createElement(React.Fragment, null, children)
    return {
      ...baseComponents,
      wrapper: TypeComponent || baseComponents.wrapper || DefaultWrapper
    }
  }, [type, baseComponents])
}
