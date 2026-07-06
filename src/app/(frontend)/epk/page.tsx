import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'EPK | The Coldies',
  description:
    'The Coldies Electronic Press Kit — band bio, member info, live show details, and booking contact.',
}

export default function EPKPage() {
  return (
    <article className="pb-24" data-page-slug="epk">
      {/* Hero */}
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.32em] text-muted-foreground">
            Press Materials
          </p>
          <h1 className="text-4xl font-bold md:text-6xl">Electronic Press Kit</h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Everything you need to know about The Coldies — bio, members, live show details, and
            booking info.
          </p>

          {/* PDF Download Button */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/the-coldies-epk.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow transition-opacity hover:opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
              View / Download EPK
            </a>
            <a
              href="/the-coldies-epk.pdf"
              download="The-Coldies-EPK.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-accent/60"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Save PDF
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container grid grid-cols-1 gap-16 md:grid-cols-3">
        {/* Main bio column */}
        <div className="md:col-span-2 space-y-10">
          <section>
            <h2 className="mb-4 text-2xl font-semibold">About The Coldies</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Coldies are a Denver/Boulder-based trio serving Cold Fusion Refreshments to
              audiences across Colorado. Driving blues, gritty rock, outlaw country, and those
              killer B-sides you forgot you loved.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Lab observations confirm a critical atmospheric imbalance: the prevailing musical
              climate is undeniably muggy and bland. The Coldies propose an elegant solution — Cold
              Fusion Refreshments, meticulously distilled from deep sonic strata and served cold to
              audiences across Colorado.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">The Members</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Jeffreeze Malek</p>
                <p className="text-sm text-muted-foreground">Guitar & Vocals</p>
              </div>
              <div>
                <p className="font-semibold">Joey &ldquo;The Barometer&rdquo; Fichera</p>
                <p className="text-sm text-muted-foreground">Bass</p>
              </div>
              <div>
                <p className="font-semibold">Jake &ldquo;Cold Snap&rdquo; Schultz</p>
                <p className="text-sm text-muted-foreground">Drums</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Live Show</h2>
            <p className="text-muted-foreground leading-relaxed">
              Full band sets, typically 3 hours. The Coldies play covers and originals spanning
              blues, rock, outlaw country, and deep-cut B-sides. Available for bars, private events,
              festivals, and anywhere audiences are ready for something that hits different.
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="rounded-[1.2rem] border border-border p-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em]">
              Press Kit PDF
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Download or open the full EPK as a PDF — ready to forward to promoters, venues, and
              press.
            </p>
            <a
              href="/the-coldies-epk.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-80"
            >
              Open PDF ↗
            </a>
          </div>

          <div className="rounded-[1.2rem] border border-border p-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em]">
              Booking & Contact
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://www.facebook.com/thecoldies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Facebook: facebook.com/thecoldies
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/thecoldiesband"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Instagram: @thecoldiesband
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-[1.2rem] border border-dashed border-border p-6 text-sm text-muted-foreground">
            <p className="font-medium mb-1">📎 Placeholder PDF</p>
            <p>
              Replace <code className="text-xs">/public/the-coldies-epk.pdf</code> with the final
              designed EPK before launch.
            </p>
          </div>
        </aside>
      </div>
    </article>
  )
}
