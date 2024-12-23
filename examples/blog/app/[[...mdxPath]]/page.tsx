import { createMDXPage, BlogLayout, BlogPosting } from 'next-mdxld'

export default createMDXPage(BlogLayout, BlogPosting)
export { generateStaticParams } from 'next-mdxld'
