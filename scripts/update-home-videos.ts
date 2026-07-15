import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

type LayoutBlock = Record<string, unknown>

const defaultVideoUrls = [
  '/videos/home-video-1.mp4',
  '/videos/home-video-2.mp4',
  '/videos/home-video-3.mp4',
]
const videoUrls = (process.env.HOME_VIDEO_URLS || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean)

const topVideoUrls = videoUrls.length >= 1 ? videoUrls : defaultVideoUrls

const topVideoBlocks: LayoutBlock[] = [
  {
    blockType: 'content',
    columns: [
      {
        size: 'full',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Featured Videos',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h2',
                version: 1,
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Recent Coldies video highlights, pinned to the top of the homepage.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
    ],
  },
  ...topVideoUrls.slice(0, 3).map((videoId, index) => ({
    blockType: 'youtubeEmbed',
    heading: `Video ${index + 1}`,
    videoId,
    caption: `Top video slot ${index + 1}`,
  })),
]

const isOldTopVideoBlock = (block: LayoutBlock) => {
  if (block.blockType === 'youtubeEmbed') {
    const heading = typeof block.heading === 'string' ? block.heading : ''
    const caption = typeof block.caption === 'string' ? block.caption : ''

    return /^Video [1-3]$/.test(heading) || /^Top video slot [1-3]$/.test(caption)
  }

  if (block.blockType === 'content') {
    return JSON.stringify(block).includes('Featured Videos')
  }

  return false
}

async function run() {
  const payload = await getPayload({ config })

  const homePageResult = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    limit: 1,
    depth: 0,
  })

  const homePage = homePageResult.docs[0]

  if (!homePage) {
    throw new Error('Home page not found in database')
  }

  const existingLayout = Array.isArray(homePage.layout) ? homePage.layout : []
  const cleanedLayout = existingLayout.filter(
    (block) => !isOldTopVideoBlock(block as unknown as LayoutBlock),
  )

  const updatedPage = await payload.update({
    collection: 'pages',
    id: homePage.id,
    data: {
      layout: [...topVideoBlocks, ...cleanedLayout],
    },
    context: { disableRevalidate: true },
    depth: 0,
  })

  console.log(
    JSON.stringify(
      {
        pageId: updatedPage.id,
        slug: updatedPage.slug,
        addedTopVideos: topVideoUrls.slice(0, 3),
        layoutCount: updatedPage.layout?.length || 0,
      },
      null,
      2,
    ),
  )

  await payload.db.destroy?.()
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
