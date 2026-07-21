import React from 'react'

import type { ColumnsBlock as ColumnsBlockProps } from '@/payload-types'

import { RenderBlocks, type AnyBlock } from '@/blocks/RenderBlocks'
import { cn } from '@/utilities/ui'

const colsSpanClasses = {
  full: '12',
  half: '6',
  oneThird: '4',
  twoThirds: '8',
}

export const ColumnsBlock: React.FC<ColumnsBlockProps> = ({ columns }) => {
  return (
    <div className="container my-16" data-reveal="up">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { size, blocks } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <RenderBlocks blocks={blocks as AnyBlock[] | null | undefined} nested />
              </div>
            )
          })}
      </div>
    </div>
  )
}
