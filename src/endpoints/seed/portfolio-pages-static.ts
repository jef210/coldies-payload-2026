import type { RequiredDataFromCollectionSlug } from 'payload'

type StaticPage = RequiredDataFromCollectionSlug<'pages'>
type RichTextData = NonNullable<StaticPage['hero']['richText']>

const createTextNode = (text: string) => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal' as const,
  style: '',
  text,
  version: 1,
})

const createHeading = (text: string, tag: 'h1' | 'h2' | 'h3' = 'h2') => ({
  type: 'heading',
  children: [createTextNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  tag,
  version: 1,
})

const createParagraph = (text: string) => ({
  type: 'paragraph',
  children: [createTextNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  version: 1,
})

const createRichText = (
  children: Array<ReturnType<typeof createHeading> | ReturnType<typeof createParagraph>>,
) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

const createLowImpactHero = (title: string, description: string) => ({
  type: 'lowImpact' as const,
  richText: createRichText([createHeading(title, 'h1'), createParagraph(description)]),
})

const createContentBlock = (heading: string, body: string): StaticPage['layout'][number] => ({
  blockType: 'content',
  columns: [
    {
      size: 'twoThirds',
      richText: createRichText([createHeading(heading), createParagraph(body)]),
    },
  ],
})

export const portfolioPagesStatic: Record<
  'music' | 'about' | 'events' | 'news' | 'contact',
  StaticPage
> = {
  music: {
    slug: 'music',
    _status: 'published',
    title: 'Music',
    hero: createLowImpactHero(
      'Music',
      'Sessions, singles in progress, and visual performances from the Jeffrey Malek project.',
    ),
    meta: {
      title: 'Music',
      description:
        'Featured performances, studio sessions, and release updates from Jeffrey Malek.',
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'twoThirds',
            richText: createRichText([
              createHeading('Current Direction'),
              createParagraph(
                'This page is a living listening room: part studio journal, part screening room, part release runway. It is where new material appears first and where returning listeners can follow how the sound evolves.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Now Building', 'h3'),
              createParagraph(
                'Modern folk-rock foundations, cinematic textures, warm acoustic detail, and visual storytelling designed to be felt as much as heard.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'youtubeEmbed',
        heading: 'Featured Session',
        videoId: 'ysz5S6PUM-U',
        caption:
          'Lead with the clearest statement of the sound: a finished single, live-room take, or a short concept performance.',
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'half',
            richText: createRichText([
              createHeading('Listening Notes', 'h3'),
              createParagraph(
                'Pair each release with context: where it came from, what season it belongs to, and how it connects to the larger visual world of the project.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('Release Pipeline', 'h3'),
              createParagraph(
                'Over time this page expands into singles, full releases, credits, lyrics, and streaming destinations. For now, it establishes rhythm and a reason to come back.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'youtubeEmbed',
        heading: 'Alternate Performance',
        videoId: 'ScMzIvxBSi4',
        caption:
          'Use this slot for alternate arrangements, acoustic versions, or work-in-progress recordings that deepen the story.',
      },
      {
        blockType: 'youtubeEmbed',
        heading: 'Visual Teaser',
        videoId: 'dQw4w9WgXcQ',
        caption:
          'Reserve this area for a teaser, lyric visual, or short mood film that connects music and artwork.',
      },
    ],
  },
  about: {
    slug: 'about',
    _status: 'published',
    title: 'About',
    hero: createLowImpactHero(
      'About',
      'An artist project built through songs, visuals, and immersive storytelling.',
    ),
    meta: {
      title: 'About',
      description: 'Artist story, influences, visual approach, and creative direction.',
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Identity', 'h3'),
              createParagraph(
                'Modern. Folk-rooted. Cinematic. A voice shaped by atmosphere as much as biography.',
              ),
            ]),
          },
          {
            size: 'twoThirds',
            richText: createRichText([
              createHeading('The Story'),
              createParagraph(
                'Jeffrey Malek is building a body of work that moves between songcraft, visual language, and immersive digital presentation. The aim is not only to release songs, but to create a world around them — textured, vibrant, and emotionally direct.',
              ),
              createParagraph(
                'This page traces the arc behind the music: the influences, the environments, and the ongoing balance between intimacy and scale that drives the work forward.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'full',
            richText: createRichText([
              createHeading('“Build the world, then let the songs live inside it.”', 'h2'),
            ]),
          },
        ],
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'half',
            richText: createRichText([
              createHeading('Influences', 'h3'),
              createParagraph(
                'Artists, records, films, landscapes, and visual language that shape the project. Less résumé, more constellation map.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('Creative Direction', 'h3'),
              createParagraph(
                'The site is designed as a hybrid portfolio where music, motion, artwork, live dates, and process notes share one visual system.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'twoThirds',
            richText: createRichText([
              createHeading('What Comes Next'),
              createParagraph(
                'As the catalog grows, this page expands into deeper biographical writing, selected press, collaborator features, and visual documentation. For now, it sets tone, intent, and a clear sense of authorship.',
              ),
            ]),
          },
        ],
      },
    ],
  },
  events: {
    slug: 'events',
    _status: 'published',
    title: 'Events',
    hero: createLowImpactHero(
      'Events',
      'Upcoming shows, listening sessions, and live announcements.',
    ),
    meta: {
      title: 'Events',
      description: 'Upcoming and past events for Jeffrey Malek.',
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'twoThirds',
            richText: createRichText([
              createHeading('Live Presence'),
              createParagraph(
                'This page functions as both calendar and signal flare for live performance — upcoming shows, special appearances, listening events, and future touring moments.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Current Mode', 'h3'),
              createParagraph(
                'Manual scheduling for now, with room to grow into ticketing integrations, city guides, and richer venue context.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'eventsPreview',
        heading: 'Upcoming Events',
        description: 'The next live moments — keep this section current and easy to scan.',
        status: 'upcoming',
        limit: 6,
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'half',
            richText: createRichText([
              createHeading('What to Expect', 'h3'),
              createParagraph(
                'Use this area for short notes on live format: solo sets, full-band arrangements, visual elements, and what listeners can expect from a run of dates.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('Booking & Appearances', 'h3'),
              createParagraph(
                'Expand this section with booking details, festival announcements, residencies, and one-off creative collaborations.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'eventsPreview',
        heading: 'Past Events',
        description: 'An archive of performances and appearances across seasons.',
        status: 'past',
        limit: 6,
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'full',
            richText: createRichText([
              createHeading('Every show should feel like part of the same world.', 'h2'),
            ]),
          },
        ],
      },
    ],
  },
  news: {
    slug: 'news',
    _status: 'published',
    title: 'News',
    hero: createLowImpactHero(
      'News',
      'Studio updates, release notes, and behind-the-scenes dispatches.',
    ),
    meta: {
      title: 'News',
      description: 'Latest posts and updates from Jeffrey Malek.',
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'twoThirds',
            richText: createRichText([
              createHeading('Field Notes'),
              createParagraph(
                'A running document of the project: release notes, process fragments, visual experiments, studio updates, and moments that shape the larger world around the music.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Purpose', 'h3'),
              createParagraph(
                'Less blog, more journal — a way to keep the site alive between major releases and performances.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'archive',
        introContent: createRichText([
          createHeading('Latest Posts'),
          createParagraph(
            'A chronological feed of releases, works in progress, process notes, and announcements.',
          ),
        ]),
        populateBy: 'collection',
        relationTo: 'posts',
        limit: 12,
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'full',
            richText: createRichText([
              createHeading('Keep the archive alive, even between big moments.', 'h2'),
            ]),
          },
        ],
      },
    ],
  },
  contact: {
    slug: 'contact',
    _status: 'published',
    title: 'Contact',
    hero: createLowImpactHero('Contact', 'Booking, collaboration, and direct contact information.'),
    meta: {
      title: 'Contact',
      description: 'Contact and connect with Jeffrey Malek.',
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'twoThirds',
            richText: createRichText([
              createHeading('Open Lines'),
              createParagraph(
                'A direct invitation into the project: simple, intentional, and clear. Use this space for booking inquiries, collaborations, and general contact details.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Current Setup', 'h3'),
              createParagraph(
                'Form delivery can be added next. For v1, this page should still provide clear paths for connection.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'half',
            richText: createRichText([
              createHeading('For Booking', 'h3'),
              createParagraph(
                'Use this section for performance inquiries, festival opportunities, and creative partnerships.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('For General Contact', 'h3'),
              createParagraph(
                'List your preferred email, management contact, or a short note directing visitors to the fastest way to reach you.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'full',
            richText: createRichText([
              createHeading('Instagram · YouTube · Spotify · Bandcamp', 'h2'),
            ]),
          },
        ],
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'twoThirds',
            richText: createRichText([
              createHeading('Where to Connect'),
              createParagraph(
                'Later this can grow into a richer hub with social links, press kit downloads, mailing-list entry points, and a routed contact form. For now, keep it authored and welcoming.',
              ),
            ]),
          },
        ],
      },
    ],
  },
}
