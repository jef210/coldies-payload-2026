import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'highImpact',
      label: 'Type',
      admin: {
        description:
          'Full Background works for either a photo or a video — pick it for the main landing hero.',
      },
      options: [
        {
          label: 'No Hero',
          value: 'none',
        },
        {
          label: 'Full Background (Photo or Video)',
          value: 'highImpact',
        },
        {
          label: 'Featured Media Card',
          value: 'mediumImpact',
        },
        {
          label: 'Text Only',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
        description: 'A photo or a video both work here — pick whichever from your Media library.',
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
