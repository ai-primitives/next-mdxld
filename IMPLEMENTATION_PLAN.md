# NextJS Plugin Implementation Plan for MDXLD

## 1. Core Package Structure

```typescript
// next-mdxld/src/index.ts
export interface MDXLDConfig {
  contentDirBasePath?: string
  components?: Record<string, React.ComponentType>
  layouts?: Record<string, React.ComponentType>
}

export function withMDXLD(nextConfig: any = {}, mdxldConfig: MDXLDConfig = {}) {
  // Similar to Nextra's implementation but using mdxld for parsing
}
```

## 2. Implementation Components

### A. Next Config Integration
- Create a plugin similar to Nextra's that processes MDX files
- Use mdxld parser to handle frontmatter with $context and $type
- Support configuration for component and layout mappings

### B. MDX Components System
- Create a component provider that maps $type to components
- Support dynamic component loading based on $context
- Maintain compatibility with existing MDX components

### C. Layout System
- Implement flexible layout system based on $context
- Support default and custom layouts
- Handle metadata and frontmatter properties

### D. Page Routing
- Support dynamic page routing with [[...mdxPath]]
- Handle frontmatter metadata in generateMetadata
- Process MDXLD content during page generation

## 3. Core Features

### Frontmatter Processing
```typescript
// next-mdxld/src/loader.ts
import { parse } from 'mdxld'

export async function processMDXLD(source: string) {
  const { data, content, type, context } = parse(source)
  // Handle component/layout resolution based on type/context
}
```

### Component Resolution
```typescript
// next-mdxld/src/components.ts
export function resolveComponent(type: string, components: Record<string, any>) {
  // Resolve component based on $type
}

export function resolveLayout(context: string, layouts: Record<string, any>) {
  // Resolve layout based on $context
}
```

## 4. Implementation Steps

1. Core Package Setup
   - Set up TypeScript configuration
   - Configure build process
   - Set up testing infrastructure

2. Parser Integration
   - Integrate mdxld parser
   - Handle frontmatter processing
   - Support special properties ($type, $context)

3. Component System
   - Implement component resolution
   - Create context providers
   - Support dynamic imports

4. Layout System
   - Implement layout resolution
   - Support nested layouts
   - Handle metadata propagation

5. Page Generation
   - Implement page generation logic
   - Support static and dynamic routes
   - Handle metadata generation

6. Documentation & Examples
   - Create comprehensive documentation
   - Provide example implementations
   - Include TypeScript types

## 5. Testing Strategy

1. Unit Tests
   - Parser integration
   - Component resolution
   - Layout resolution
   - Route generation

2. Integration Tests
   - Full page generation
   - Component rendering
   - Layout application
   - Metadata handling

3. Example Projects
   - Basic documentation site
   - Blog with custom components
   - Multi-layout application

## 6. Documentation Requirements

1. Installation Guide
2. Configuration Options
3. Component System Documentation
4. Layout System Documentation
5. TypeScript Types Documentation
6. Migration Guide from Nextra
7. Best Practices
8. Example Projects
