import type { Block } from 'payload'

export const YouTubeEmbed: Block = {
  slug: 'youtubeEmbed',
  interfaceName: 'YouTubeEmbedBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'videoId',
      type: 'text',
      required: true,
      admin: {
        description: 'YouTube video ID (example: dQw4w9WgXcQ)',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
    },
  ],
}
