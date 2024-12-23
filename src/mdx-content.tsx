'use client'

import React, { useEffect, useState } from 'react'
import { useMDXComponents } from './hooks'
import type { MDXFrontmatter } from './hooks'
import { MDXProvider } from '@mdx-js/react'
import { compile } from '@mdx-js/mdx'
import remarkMdxld from 'remark-mdxld'
import remarkGfm from 'remark-gfm'
import * as runtime from 'react/jsx-runtime'

export interface MDXContentProps {
  source: string
}

interface CompiledMDX {
  default: React.ComponentType<any>
  frontmatter?: Record<string, any>
}

const defaultFrontmatter: MDXFrontmatter = {
  type: 'default'
}

export default function MDXContent({ source }: MDXContentProps) {
  const [content, setContent] = useState<CompiledMDX | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function compileMDX() {
      try {
        // First compile to JSX
        const compiled = String(await compile(source, {
          remarkPlugins: [remarkGfm, remarkMdxld],
          development: process.env.NODE_ENV === 'development',
          jsx: true
        }))
        
        // Create a module scope for evaluation
        const scope = { React, ...runtime }
        const fn = new Function(...Object.keys(scope), compiled)
        const mod = fn(...Object.values(scope))
        
        if (typeof mod.default !== 'function') {
          throw new Error('Compiled MDX did not result in a React component')
        }
        
        setContent({
          default: mod.default,
          frontmatter: mod.frontmatter || {}
        })
        setError(null)
      } catch (err) {
        console.error('Error compiling MDX:', err)
        setError(err instanceof Error ? err.message : 'Unknown error compiling MDX')
      }
    }
    
    compileMDX()
  }, [source])
  
  if (error) {
    return <div className="error">Error: {error}</div>
  }
  
  if (!content) {
    return <div>Loading...</div>
  }
  
  const frontmatter: MDXFrontmatter = {
    ...defaultFrontmatter,
    ...(content.frontmatter as Partial<MDXFrontmatter>)
  }
  
  const { components } = useMDXComponents(frontmatter)
  const Content = content.default
  
  try {
    return (
      <MDXProvider components={components}>
        <Content />
      </MDXProvider>
    )
  } catch (err) {
    console.error('Error rendering MDX component:', err)
    return <div className="error">Error rendering MDX content</div>
  }
} 