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
      'Ice core samples of musical relics, rigorously distilled and served cold.',
    ),
    meta: {
      title: 'Music',
      description:
        'Music from The Coldies — driving blues, gritty rock, outlaw country, and killer B-side gems from Denver and Boulder.',
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'twoThirds',
            richText: createRichText([
              createHeading('The Sound'),
              createParagraph(
                'The Coldies dig through the cooler for the buried gems — driving blues, gritty rock and roll, outlaw country, and those killer B-side pop hits that disappeared before their time. A vibrant mix served like cold shock therapy to get your blood moving.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Cold Fusion', 'h3'),
              createParagraph(
                'Think of it as musical archaeology with a rhythm section. Every set is a fresh extraction from the deep sonic strata — no freezer burn, no recycled setlists.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'youtubeEmbed',
        heading: 'Featured Performance',
        videoId: 'ysz5S6PUM-U',
        caption:
          'Drop a live clip or session recording here so visitors can feel the cold shock therapy for themselves.',
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'half',
            richText: createRichText([
              createHeading('What We Play', 'h3'),
              createParagraph(
                'Blues, rock and roll, outlaw country, and the B-side gems you forgot you loved. The Coldies cover a wide range of material, always looking for the songs that hit differently — the ones with real grit, soul, and staying power.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('The Approach', 'h3'),
              createParagraph(
                'No standard setlists. No depleted material. The expedition is ongoing and the cooler is always stocked. Each performance is a fresh round of Cold Fusion Refreshments for the room.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'youtubeEmbed',
        heading: 'Another Round',
        videoId: 'ScMzIvxBSi4',
        caption:
          'Use this slot for another live clip, a different venue, or a fan-shot moment from the field.',
      },
      {
        blockType: 'youtubeEmbed',
        heading: 'From the Lab',
        videoId: 'dQw4w9WgXcQ',
        caption:
          'Reserve this space for a studio session, rehearsal clip, or any other behind-the-scenes dispatch from the glacio-acoustic lab.',
      },
    ],
  },
  about: {
    slug: 'about',
    _status: 'published',
    title: 'About',
    hero: createLowImpactHero(
      'About',
      'The cure for the common cover. Dispatches from the glacio-acoustic lab.',
    ),
    meta: {
      title: 'About',
      description:
        'About The Coldies — a Denver and Boulder area band serving Cold Fusion Refreshments and banishing musical freezer burn one show at a time.',
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('The Mission', 'h3'),
              createParagraph(
                'Lab observations confirm a critical atmospheric imbalance. The Coldies are the cure.',
              ),
            ]),
          },
          {
            size: 'twoThirds',
            richText: createRichText([
              createHeading('The Story'),
              createParagraph(
                'Lab observations confirm a critical atmospheric imbalance: the prevailing musical climate is undeniably muggy and bland. Standard setlists, resembling the Donner Party of sound, are endlessly cannibalizing the same depleted material. This leaves audiences with rhythmic freezer burn and melodic frostbite.',
              ),
              createParagraph(
                'The Coldies propose an elegant solution: Cold Fusion Refreshments, meticulously distilled from deep sonic strata, banishing musical freezer burn to the far reaches of the realm.',
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
              createHeading('"The data is clear: The Coldies are the cure for the common cover."', 'h2'),
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
              createHeading('The Expedition Team', 'h3'),
              createParagraph(
                'Leading the expedition is Jeffreeze Malek, primary glacio-acoustic analyst, whose vocal and guitar emissions provide a lil’ nip of something to warm you up. On bass, Joey “The Barometer” Fichera maintains foundational low-frequency stability. Meanwhile, Jake “Cold Snap” Schultz regulates percussive output, ensuring the energetic flow necessary for the experiments.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('The Research', 'h3'),
              createParagraph(
                'We’re diggin’ through the cooler for something to quench a profound musical thirst, searching for the truly buried gems like a St Bernard in a Swiss avalanche. Driving blues, gritty rock and roll, outlaw country, and those killer B-side pop hits — served like cold shock therapy to get your blood moving.',
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
              createHeading('Based in Denver and Boulder, Colorado'),
              createParagraph(
                'The Coldies perform at bars, private events, festivals, and anywhere audiences want real live music that hits different. If the musical climate in your room is getting muggy, we have the solution.',
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
      'Live dispatches from the field. Check the expedition schedule below.',
    ),
    meta: {
      title: 'Events',
      description:
        'Upcoming shows and live dates for The Coldies — Denver and Boulder area blues, rock, and outlaw country.',
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'twoThirds',
            richText: createRichText([
              createHeading('The Expedition Schedule'),
              createParagraph(
                'The Coldies deploy across bars, private events, venues, and anywhere audiences are ready for Cold Fusion Refreshments. Full-band sets usually run around 3 hours — enough time to work through a serious amount of material from the cooler.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Set Format', 'h3'),
              createParagraph(
                'Full-band shows run approximately 3 hours. The set covers blues, rock, outlaw country, and those B-side gems — paced to keep the energy moving and the room warm.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'eventsPreview',
        heading: 'Upcoming Expeditions',
        description: 'Upcoming shows, dates, and Cold Fusion Refreshment deliveries around Colorado and beyond.',
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
                'A setlist excavated from the deep sonic strata — no freezer burn, no recycled hits. Blues, rock and roll, outlaw country, and the killer B-sides that got buried. Expect grit, soul, and cold shock therapy for your ears.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('Book the Band', 'h3'),
              createParagraph(
                'If your venue or event needs a cure for the common cover, reach out through the contact page. The Coldies are open to bars, festivals, private events, and anywhere the musical climate needs refreshing.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'eventsPreview',
        heading: 'Past Expeditions',
        description: 'A cold record of performances and field deployments across seasons.',
        status: 'past',
        limit: 6,
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'full',
            richText: createRichText([
              createHeading('"Cold shock therapy for your ears, served live."', 'h2'),
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
      'Field dispatches, show recaps, and updates from the glacio-acoustic lab.',
    ),
    meta: {
      title: 'News',
      description:
        'Latest news and updates from The Coldies — show recaps, new finds, and dispatches from the expedition.',
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'twoThirds',
            richText: createRichText([
              createHeading('Dispatches from the Field'),
              createParagraph(
                'This is where The Coldies log the expedition in real time — show recaps, new song discoveries, notes on the cooler contents, and whatever else surfaces during the ongoing research into musical freezer burn prevention.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Lab Notes', 'h3'),
              createParagraph(
                'Less press release, more field journal. A running record of what the band is up to, what’s in the set, and what’s coming next from the glacio-acoustic lab.',
              ),
            ]),
          },
        ],
      },
      {
        blockType: 'archive',
        introContent: createRichText([
          createHeading('Latest Dispatches'),
          createParagraph(
            'A chronological record of show updates, new song findings, and expedition notes from The Coldies.',
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
              createHeading('"The research is ongoing. The cooler is always stocked."', 'h2'),
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
      'Booking inquiries, collaboration, and direct contact. The lab is open.',
    ),
    meta: {
      title: 'Contact',
      description:
        'Contact The Coldies for booking, private events, collaborations, and general inquiries.',
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
                'If your venue, event, or musical climate needs the Cold Fusion treatment, reach out. The Coldies are available for bars, private events, festivals, and anywhere audiences are ready for something that hits different.',
              ),
            ]),
          },
          {
            size: 'oneThird',
            richText: createRichText([
              createHeading('Best Way to Reach Out', 'h3'),
              createParagraph(
                'Use the contact form or reach out through Facebook. A direct email address is coming as the site is finalized.',
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
                'Reach out about full-band performances, private events, festival slots, bar residencies, and any other live opportunity where Cold Fusion Refreshments are needed.',
              ),
            ]),
          },
          {
            size: 'half',
            richText: createRichText([
              createHeading('For General Inquiries', 'h3'),
              createParagraph(
                'Media, collaborations, questions about the expedition methodology, or anything else — send it through the form and someone from the lab will be in touch.',
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
            richText: createRichText([createHeading('Facebook · Contact Form · Email Coming Soon', 'h2')]),
          },
        ],
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'twoThirds',
            richText: createRichText([
              createHeading('Where to Find Us'),
              createParagraph(
                'Follow The Coldies on Facebook for show announcements, field dispatches, and the latest from the glacio-acoustic lab. More social links and direct contact options coming as the site expands.',
              ),
            ]),
          },
        ],
      },
    ],
  },
}
