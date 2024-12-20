# Project Tasks

## Core Implementation

- [x] Initial Setup
  - [x] Configure TypeScript
  - [x] Set up build process
  - [ ] Configure testing environment

- [x] NextJS Plugin Implementation
  - [x] Create withMDXLD plugin
  - [x] Implement configuration options
  - [x] Add contentDirBasePath support

- [ ] MDXLD Integration
  - [ ] Integrate mdxld parser
  - [ ] Handle frontmatter processing
  - [ ] Support $type and $context properties
  - [x] Support URL imports for layouts and components
  - [x] Add API route handlers support
  - [x] Implement middleware integration

- [ ] Component System
  - [ ] Create component resolution system
  - [ ] Implement useMDXComponents hook
  - [ ] Add dynamic component loading
  - [x] Support ESM imports from URLs (e.g., esm.sh)

- [ ] Layout System
  - [ ] Create layout resolution system
  - [ ] Implement default layouts
  - [ ] Support nested layouts
  - [x] Support ESM layout imports

- [ ] API Support
  - [x] Implement route handlers
  - [x] Add CORS middleware
  - [ ] Support API documentation generation
  - [ ] Add request/response validation
  - [ ] Implement authentication middleware

- [ ] Page Generation
  - [ ] Implement dynamic page routing
  - [ ] Add metadata generation
  - [ ] Support static site generation

## Documentation

- [ ] API Documentation
  - [ ] Plugin configuration
  - [ ] Component system
  - [ ] Layout system
  - [ ] Page generation
  - [x] URL imports documentation
  - [x] API route handlers
  - [x] Middleware configuration

- [x] Examples
  - [x] Schema.org BlogPosting example
    - [x] Basic blog setup
    - [x] Custom components integration
    - [x] URL imports configuration
  - [x] mdx.org.ai API example
    - [x] API documentation setup
    - [x] Component integration
    - [x] Layout configuration
    - [x] Route handlers implementation
    - [x] Middleware support
  - [ ] Multi-layout application

## Testing

- [ ] Unit Tests
  - [ ] Parser integration
  - [ ] Component resolution
  - [ ] Layout system
  - [x] URL imports handling
  - [ ] API route handlers
  - [ ] Middleware functionality

- [ ] Integration Tests
  - [ ] Full page generation
  - [ ] Component rendering
  - [ ] Layout application
  - [x] ESM imports validation
  - [ ] API endpoint testing
  - [ ] CORS middleware validation

## Release

- [ ] Package Configuration
  - [x] Update package.json
  - [ ] Configure npm publishing
  - [ ] Set up semantic release

- [ ] CI/CD
  - [ ] Set up GitHub Actions
  - [ ] Configure test workflow
  - [ ] Add release automation
