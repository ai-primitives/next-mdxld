import { readFileSync, readdirSync } from 'fs'
import { join, extname } from 'path'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMdxld from 'remark-mdxld'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import { compileMDX } from 'next-mdx-remote/rsc'

interface MDXPageProps {
  params: {
    mdxPath?: string[]
  }
}

interface StaticParam {
  mdxPath: string[]
}

interface Frontmatter {
  type: string
  title: string
  author: string
  datePublished: string
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

function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">My Blog</h1>
        </div>
      </nav>
      <main className="container mx-auto py-8">
        {children}
      </main>
      <footer className="bg-gray-100 py-8 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          © {new Date().getFullYear()} My Blog. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function BlogPosting({ frontmatter, children }: { frontmatter: Frontmatter, children: React.ReactNode }) {
  const { title, author, datePublished } = frontmatter

  return (
    <article className="prose lg:prose-xl mx-auto px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <div className="text-gray-600">
          <span>By {author}</span>
          <span className="mx-2">•</span>
          <time dateTime={datePublished}>
            {new Date(datePublished).toLocaleDateString()}
          </time>
        </div>
      </header>
      <div className="mdx-content">
        {children}
      </div>
    </article>
  )
}

export default async function MDXPage({ params }: MDXPageProps) {
  const source = await getMDXSource(params.mdxPath)
  
  if (!source) {
    notFound()
  }

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          // remarkMdxld
        ]
      }
    }
  })

  if (!frontmatter || !frontmatter.title) {
    throw new Error('Missing required frontmatter')
  }

  return (
    <BlogLayout>
      <BlogPosting frontmatter={frontmatter}>
        {content}
      </BlogPosting>
    </BlogLayout>
  )
}
