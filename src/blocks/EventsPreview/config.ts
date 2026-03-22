import type { Block } from 'payload'

export const EventsPreview: Block = {
  slug: 'eventsPreview',
  interfaceName: 'EventsPreviewBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Upcoming Events',
    },
    {
      name: 'description',
      type: 'textarea',
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
      name: 'limit',
      type: 'number',
      required: true,
      defaultValue: 3,
      admin: {
        step: 1,
      },
    },
  ],
}
