import { createMDXPage, mapFrontmatterToMetadata } from 'next-mdxld'
import { join } from 'path'
import type { Metadata } from 'next'

const mdxPage = createMDXPage({
  contentDir: join(process.cwd(), 'content')
})

export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const { getMDXData } = mdxPage
  const data = await getMDXData(params)
  if (!data?.frontmatter) {
    return {}
  }
  return mapFrontmatterToMetadata(data.frontmatter)
}

export default mdxPage
