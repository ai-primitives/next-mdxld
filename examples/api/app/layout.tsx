import React from 'react'
import { Layout } from 'next-mdxld/components'

export const metadata = {
  title: 'API Documentation - next-mdxld',
  description: 'Example API documentation using next-mdxld'
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
