import type { FC } from 'react'
import type { MDXProps } from 'mdx/types'
import type { DefaultLayoutProps } from './layouts/default'

export interface ImportMap {
  layouts: Record<string, string>
  components: Record<string, string>
}

export interface ImportCache {
  layouts: Record<string, FC<DefaultLayoutProps>>
  components: Record<string, Record<string, FC<MDXProps>>>
}

export const importCache: ImportCache = {
  layouts: {},
  components: {}
}

export async function importLayout(url: string): Promise<FC<DefaultLayoutProps>> {
  if (importCache.layouts[url]) {
    return importCache.layouts[url]
  }

  const module = await import(/* @vite-ignore */ url)
  const layout = module.default || module
  importCache.layouts[url] = layout
  return layout
}

export async function importComponents(url: string): Promise<Record<string, FC<MDXProps>>> {
  if (importCache.components[url]) {
    return importCache.components[url]
  }

  const module = await import(/* @vite-ignore */ url)
  const components: Record<string, FC<MDXProps>> = module
  if (!importCache.components[url]) {
    importCache.components[url] = {}
  }
  importCache.components[url] = components
  return components
}

export function resolveImportUrl(url: string, allowedDomains?: string[]): string {
  if (!url.startsWith('http')) {
    return url
  }

  const urlObj = new URL(url)
  if (allowedDomains && !allowedDomains.includes(urlObj.hostname)) {
    throw new Error(`Domain ${urlObj.hostname} not allowed for imports`)
  }

  return url
}
