import React from 'react'

import type { YouTubeEmbedBlock as YouTubeEmbedBlockProps } from '@/payload-types'

const normalizeYouTubeId = (value: string): string => {
  const trimmedValue = value.trim()

  if (!trimmedValue.includes('http')) {
    return trimmedValue
  }

  try {
    const parsedURL = new URL(trimmedValue)

    if (parsedURL.hostname.includes('youtu.be')) {
      return parsedURL.pathname.replace('/', '')
    }

    const searchID = parsedURL.searchParams.get('v')
    if (searchID) return searchID

    const pathParts = parsedURL.pathname.split('/').filter(Boolean)
    const embedIndex = pathParts.indexOf('embed')
    if (embedIndex >= 0 && pathParts[embedIndex + 1]) {
      return pathParts[embedIndex + 1]
    }
  } catch {
    return trimmedValue
  }

  return trimmedValue
}

export const YouTubeEmbedBlock: React.FC<YouTubeEmbedBlockProps> = ({
  heading,
  videoId,
  caption,
}) => {
  const parsedVideoID = normalizeYouTubeId(videoId)
  const embedURL = `https://www.youtube-nocookie.com/embed/${parsedVideoID}?rel=0&modestbranding=1`

  return (
    <section className="container my-20 md:my-28" data-reveal="fade">
      <div className="mb-6 max-w-3xl">
        <p className="mb-3 text-xs uppercase tracking-[0.32em] text-muted-foreground">Listen</p>
        {heading ? <h2 className="text-3xl md:text-5xl">{heading}</h2> : null}
      </div>

      <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-border/60 bg-black pt-[56.25%] shadow-[0_30px_100px_-45px_rgba(0,0,0,0.85)]">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute left-0 top-0 h-full w-full"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          src={embedURL}
          title={heading || 'Embedded YouTube video'}
        />
      </div>

      {caption ? (
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">{caption}</p>
      ) : null}
    </section>
  )
}
