import React from 'react'
import type { MDXProps } from 'mdx/types'

export interface BlogPostingProps extends MDXProps {
  title: string
  author: string
  datePublished: string
}

export default function BlogPosting({ title, author, datePublished, children }: BlogPostingProps) {
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