import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'

interface FrontmatterNode {
  type: 'yaml'
  value: string
}

export default function remarkMdxld() {
  return function transformer(tree: Root) {
    let hasFrontmatter = false
    let hasType = false

    visit(tree, 'yaml', (node: FrontmatterNode) => {
      hasFrontmatter = true
      if (node.value.includes('$type:')) {
        hasType = true
      } else {
        // Add default $type if none exists
        node.value = `$type: https://schema.org/Thing\n${node.value}`
      }
    })

    if (!hasFrontmatter) {
      // Create frontmatter node with default $type if no frontmatter exists
      const frontmatterNode: FrontmatterNode = {
        type: 'yaml',
        value: '$type: https://schema.org/Thing'
      }
      tree.children.unshift(frontmatterNode)
    }
  }
} 