import React from 'react'

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
        {children}
      </body>
    </html>
  )
}
