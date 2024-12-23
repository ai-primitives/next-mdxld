import React from 'react'
import { readFileSync, readdirSync } from 'fs'
import { join, extname } from 'path'
import remarkMdxld from 'remark-mdxld'
import remarkGfm from 'remark-gfm'
import * as runtime from 'react/jsx-runtime'
import dynamic from 'next/dynamic'
import { compile } from '@mdx-js/mdx'
import { notFound } from 'next/navigation'
import { createElement } from 'react'
import { MDXProvider } from '@mdx-js/react'
import type { MDXContentProps } from './mdx-content'

interface MDXPageProps {
  params: {
    mdxPath?: string[]
  }
}

function getAllMDXFiles(dir: string): string[] {
  const files: string[] = []
  
  try {
    const entries = readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        files.push(...getAllMDXFiles(fullPath))
      } else if (extname(entry.name) === '.mdx') {
        files.push(fullPath)
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error)
  }
  
  return files
}

async function getMDXContent(mdxPath: string[] = []): Promise<MDXContentProps | null> {
  const contentPath = join(process.cwd(), 'content', [...mdxPath].join('/'))
  const fullPath = contentPath.endsWith('.mdx') ? contentPath : `${contentPath}.mdx`
  
  try {
    const source = readFileSync(fullPath, 'utf-8')
    const code = String(await compile(source, {
      remarkPlugins: [remarkGfm, remarkMdxld],
      development: process.env.NODE_ENV === 'development'
    }))
    
    // Create a module scope for evaluation
    const scope = { React, createElement, MDXProvider, ...runtime }
    const fn = new Function(...Object.keys(scope), code)
    const mod = fn(...Object.values(scope))
    
    return {
      content: mod.default,
      frontmatter: mod.frontmatter || {}
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null
    }
    console.error('Error loading MDX:', error)
    return null
  }
}

// Client component for rendering MDX content
const MDXContent = dynamic(() => import('./mdx-content'), { ssr: true })

export async function generateStaticParams() {
  const contentDir = join(process.cwd(), 'content')
  const mdxFiles = getAllMDXFiles(contentDir)
  
  return mdxFiles.map(file => ({
    mdxPath: file
      .replace(contentDir, '')
      .replace(/^\//, '')
      .replace(/\.mdx$/, '')
      .split('/')
      .filter(Boolean)
  }))
}

export const dynamicParams = true

export default async function MDXPage({ params }: MDXPageProps) {
  const mdxContent = await getMDXContent(params.mdxPath)
  
  if (!mdxContent) {
    notFound()
  }
  
  return createElement(MDXContent, mdxContent)
} 