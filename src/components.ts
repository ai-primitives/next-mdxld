import type { FC } from 'react'
import type { MDXProps } from 'mdx/types'
import { importComponents, resolveImportUrl } from './imports'

export interface ComponentsMap {
  [key: string]: FC<MDXProps>
}

const defaultComponents: ComponentsMap = {}

export async function getComponents(
  componentsUrl?: string,
  allowedDomains?: string[]
): Promise<ComponentsMap> {
  if (!componentsUrl) {
    return defaultComponents
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
