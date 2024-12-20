import React from 'react'
import { Layout } from 'next-mdxld/components'

export const metadata = {
  title: 'Blog Example - next-mdxld',
  description: 'Example blog using next-mdxld with Schema.org BlogPosting'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
