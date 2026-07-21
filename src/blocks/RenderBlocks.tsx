import React, { Fragment } from 'react'

import { SectionDivider } from '@/components/SectionDivider'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ColumnsBlock } from '@/blocks/Columns/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { EventsPreviewBlock } from '@/blocks/EventsPreview/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { TextBlockComponent } from '@/blocks/Text/Component'
import { YouTubeEmbedBlock } from '@/blocks/YouTubeEmbed/Component'

const blockComponents = {
  archive: ArchiveBlock,
  columns: ColumnsBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  eventsPreview: EventsPreviewBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  textBlock: TextBlockComponent,
  youtubeEmbed: YouTubeEmbedBlock,
}

export type AnyBlock = { blockType?: string | null }

export const RenderBlocks: React.FC<{
  blocks?: AnyBlock[] | null
  nested?: boolean
}> = (props) => {
  const { blocks, nested } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents] as React.ComponentType<
              Record<string, unknown>
            >

            if (Block) {
              return (
                <Fragment key={index}>
                  {!nested && index > 0 ? <SectionDivider /> : null}
                  <div className="my-16">
                    <Block
                      {...block}
                      disableInnerContainer
                      {...(nested ? { enableGutter: false } : {})}
                    />
                  </div>
                </Fragment>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
