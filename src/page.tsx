import React from 'react'
import type { ComponentType } from 'react'
import { join } from 'path'
import { readFile } from 'fs/promises'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkMdxld from 'remark-mdxld'
import { resolveComponent } from './components'
import { resolveLayout } from './layouts'

export interface Frontmatter {
  type: string
  title: string
  author: string
  datePublished: string
  [key: string]: unknown
}

export interface MDXPageProps {
  params: {
    mdxPath?: string[]
  }
}

export type MDXPageComponent = ComponentType<MDXPageProps>

export async function createMDXPage(options: {
  contentDir: string
  components?: Record<string, ComponentType>
}): Promise<MDXPageComponent> {
  const { contentDir, components = {} } = options

  async function getMDXSource(params: { mdxPath?: string[] }) {
    try {
      const mdxPath = params.mdxPath || []
      const filePath = join(contentDir, ...mdxPath) + '.mdx'
      const source = await readFile(filePath, 'utf-8')

      const { content, frontmatter } = await compileMDX<Frontmatter>({
        source,
        components,
        options: {
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [
              remarkGfm,
              remarkMdxld as any
            ]
          }
        }
      })

      const Component = resolveComponent({ type: frontmatter.type })
      const Layout = resolveLayout({ type: frontmatter.type })

      return (
        <Layout>
          <Component frontmatter={frontmatter}>
            {content}
          </Component>
        </Layout>
      )
    } catch (error) {
      console.error('Failed to get MDX source:', error)
      return null
    }
  }

  return async function MDXPage({ params }: MDXPageProps) {
    const content = await getMDXSource(params)
    return content
  }
} 