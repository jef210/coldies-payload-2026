import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const validateURL = (value: unknown) => {
  if (!value) return true

  if (typeof value !== 'string') {
    return 'Must be a valid URL'
  }

  try {
    const parsedURL = new URL(value)
    return parsedURL.protocol === 'http:' || parsedURL.protocol === 'https:'
      ? true
      : 'Must start with http:// or https://'
  } catch {
    return 'Must be a valid URL'
  }
}

export const Events: CollectionConfig<'events'> = {
  slug: 'events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'status', 'venue', 'city'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'eventDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'upcoming',
      options: [
        {
          label: 'Upcoming',
          value: 'upcoming',
        },
        {
          label: 'Past',
          value: 'past',
        },
      ],
    },
    {
      name: 'venue',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'venueLogo',
      label: 'Venue Logo',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: {
          contains: 'image/',
        },
      },
      admin: {
        description: 'Shown as a thumbnail on the event card, linking to the Venue Website URL below.',
      },
    },
    {
      name: 'venueWebsiteURL',
      label: 'Venue Website URL',
      type: 'text',
      admin: {
        placeholder: 'https://',
      },
      validate: validateURL,
    },
    {
      name: 'venueMapURL',
      label: 'Venue Map URL',
      type: 'text',
      admin: {
        placeholder: 'https://maps.google.com/...',
        description: 'Paste the venue’s Google Maps link (Share → Copy link).',
      },
      validate: validateURL,
    },
    {
      name: 'ticketURL',
      label: 'Ticket URL',
      type: 'text',
      admin: {
        placeholder: 'https://',
      },
      validate: validateURL,
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
  timestamps: true,
}
