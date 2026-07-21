import type { Block } from 'payload'

import { CallToAction } from '../CallToAction/config'
import { MediaBlock } from '../MediaBlock/config'
import { TextBlock } from '../Text/config'
import { YouTubeEmbed } from '../YouTubeEmbed/config'

export const Columns: Block = {
  slug: 'columns',
  interfaceName: 'ColumnsBlock',
  labels: {
    plural: 'Columns (Text, Image, Video, or CTA per Column)',
    singular: 'Columns (Text, Image, Video, or CTA per Column)',
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'size',
          type: 'select',
          defaultValue: 'half',
          options: [
            {
              label: 'One Third',
              value: 'oneThird',
            },
            {
              label: 'Half',
              value: 'half',
            },
            {
              label: 'Two Thirds',
              value: 'twoThirds',
            },
            {
              label: 'Full',
              value: 'full',
            },
          ],
        },
        {
          name: 'blocks',
          type: 'blocks',
          blocks: [TextBlock, MediaBlock, YouTubeEmbed, CallToAction],
        },
      ],
    },
  ],
}
