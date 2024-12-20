/**
 * Default configuration for URL imports in next-mdxld
 */
export const defaultConfig = {
  urlImports: {
    domains: ['esm.sh', 'cdn.skypack.dev', 'unpkg.com'],
    importMap: {
      '@mdxui/blog': 'https://esm.sh/@mdxui/blog@latest',
      '@mdxui/api': 'https://esm.sh/@mdxui/api@latest',
      '@mdxui/shadcn': 'https://esm.sh/@mdxui/shadcn@latest'
    }
  }
}

export interface URLImportsConfig {
  domains: string[]
  importMap: Record<string, string>
}

/**
 * Validates and merges URL imports configuration with defaults
 */
export function resolveURLImports(config?: Partial<URLImportsConfig>): URLImportsConfig {
  if (!config) return defaultConfig.urlImports

  return {
    domains: [...new Set([...defaultConfig.urlImports.domains, ...(config.domains || [])])],
    importMap: {
      ...defaultConfig.urlImports.importMap,
      ...(config.importMap || {})
    }
  }
}

/**
 * Creates webpack resolve aliases from import map
 */
export function createImportAliases(config: URLImportsConfig): Record<string, string> {
  return Object.entries(config.importMap).reduce((aliases, [key, value]) => {
    aliases[key] = value
    return aliases
  }, {} as Record<string, string>)
}
