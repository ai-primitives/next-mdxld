import React from 'react'
import type { MDXProps } from 'mdx/types'

export interface DefaultLayoutProps extends MDXProps {
  frontmatter: Record<string, any>
  children: React.ReactNode
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  frontmatter
}) => {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <dl className="not-prose mb-8">
        {Object.entries(frontmatter).map(([key, value]) => (
          <div key={key} className="mb-2">
            <dt className="font-bold">{key}</dt>
            <dd className="ml-4">{JSON.stringify(value)}</dd>
          </div>
        ))}
      </dl>
      {children}
    </article>
  )
}
