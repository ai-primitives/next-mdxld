import React from 'react'
import { readFileSync, readdirSync } from 'fs'
import { join, extname } from 'path'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import type { MDXContentProps } from './mdx-content'

interface MDXPageProps {
  params: {
    mdxPath?: string[]
  }
}

interface StaticParam {
  mdxPath: string[]
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

async function getMDXSource(mdxPath: string[] = []): Promise<string | null> {
  const contentDir = join(process.cwd(), 'content')
  let fullPath: string
  
  if (mdxPath.length === 0) {
    // Try to find an index.mdx file
    fullPath = join(contentDir, 'index.mdx')
    try {
      return readFileSync(fullPath, 'utf-8')
    } catch (error) {
      // If no index.mdx exists, try to use the first MDX file
      const files = getAllMDXFiles(contentDir)
      if (files.length > 0) {
        return readFileSync(files[0], 'utf-8')
      }
      return null
    }
  }
  
  // Handle specific file paths
  const contentPath = join(contentDir, mdxPath.join('/'))
  fullPath = contentPath.endsWith('.mdx') ? contentPath : `${contentPath}.mdx`
  
  try {
    return readFileSync(fullPath, 'utf-8')
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

export async function generateStaticParams(): Promise<StaticParam[]> {
  const contentDir = join(process.cwd(), 'content')
  const mdxFiles = getAllMDXFiles(contentDir)
  
  // Add root path
  const paths: StaticParam[] = [{ mdxPath: [] }]
  
  // Add file paths
  paths.push(...mdxFiles.map(file => ({
    mdxPath: file
      .replace(contentDir, '')
      .replace(/^\//, '')
      .replace(/\.mdx$/, '')
      .split('/')
      .filter(Boolean)
  })))
  
  return paths
}

export const dynamicParams = true

export default async function MDXPage({ params }: MDXPageProps) {
  const source = await getMDXSource(params.mdxPath)
  
  if (!source) {
    notFound()
  }
  
  return <MDXContent source={source} />
} 