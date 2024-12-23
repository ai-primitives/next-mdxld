import { useMDXComponents } from 'next-mdxld/components'

export function MDXComponents(components) {
  return {
    ...useMDXComponents(),
    ...components
  }
}
