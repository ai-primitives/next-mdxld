export interface MDXLDConfig {
  typography?: {
    className?: string
    darkMode?: 'media' | 'class'
  }
  urlImports?: {
    domains: string[]
    importMap: Record<string, string>
  }
}

const defaultUrlImports = {
  domains: ['esm.sh', 'cdn.skypack.dev', 'unpkg.com'],
  importMap: {
    '@mdxui/blog': 'https://esm.sh/@mdxui/blog@latest',
    '@mdxui/api': 'https://esm.sh/@mdxui/api@latest',
    '@mdxui/shadcn': 'https://esm.sh/@mdxui/shadcn@latest'
  }
}

export const defaultConfig: MDXLDConfig = {
  typography: {
    className: 'prose dark:prose-invert max-w-none',
    darkMode: 'media'
  },
  urlImports: defaultUrlImports
}

export function resolveURLImports(config?: Partial<MDXLDConfig['urlImports']>): MDXLDConfig['urlImports'] {
  const baseConfig = { ...defaultUrlImports }

  if (!config) return baseConfig

  return {
    domains: [...new Set([...baseConfig.domains, ...(config.domains || [])])],
    importMap: {
      ...baseConfig.importMap,
      ...(config.importMap || {})
    }
  }
}

export function createImportAliases(config: NonNullable<MDXLDConfig['urlImports']>): Record<string, string> {
  return Object.entries(config.importMap).reduce((aliases, [key, value]) => {
    aliases[key] = value
    return aliases
  }, {} as Record<string, string>)
}
