import React from 'react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Event, EventsPreviewBlock as EventsPreviewBlockProps } from '@/payload-types'

import { formatDateTime } from '@/utilities/formatDateTime'

export const EventsPreviewBlock: React.FC<EventsPreviewBlockProps> = async ({
  heading,
  description,
  limit = 3,
  status = 'upcoming',
}) => {
  const payload = await getPayload({ config: configPromise })

  const eventsResult = await payload.find({
    collection: 'events',
    limit,
    pagination: false,
    sort: status === 'upcoming' ? 'eventDate' : '-eventDate',
    where: {
      status: {
        equals: status,
      },
    },
  })

  const events = eventsResult.docs as Event[]

  return (
    <section className="container my-20 md:my-28" data-reveal="up">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-xs uppercase tracking-[0.32em] text-muted-foreground">Live</p>
        <h2 className="text-3xl md:text-5xl">{heading}</h2>
        {description ? (
          <p className="mt-4 text-base text-muted-foreground md:text-lg">{description}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {events.length > 0 ? (
          events.map((event) => {
            return (
              <article
                className="group rounded-[1.2rem] border border-border/60 bg-card/45 p-6 shadow-[0_25px_80px_-44px_rgba(0,0,0,0.9)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
                key={event.id}
                style={{ transitionDelay: `${Math.min(240, events.indexOf(event) * 90)}ms` }}
              >
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  {formatDateTime(event.eventDate)}
                </p>
                <h3 className="mt-3 text-xl md:text-2xl">{event.title}</h3>
                {(event.venue || event.city) && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {[event.venue, event.city].filter(Boolean).join(' · ')}
                  </p>
                )}
                {event.notes ? (
                  <p className="mt-4 text-sm text-muted-foreground">{event.notes}</p>
                ) : null}
                {event.ticketURL ? (
                  <a
                    className="mt-6 inline-flex text-sm font-medium uppercase tracking-[0.22em] text-foreground/90 transition-colors hover:text-foreground"
                    href={event.ticketURL}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {status === 'upcoming' ? 'Tickets →' : 'Event Details →'}
                  </a>
                ) : null}
              </article>
            )
          })
        ) : (
          <div className="rounded-[1.2rem] border border-dashed border-border p-6 text-muted-foreground md:col-span-3">
            Add your first {status} event in the Payload admin to populate this section.
          </div>
        )}
      </div>
    </section>
  )
}
