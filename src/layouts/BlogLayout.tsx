'use client'

import React from 'react'
import type { ReactNode } from 'react'

export interface BlogLayoutProps {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">My Blog</h1>
      </header>
      <main>
        {children}
      </main>
      <footer className="mt-8 text-center text-gray-600">
        © {new Date().getFullYear()} My Blog. All rights reserved.
      </footer>
    </div>
  )
} 