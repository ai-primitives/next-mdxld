import React from 'react'
import type { ComponentType } from 'react'
import type { Metadata } from 'next'
import { join } from 'path'
import { readFile } from 'fs/promises'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkMdxld from './remark-mdxld'
import remarkFrontmatter from 'remark-frontmatter'
import dynamic from 'next/dynamic.js'

const MDXRenderer = dynamic(() => import('./mdx-renderer'), { ssr: true })

export interface Frontmatter {
  type: string
  title: string
  author: string
  datePublished: string
  description?: string
  [key: string]: unknown
}

export interface MDXPageParams {
  params: {
    mdxPath?: string[]
  }
}

export function mapFrontmatterToMetadata(frontmatter: Frontmatter): Record<string, any> {
  const metadata: Record<string, any> = {}

  // Basic metadata
  if (frontmatter.title) {
    metadata.title = frontmatter.title
  }
  if (frontmatter.description) {
    metadata.description = frontmatter.description
  }

  // OpenGraph metadata
  const openGraph: Record<string, any> = {}
  if (frontmatter.title) {
    openGraph.title = frontmatter.title
  }
  if (frontmatter.description) {
    openGraph.description = frontmatter.description
  }
  if (frontmatter.datePublished) {
    openGraph.article = {
      ...openGraph.article,
      publishedTime: frontmatter.datePublished
    }
  }
  if (Object.keys(openGraph).length > 0) {
    metadata.openGraph = openGraph
  }

  // Twitter metadata (commonly used alongside OpenGraph)
  const twitter: Record<string, any> = {}
  if (frontmatter.title) {
    twitter.title = frontmatter.title
  }
  if (frontmatter.description) {
    twitter.description = frontmatter.description
  }
  if (Object.keys(twitter).length > 0) {
    metadata.twitter = twitter
  }

  return metadata
}

export interface MDXPageProps {
  params: {
    mdxPath?: string[]
  }
}

export type MDXPageComponent = ComponentType<MDXPageProps>

export async function getMDXData(contentDir: string, params: { mdxPath?: string[] }, components: Record<string, ComponentType> = {}) {
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
            remarkFrontmatter,
            remarkGfm,
            remarkMdxld
          ]
        }
      }
    })

    return { content, frontmatter }
  } catch (error) {
    console.error('Failed to get MDX data:', error)
    return null
  }
}

export async function generateMetadata({ params }: MDXPageParams, contentDir: string): Promise<Metadata> {
  const data = await getMDXData(contentDir, params)
  if (!data?.frontmatter) {
    return {}
  }
  return mapFrontmatterToMetadata(data.frontmatter)
}

export async function createMDXPage(options: {
  contentDir: string
  components?: Record<string, ComponentType>
}): Promise<MDXPageComponent> {
  const { contentDir, components = {} } = options

  async function getMDXSource(params: { mdxPath?: string[] }) {
    const data = await getMDXData(contentDir, params, components)
    if (!data) return null
    
    return (
      <MDXRenderer frontmatter={data.frontmatter}>
        {data.content}
      </MDXRenderer>
    )
  }

  return async function MDXPage({ params }: MDXPageProps) {
    const content = await getMDXSource(params)
    return content
  }
}          