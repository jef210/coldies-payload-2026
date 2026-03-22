import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

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
      name: 'ticketURL',
      label: 'Ticket URL',
      type: 'text',
      admin: {
        placeholder: 'https://',
      },
      validate: (value: unknown) => {
        if (!value) return true

        if (typeof value !== 'string') {
          return 'Ticket URL must be a valid URL'
        }

        try {
          const parsedURL = new URL(value)
          return parsedURL.protocol === 'http:' || parsedURL.protocol === 'https:'
            ? true
            : 'Ticket URL must start with http:// or https://'
        } catch {
          return 'Ticket URL must be a valid URL'
        }
      },
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
  timestamps: true,
}
