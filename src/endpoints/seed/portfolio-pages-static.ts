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
      'Original music, production work, and works in progress from Jeffrey Malek.',
    ),
    meta: {
      title: 'Music',
      description: 'Original music, production services, and studio updates from Jeffrey Malek.',
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
                'Jeffrey’s original music lives somewhere between blues, jazz, folk, and rock, with a loose human feel, a love for groove, and songs that aim to move people emotionally and spiritually. It is music built with personality, curiosity, and room to breathe.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Sound', 'h3'),
              createParagraph(
                'Think Beck and David Byrne filtered through funky jazz-blues, folk songwriting, and a modern production ear.',
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
          'Feature a finished song, stripped-down session, or live-room take that gives listeners a clear first impression of Jeffrey’s original sound.',
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'half',
            richText: createRichText([
              createHeading('Production Services', 'h3'),
              createParagraph(
                'Jeffrey offers beat-making, full production, mixing, mastering, songwriting support, and other creative production services for indie artists and collaborative projects.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('How Projects Start', 'h3'),
              createParagraph(
                'Most work begins with a conversation about scope, sound, and what the music needs. Pricing is based on the project, and Jeffrey is happy to talk through ideas before anything gets too formal.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'youtubeEmbed',
        heading: 'Studio or Live Preview',
        videoId: 'ScMzIvxBSi4',
        caption:
          'Use this slot for an alternate arrangement, a demo in progress, or a live version that shows another side of the songs.',
      },
      {
        blockType: 'youtubeEmbed',
        heading: 'What’s Coming Next',
        videoId: 'dQw4w9WgXcQ',
        caption:
          'Jeffrey is currently finishing his first album, so this space can become a teaser, announcement, or early look at the next release.',
      },
    ],
  },
  about: {
    slug: 'about',
    _status: 'published',
    title: 'About',
    hero: createLowImpactHero(
      'About',
      'A creative, eclectic musician with a deep love for songs, people, and performance.',
    ),
    meta: {
      title: 'About',
      description:
        'Artist story, influences, experience, and teaching philosophy for Jeffrey Malek.',
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
                'Creative, funny, easygoing, and serious about making meaningful music with other people.',
              ),
            ]),
          },
          {
            size: 'twoThirds',
            richText: createRichText([
              createHeading('The Story'),
              createParagraph(
                'Jeffrey Malek is a Denver and Boulder area musician who has been performing professionally since 2000. Over the years he has played a wide range of styles including classical, rap, country, rock, folk, jazz, and more, bringing those influences into an approach that feels both grounded and open-minded.',
              ),
              createParagraph(
                'He holds a music degree from Fort Lewis College with an emphasis in classical guitar, and while he rarely performs classical repertoire now, that training still shapes his touch, technique, and musicality. Whether on stage, in the studio, or teaching, Jeffrey aims to make music that inspires people and leaves room for joy.',
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
              createHeading('“Make music that feels human, honest, and alive.”', 'h2'),
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
                'Jeffrey’s musical world has been shaped by Beck, David Byrne, MF DOOM, The Beatles, John Scofield, Grant Green, and many other artists who balance craft, personality, and originality.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('Teaching Style', 'h3'),
              createParagraph(
                'Jeffrey teaches guitar, bass, voice, production, theory, songwriting, rhythm, and ensemble skills with a holistic approach. Instead of only teaching songs or riffs, he helps students understand how music works so they can grow into creative, confident musicians.',
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
              createHeading('Lessons & Creative Work'),
              createParagraph(
                'Jeffrey works with students of all ages and levels, both online and in person, and also offers production support for artists who want thoughtful collaboration. The goal in every setting is the same: make the process feel welcoming, musical, and genuinely human.',
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
      'Live music for bars, private events, community spaces, and more.',
    ),
    meta: {
      title: 'Events',
      description:
        'Live performance details, upcoming shows, and booking information for Jeffrey Malek and The Coldies.',
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
                'Jeffrey performs in a range of settings, from bars and private events to assisted living communities and local venues. His goal is to meet the room, bring people in, and make every performance feel warm, personal, and alive.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Formats', 'h3'),
              createParagraph(
                'Solo sets usually run 1–2 hours with voice, guitar, and loop pedal. Full-band shows with The Coldies usually run around 3 hours and lean into blues and rock.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'eventsPreview',
        heading: 'Upcoming Events',
        description: 'Upcoming solo shows, band dates, and appearances around Colorado and beyond.',
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
                'Jeffrey’s cover repertoire includes songs by The Beatles, A.C. Jobim, Beck, Talking Heads, Robert Earl Keen, and Frank Sinatra, shaped to fit the room and the audience.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('Booking & Appearances', 'h3'),
              createParagraph(
                'Jeffrey is open to a wide range of venues and events. For bookings, private events, or questions about the right format for your space, use the contact page or reach out through Facebook for now.',
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
              createHeading('Every show should feel welcoming, musical, and memorable.', 'h2'),
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
      'Studio updates, release notes, teaching thoughts, and behind-the-scenes dispatches.',
    ),
    meta: {
      title: 'News',
      description:
        'Latest posts and updates from Jeffrey Malek across music, performance, and teaching.',
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
                'This is where Jeffrey can share updates from the studio, notes on songs in progress, stories from performances, teaching ideas, and the little moments that shape the larger creative picture.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Purpose', 'h3'),
              createParagraph(
                'Less formal blog, more honest running journal — a simple way to keep listeners, students, and collaborators connected between bigger milestones.',
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
            'A chronological feed of releases, works in progress, live updates, teaching reflections, and announcements.',
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
              createHeading('Keep the conversation going, even between big moments.', 'h2'),
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
      'Booking, lessons, collaboration, and direct contact information.',
    ),
    meta: {
      title: 'Contact',
      description:
        'Contact Jeffrey Malek for booking, lessons, production work, and collaborations.',
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
                'Use this page for booking inquiries, lesson requests, production conversations, and general questions. The goal is simple: make it easy to start a conversation and figure out what might be a good fit.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Best Way to Reach Out', 'h3'),
              createParagraph(
                'For now, the best options are the contact form and Facebook. A direct email address at info@jeffreymalek.com is planned as the site setup is finalized.',
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
                'Reach out about solo performances, bookings with The Coldies, private events, assisted living performances, or other live opportunities.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('For Lessons & Production', 'h3'),
              createParagraph(
                'Jeffrey also welcomes inquiries about music lessons, songwriting help, production, mixing, mastering, and creative collaboration. Pricing depends on the project or lesson plan.',
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
            richText: createRichText([createHeading('Facebook · Contact Form · Email Soon', 'h2')]),
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
                'As the site grows, this can become a richer hub with additional social links, a press kit, and direct email support. For now, keeping it simple and welcoming is the right move.',
              ),
            ]),
          },
        ],
      },
    ],
  },
}
