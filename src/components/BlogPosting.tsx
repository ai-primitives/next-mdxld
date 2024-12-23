'use client'

import React from 'react'
import type { ReactNode } from 'react'
import type { Frontmatter } from '../page'

export interface BlogPostingProps {
  children: ReactNode
  frontmatter: Frontmatter
}

export default function BlogPosting({ children, frontmatter }: BlogPostingProps) {
  return (
    <article className="prose lg:prose-xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{frontmatter.title}</h1>
        <div className="text-gray-600">
          <span>By {frontmatter.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={frontmatter.datePublished}>
            {new Date(frontmatter.datePublished).toLocaleDateString()}
          </time>
        </div>
      </header>
      <div className="prose">
        {children}
      </div>
    </article>
  )
} 