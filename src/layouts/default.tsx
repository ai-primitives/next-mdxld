import React, { ReactNode } from 'react'
import type { ComponentType } from 'react'

interface DefaultLayoutProps {
  children: ReactNode
  frontmatter: {
    $type?: string
    $context?: string
    [key: string]: any
  }
  components?: {
    [key: string]: ComponentType<any>
  }
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  frontmatter,
  components
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
