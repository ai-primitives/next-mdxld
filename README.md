# next-mdxld

[![npm version](https://badge.fury.io/js/next-mdxld.svg)](https://www.npmjs.com/package/next-mdxld)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A NextJS plugin for MDXLD (MDX with YAML Linked Data frontmatter) that enables component and layout selection based on frontmatter $context and $type.

## Quick Start

```mdx
---
$id: https://example.com/blog/my-blog-post
$type: https://schema.org/BlogPosting
title: My Blog Post
author: John Doe
datePublished: 2024-01-15
---

export layout from 'https://esm.sh/@mdxui/blog/simple'
export components from 'https://esm.sh/@mdxui/shadcn'

# My Blog Post

This content will use the simple blog layout and shadcn components.
```

## Features

- 🚀 NextJS App Router Support
- 📄 MDXLD Frontmatter Processing
- 🎨 Dynamic Component Selection via $type
- 📱 Flexible Layout System via $context
- 🔄 Automatic Page Generation
- 🎯 TypeScript Support

## Installation

```bash
pnpm add next-mdxld
```

## Usage

### 1. Configure next.config.js

```javascript
import { withMDXLD } from 'next-mdxld'

const config = withMDXLD({
  contentDirBasePath: '/',
  // Enable URL imports for components and layouts
  urlImports: true,
  components: {
    // Schema.org components
    'https://schema.org/BlogPosting': 'https://esm.sh/@mdxui/blog/components',
    'https://schema.org/WebSite': 'https://esm.sh/@mdxui/site/components',
    // mdx.org.ai components
    'https://mdx.org.ai/API': 'https://esm.sh/@mdxui/api/components',
    'https://mdx.org.ai/Agent': 'https://esm.sh/@mdxui/agent/components'
  },
  layouts: {
    // Your layout mappings
    Blog: 'https://esm.sh/@mdxui/blog/layouts/default',
    API: 'https://esm.sh/@mdxui/api/layouts/default'
  }
})

export default config
```

### 2. Set up MDX Components

```javascript
import { useMDXComponents } from 'next-mdxld/components'

export function MDXComponents(components) {
  return {
    ...useMDXComponents(),
    ...components
  }
}
```

### 3. Create App Layout

```javascript
import { Layout } from 'next-mdxld/components'

export default function RootLayout({ children }) {
  return (
    <Layout>
      {children}
    </Layout>
  )
}
```

### 4. Set up Dynamic Page Route

```javascript
import { MDXPage } from 'next-mdxld/page'

export default MDXPage
```

### Example MDX Files

#### Schema.org BlogPosting
```mdx
---
$type: https://schema.org/BlogPosting
title: My Technical Blog Post
author: John Doe
datePublished: 2024-01-15
---

# Advanced TypeScript Patterns

This content will be rendered using the BlogPosting component within the Blog layout.
```

#### Schema.org WebSite
```mdx
---
$type: https://schema.org/WebSite
name: My Developer Portfolio
url: https://example.com
---

# Welcome to My Portfolio

This content uses the WebSite component for optimal SEO and structure.
```

#### mdx.org.ai API
```mdx
---
$type: https://mdx.org.ai/API
endpoint: /api/users
method: POST
---

# Create User API

This content will be rendered with API-specific components and documentation layout.
```

#### mdx.org.ai Agent
```mdx
---
$type: https://mdx.org.ai/Agent
tools: ["chat", "search", "code"]
---

# Support Agent

This content will be rendered with Agent-specific components and interaction UI.
```

## Documentation

For detailed documentation, visit [mdxld.org](https://mdxld.org)

## Contributing

Please read our [Contributing Guide](./CONTRIBUTING.md) to learn about our development process.

## License

MIT © [AI Primitives](https://primitives.org.ai)
