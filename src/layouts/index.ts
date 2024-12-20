import type { FC } from 'react'
import { DefaultLayout, DefaultLayoutProps } from './default'

export { DefaultLayout }

export const defaultLayouts: Record<string, FC<DefaultLayoutProps>> = {
  'https://schema.org/Thing': DefaultLayout,
  'default': DefaultLayout
}
