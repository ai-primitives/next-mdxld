import type { FC } from 'react'
import type { DefaultLayoutProps } from './default'
import { DefaultLayout } from './default'
import { importLayout, resolveImportUrl } from '../imports'

export { DefaultLayout }
export type { DefaultLayoutProps }

export const defaultLayouts: Record<string, FC<DefaultLayoutProps>> = {
  'https://schema.org/Thing': DefaultLayout,
  'default': DefaultLayout
}

export async function getLayout(
  type: string,
  layoutUrl?: string,
  allowedDomains?: string[]
): Promise<FC<DefaultLayoutProps>> {
  if (layoutUrl) {
    const resolvedUrl = resolveImportUrl(layoutUrl, allowedDomains)
    return importLayout(resolvedUrl)
  }

  return defaultLayouts[type] || defaultLayouts.default
}
