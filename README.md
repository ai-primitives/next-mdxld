# @ai-primitives/next-mdxld

[![npm version](https://badge.fury.io/js/%40ai-primitives%2Fnext-mdxld.svg)](https://www.npmjs.com/package/@ai-primitives/next-mdxld)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A NextJS plugin for MDXLD (MDX with YAML Linked Data frontmatter) that enables component and layout selection based on frontmatter $context and $type.

## Features

- 🚀 NextJS App Router Support
- 📄 MDXLD Frontmatter Processing
- 🎨 Dynamic Component Selection via $type
- 📱 Flexible Layout System via $context
- 🔄 Automatic Page Generation
- 🎯 TypeScript Support

## Installation

```bash
pnpm add @ai-primitives/next-mdxld
```

## Usage

### 1. Configure next.config.js

```javascript
import { withMDXLD } from '@ai-primitives/next-mdxld'

const config = withMDXLD({
  contentDirBasePath: '/',
  components: {
    // Your component mappings
  },
  layouts: {
    // Your layout mappings
  }
})

export default config
```

### 2. Set up MDX Components

```javascript
import { useMDXComponents } from '@ai-primitives/next-mdxld/components'

export function MDXComponents(components) {
  return {
    ...useMDXComponents(),
    ...components
  }
}
```

### 3. Create App Layout

```javascript
import { Layout } from '@ai-primitives/next-mdxld/components'

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
import { MDXPage } from '@ai-primitives/next-mdxld/page'

export default MDXPage
```

### Example MDX File

```mdx
---
$type: BlogPost
$context: BlogLayout
title: My First Post
---

# Welcome to My Blog

This content will be rendered using the BlogPost component within the BlogLayout.
```

## Documentation

For detailed documentation, visit [mdxld.org](https://mdxld.org)

## Contributing

Please read our [Contributing Guide](./CONTRIBUTING.md) to learn about our development process.

## License

MIT © [AI Primitives](https://primitives.org.ai)
