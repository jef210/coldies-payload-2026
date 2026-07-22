import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const text = (value: string, bold = false) => ({
  type: 'text',
  detail: 0,
  format: bold ? 1 : 0,
  mode: 'normal' as const,
  style: '',
  text: value,
  version: 1,
})

const heading = (value: string, tag: 'h2' | 'h3') => ({
  type: 'heading',
  children: [text(value)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  tag,
  version: 1,
})

const paragraph = (children: unknown[]) => ({
  type: 'paragraph',
  children,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  version: 1,
})

const link = (label: string, url: string, newTab = true) => ({
  type: 'link',
  version: 3,
  fields: {
    linkType: 'custom' as const,
    url,
    newTab,
  },
  children: [text(label)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
})

const richText = (children: unknown[]) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

async function run() {
  const payload = await getPayload({ config })

  // 1. Upload the placeholder PDF as a real Media doc (idempotent - reuse if it already exists).
  const pdfFilename = 'the-coldies-epk.pdf'
  const existingPdf = await payload.find({
    collection: 'media',
    where: { filename: { equals: pdfFilename } },
    limit: 1,
    depth: 0,
  })

  const pdfDoc = existingPdf.docs[0]
    ? existingPdf.docs[0]
    : await payload.create({
        collection: 'media',
        data: { alt: 'The Coldies Electronic Press Kit (PDF)' },
        context: { disableRevalidate: true },
        file: {
          data: fs.readFileSync(path.resolve(process.cwd(), 'public', pdfFilename)),
          mimetype: 'application/pdf',
          name: pdfFilename,
          size: fs.statSync(path.resolve(process.cwd(), 'public', pdfFilename)).size,
        },
      })

  const pdfURL = pdfDoc.url as string

  // 2. Create (or update) the real "epk" Page, matching the current hardcoded page's content.
  const pageData = {
    slug: 'epk',
    _status: 'published' as const,
    title: 'EPK',
    hero: {
      type: 'lowImpact' as const,
      richText: richText([
        heading('Electronic Press Kit', 'h2'),
        paragraph([
          text(
            'Everything you need to know about The Coldies — bio, members, live show details, and booking info.',
          ),
        ]),
      ]),
      links: [
        {
          link: {
            type: 'custom' as const,
            label: 'View / Download EPK',
            newTab: true,
            url: pdfURL,
          },
        },
      ],
    },
    meta: {
      title: 'Electronic Press Kit',
      description:
        'The Coldies electronic press kit: band bio, show format, booking context, and press-ready overview.',
    },
    layout: [
      {
        blockType: 'columns' as const,
        columns: [
          {
            size: 'twoThirds' as const,
            blocks: [
              {
                blockType: 'textBlock' as const,
                richText: richText([
                  heading('About The Coldies', 'h2'),
                  paragraph([
                    text(
                      'The Coldies are a Denver/Boulder-based trio serving Cold Fusion Refreshments to audiences across Colorado. Driving blues, gritty rock, outlaw country, and those killer B-sides you forgot you loved.',
                    ),
                  ]),
                  paragraph([
                    text(
                      'Lab observations confirm a critical atmospheric imbalance: the prevailing musical climate is undeniably muggy and bland. The Coldies propose an elegant solution — Cold Fusion Refreshments, meticulously distilled from deep sonic strata and served cold to audiences across Colorado.',
                    ),
                  ]),
                  heading('The Members', 'h2'),
                  paragraph([text('Jeffreeze Malek', true), text(' — Guitar & Vocals')]),
                  paragraph([text('Joey "The Barometer" Fichera', true), text(' — Bass')]),
                  paragraph([text('Jake "Cold Snap" Schultz', true), text(' — Drums')]),
                  heading('Live Show', 'h2'),
                  paragraph([
                    text(
                      'Full band sets, typically 3 hours. The Coldies play covers and originals spanning blues, rock, outlaw country, and deep-cut B-sides. Available for bars, private events, festivals, and anywhere audiences are ready for something that hits different.',
                    ),
                  ]),
                ]),
              },
            ],
          },
          {
            size: 'oneThird' as const,
            blocks: [
              {
                blockType: 'textBlock' as const,
                richText: richText([
                  heading('Press Kit PDF', 'h3'),
                  paragraph([
                    text(
                      'Download or open the full EPK as a PDF — ready to forward to promoters, venues, and press. ',
                    ),
                    link('Open PDF ↗', pdfURL),
                  ]),
                  heading('Booking & Contact', 'h3'),
                  paragraph([link('Facebook: facebook.com/thecoldies', 'https://www.facebook.com/thecoldies/')]),
                  paragraph([
                    link('Instagram: @thecoldiesband', 'https://www.instagram.com/thecoldiesband'),
                  ]),
                ]),
              },
            ],
          },
        ],
      },
    ],
  }

  const existingPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'epk' } },
    limit: 1,
    depth: 0,
  })

  // Cast at the boundary: the helpers above build valid Lexical JSON (verified
  // against Payload's actual SerializedLinkNode/LinkFields types), but getting
  // TypeScript to structurally match the deeply-nested generated richText
  // types isn't worth it for a one-off migration script.
  const pageDoc = existingPage.docs[0]
    ? await payload.update({
        collection: 'pages',
        id: existingPage.docs[0].id,
        data: pageData as never,
        depth: 0,
        context: { disableRevalidate: true },
      })
    : await payload.create({
        collection: 'pages',
        data: pageData as never,
        depth: 0,
        context: { disableRevalidate: true },
      })

  const savedPage = pageDoc as { id: string; slug?: string | null }

  console.log(
    JSON.stringify(
      { pdfId: pdfDoc.id, pdfURL, pageId: savedPage.id, pageSlug: savedPage.slug },
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
