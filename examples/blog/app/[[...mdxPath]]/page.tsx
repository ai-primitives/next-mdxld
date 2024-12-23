import { createMDXPage } from 'next-mdxld'
import { join } from 'path'

export default createMDXPage({
  contentDir: join(process.cwd(), 'content')
})
