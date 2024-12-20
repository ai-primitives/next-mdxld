export interface MDXLDConfig {
  typography?: {
    className?: string
    darkMode?: 'media' | 'class'
  }
}

export const defaultConfig: MDXLDConfig = {
  typography: {
    className: 'prose dark:prose-invert max-w-none',
    darkMode: 'media'
  }
}
