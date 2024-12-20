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
  - [ ] Support URL imports for layouts and components

- [ ] Component System
  - [ ] Create component resolution system
  - [ ] Implement useMDXComponents hook
  - [ ] Add dynamic component loading
  - [ ] Support ESM imports from URLs (e.g., esm.sh)

- [ ] Layout System
  - [ ] Create layout resolution system
  - [ ] Implement default layouts
  - [ ] Support nested layouts
  - [ ] Support ESM layout imports

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
  - [ ] URL imports documentation

- [x] Examples
  - [x] Schema.org BlogPosting example
    - [x] Basic blog setup
    - [x] Custom components integration
    - [x] URL imports configuration
  - [x] mdx.org.ai API example
    - [x] API documentation setup
    - [x] Component integration
    - [x] Layout configuration
  - [ ] Multi-layout application

## Testing

- [ ] Unit Tests
  - [ ] Parser integration
  - [ ] Component resolution
  - [ ] Layout system
  - [ ] URL imports handling

- [ ] Integration Tests
  - [ ] Full page generation
  - [ ] Component rendering
  - [ ] Layout application
  - [ ] ESM imports validation

## Release

- [ ] Package Configuration
  - [x] Update package.json
  - [ ] Configure npm publishing
  - [ ] Set up semantic release

- [ ] CI/CD
  - [ ] Set up GitHub Actions
  - [ ] Configure test workflow
  - [ ] Add release automation
