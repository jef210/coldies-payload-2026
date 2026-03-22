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
      'Listen to placeholder tracks, embedded sessions, and evolving sonic sketches while the full catalog takes shape.',
    ),
    meta: {
      title: 'Music',
      description: 'Placeholder tracks, featured videos, and sonic direction from Jeffrey Malek.',
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
                'The music page should feel like a living listening room: part journal, part screening room, part release environment. For now, it can hold demos, session videos, and early sketches while the finished catalog is still coming together.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Now Building', 'h3'),
              createParagraph(
                'Folk rock foundations, cinematic textures, warm acoustic detail, and visual storytelling built for motion-heavy presentation.',
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
          'Use this first feature slot for the strongest introduction to your sound — a finished single, live room performance, or short concept video.',
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'half',
            richText: createRichText([
              createHeading('Listening Notes', 'h3'),
              createParagraph(
                'Pair each embed with story fragments: where it came from, what season it belongs to, what visual language surrounds it, or where it sits in your larger body of work.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('Release Pipeline', 'h3'),
              createParagraph(
                'Later, this page can expand into singles, albums, lyrics, credits, and streaming links. For v1, we are building mood, structure, and a compelling place for people to return to.',
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
          'Keep secondary performances or rough-cut material in a modular stack so this page can evolve without redesigning the whole layout.',
      },
      {
        blockType: 'youtubeEmbed',
        heading: 'Visual Teaser',
        videoId: 'dQw4w9WgXcQ',
        caption:
          'This slot can become a teaser, lyric visual, or mood film that links the music and artwork sides of the portfolio together.',
      },
    ],
  },
  about: {
    slug: 'about',
    _status: 'published',
    title: 'About',
    hero: createLowImpactHero(
      'About',
      'A modern folk rock world built from music, visuals, motion, and immersive storytelling.',
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
                'Modern. Folk-rooted. Cinematic. This page should feel like a statement of atmosphere as much as biography.',
              ),
            ]),
          },
          {
            size: 'twoThirds',
            richText: createRichText([
              createHeading('The Story'),
              createParagraph(
                'Jeffrey Malek is building a body of work that moves between songcraft, visual language, and immersive digital presentation. The goal is not just to release songs, but to create a world around them — textured, vibrant, and emotionally direct.',
              ),
              createParagraph(
                'This space can eventually hold the real arc: where the music began, what shaped it, the visual influences behind it, and the tension between intimacy and spectacle that drives the project forward.',
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
                'Use this section for the artists, records, films, places, and visual moods that inform the work. Think less résumé, more constellation map.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('Creative Direction', 'h3'),
              createParagraph(
                'The site is being shaped as a hybrid portfolio: music, motion, artwork, live dates, and process notes all living in one consistent visual system.',
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
                'As the project grows, this page can expand into deeper biographical writing, selected press, collaborator features, and visual documentation. For now, it should establish tone, intent, and a sense that everything on the site belongs to the same universe.',
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
      'A live calendar for upcoming shows, pop-ups, listening sessions, and future touring announcements.',
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
                'This page should function as both a calendar and a mood board for live performance. It is where upcoming shows, special appearances, listening events, and future touring moments begin to gather energy.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Current Mode', 'h3'),
              createParagraph(
                'Manual scheduling for now, with room to grow later into ticketing integrations, archives, and richer venue storytelling.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'eventsPreview',
        heading: 'Upcoming Events',
        description:
          'Add live dates in Payload to turn this into your main performance hub. Keep the top of this page current and high-energy.',
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
                'Use this space later for short notes on the live experience: solo sets, full-band arrangements, visuals, venue atmosphere, or what listeners can expect from a given run of performances.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('Booking & Appearances', 'h3'),
              createParagraph(
                'Eventually this can expand to include booking details, festival appearances, residency announcements, and one-off creative collaborations.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'eventsPreview',
        heading: 'Past Events',
        description:
          'Archive your performances and appearances here so the live side of the project starts to feel documented and real over time.',
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
      'Updates, behind-the-scenes notes, announcements, and progress posts from the studio and beyond.',
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
                'This page should feel like a running document of the project — release notes, process fragments, visual experiments, studio updates, and moments that give shape to the larger world around the music.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Purpose', 'h3'),
              createParagraph(
                'Less blog, more journal. Use it to keep the site alive between major releases and performances.',
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
            'Turn posts into a running journal for releases, works in progress, process notes, and announcements.',
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
    hero: createLowImpactHero(
      'Contact',
      'For now, use this page as a contact landing space until email and forms are fully wired in.',
    ),
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
                'This page should feel like an invitation into the project — simple, direct, and intentional. Until email infrastructure is wired in, it can serve as a calm landing space for booking, collaboration, and general contact details.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Current Setup', 'h3'),
              createParagraph(
                'Contact form delivery comes later. For now, this page establishes tone and gives clear paths for connection.',
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
                'Reserve this area for performance inquiries, festival opportunities, collaborations, and creative partnerships.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('For General Contact', 'h3'),
              createParagraph(
                'Use this space for your preferred email, manager details, or a short note directing visitors to the best way to reach you.',
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
                'Later this can become a richer contact hub with real social links, press kit downloads, mailing list entry points, and a form that routes submissions cleanly. For v1, it should still feel authored and welcoming.',
              ),
            ]),
          },
        ],
      },
    ],
  },
}
