'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { fill, imgClassName, onClick, resource, videoClassName } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { posterFilename, filename } = resource
    const poster = posterFilename ? getMediaUrl(posterFilename) : undefined

    return (
      <video
        autoPlay
        className={cn(
          'h-auto w-full',
          fill && 'absolute inset-0 h-full w-full object-cover',
          videoClassName || imgClassName,
        )}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
        poster={poster}
      >
        <source src={getMediaUrl(`/media/${filename}`)} />
      </video>
    )
  }

  return null
}
