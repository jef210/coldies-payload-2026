import React from 'react'

import type { TextBlock as TextBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export const TextBlockComponent: React.FC<TextBlockProps> = ({ enableLink, link, richText }) => {
  return (
    <div>
      {richText && <RichText data={richText} enableGutter={false} />}
      {enableLink && <CMSLink {...link} />}
    </div>
  )
}
