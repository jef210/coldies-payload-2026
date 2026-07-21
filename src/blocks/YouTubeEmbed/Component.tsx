import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { YouTubeEmbedBlock as YouTubeEmbedBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const normalizeYouTubeId = (value: string): string => {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return ''
  }

  const iframedSrcMatch = trimmedValue.match(/src=["']([^"']+)["']/i)
  const candidate = iframedSrcMatch?.[1] ?? trimmedValue

  const idPattern =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  const directIdPattern = /^[A-Za-z0-9_-]{11}$/

  const fromPattern = candidate.match(idPattern)?.[1]
  if (fromPattern) {
    return fromPattern
  }

  if (directIdPattern.test(candidate)) {
    return candidate
  }

  try {
    const parsedURL = new URL(candidate)

    const searchID = parsedURL.searchParams.get('v')
    if (searchID && directIdPattern.test(searchID)) {
      return searchID
    }

    const pathParts = parsedURL.pathname.split('/').filter(Boolean)
    const possibleID = pathParts[pathParts.length - 1]
    if (possibleID && directIdPattern.test(possibleID)) {
      return possibleID
    }
  } catch {
    return candidate.split('?')[0].split('&')[0].trim()
  }

  return candidate.split('?')[0].split('&')[0].trim()
}

const isDirectVideoSource = (value: string): boolean => {
  const normalizedValue = value.toLowerCase().trim()

  return /\.(mp4|webm|ogg)(\?.*)?$/.test(normalizedValue)
}

const normalizeMediaPath = (value: string): string => {
  const trimmedValue = value.trim()

  if (!trimmedValue) return ''

  try {
    const parsed = new URL(trimmedValue)
    return parsed.pathname
  } catch {
    return trimmedValue.split('?')[0]
  }
}

const extractFilenameFromPath = (value: string): string => {
  const normalizedPath = normalizeMediaPath(value)
  const lastPart = normalizedPath.split('/').filter(Boolean).pop()

  if (!lastPart) return ''

  try {
    return decodeURIComponent(lastPart)
  } catch {
    return lastPart
  }
}

export const YouTubeEmbedBlock = async ({
  enableGutter = true,
  heading,
  videoId,
  caption,
}: YouTubeEmbedBlockProps & { enableGutter?: boolean }) => {
  const isDirectVideo = isDirectVideoSource(videoId)
  const parsedVideoID = normalizeYouTubeId(videoId)
  const embedURL = `https://www.youtube-nocookie.com/embed/${parsedVideoID}?rel=0&modestbranding=1`
  let posterURL: string | undefined

  if (isDirectVideo) {
    const payload = await getPayload({ config: configPromise })
    const normalizedVideoPath = normalizeMediaPath(videoId)
    const decodedVideoPath = (() => {
      try {
        return decodeURIComponent(normalizedVideoPath)
      } catch {
        return normalizedVideoPath
      }
    })()
    const videoFilename = extractFilenameFromPath(videoId)

    const mediaResult = await payload.find({
      collection: 'media',
      where: {
        or: [
          {
            url: {
              equals: normalizedVideoPath,
            },
          },
          {
            url: {
              equals: decodedVideoPath,
            },
          },
          {
            filename: {
              equals: videoFilename,
            },
          },
        ],
      },
      limit: 1,
      depth: 0,
    })

    const videoMedia = mediaResult.docs[0] as { posterFilename?: string } | undefined

    if (videoMedia?.posterFilename) {
      posterURL = getMediaUrl(videoMedia.posterFilename)
    }
  }

  return (
    <section className={cn(enableGutter && 'container my-20 md:my-28')} data-reveal="fade">
      <div className="mb-6 max-w-3xl">
        <p className="mb-3 text-xs uppercase tracking-[0.32em] text-muted-foreground">Listen</p>
        {heading ? <h2 className="text-3xl md:text-5xl">{heading}</h2> : null}
      </div>

      <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-border/60 bg-black shadow-[0_30px_100px_-45px_rgba(0,0,0,0.85)]">
        {isDirectVideo ? (
          <video
            className="h-full w-full"
            controls
            poster={posterURL}
            preload="metadata"
            src={videoId}
          />
        ) : (
          <div className="pt-[56.25%]">
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
        )}
      </div>

      {caption ? (
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">{caption}</p>
      ) : null}
    </section>
  )
}
