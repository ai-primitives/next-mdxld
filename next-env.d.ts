/// <reference types="next" />
/// <reference types="@mdx-js/react" />

declare module '*.mdx' {
  import type { ComponentType } from 'react'

  export const frontmatter: Record<string, unknown>

  const MDXComponent: ComponentType
  export default MDXComponent
}
