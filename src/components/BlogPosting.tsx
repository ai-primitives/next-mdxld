import React from 'react'
import { Frontmatter } from '../page'

export interface BlogPostingProps {
  frontmatter: Frontmatter
  children: React.ReactNode
}

export default function BlogPosting({ frontmatter, children }: BlogPostingProps) {
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