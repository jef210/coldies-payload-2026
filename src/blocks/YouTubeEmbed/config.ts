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
        description:
          'YouTube ID / URL OR direct video URL (example: dQw4w9WgXcQ or /videos/home-video-1.mp4)',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
    },
  ],
}
