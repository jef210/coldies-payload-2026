import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const staticDir = path.resolve(dirname, '../../public/media')
const postersDir = path.resolve(staticDir, 'posters')

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  endpoints: [
    {
      path: '/:id/poster',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const id = req.routeParams?.id as string

        const doc = await req.payload.findByID({
          collection: 'media',
          id,
          depth: 0,
        })

        if (!doc || !doc.mimeType?.includes('video')) {
          return Response.json({ error: 'Video not found' }, { status: 404 })
        }

        if (!req.formData) {
          return Response.json({ error: 'Expected multipart form data' }, { status: 400 })
        }

        const formData = await req.formData()
        const file = formData.get('file')

        if (!(file instanceof Blob)) {
          return Response.json({ error: 'Missing file' }, { status: 400 })
        }

        fs.mkdirSync(postersDir, { recursive: true })

        const posterFilename = `${id}-poster.jpg`
        const buffer = Buffer.from(await file.arrayBuffer())
        fs.writeFileSync(path.join(postersDir, posterFilename), buffer)

        const posterPath = `/media/posters/${posterFilename}`

        await req.payload.update({
          collection: 'media',
          id,
          data: { posterFilename: posterPath },
          user: req.user,
        })

        return Response.json({ posterFilename: posterPath })
      },
    },
  ],
  fields: [
    {
      name: 'posterFilename',
      type: 'text',
      admin: {
        readOnly: true,
        condition: (data) => Boolean(data?.mimeType?.includes('video')),
        description: 'Managed automatically by the poster picker above.',
      },
    },
    {
      name: 'posterPicker',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/Media/VideoPosterPicker',
        },
      },
    },
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir,
    adminThumbnail: ({ doc }) => {
      const posterFilename = doc?.posterFilename
      return typeof posterFilename === 'string' && posterFilename ? posterFilename : null
    },
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
