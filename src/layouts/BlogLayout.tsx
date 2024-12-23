import React from 'react'
import type { ReactNode } from 'react'

export interface BlogLayoutProps {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
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