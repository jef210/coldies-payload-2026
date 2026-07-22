'use client'

import React, { useRef } from 'react'

// Starts muted; the native player's unmute button only ever toggles the
// `muted` property, it doesn't touch `volume` - so pre-setting volume here
// means clicking unmute reveals this level instead of jumping to 100%.
const DEFAULT_VOLUME = 0.5

export const VideoPlayer: React.FC<{
  className?: string
  poster?: string
  src: string
}> = ({ className, poster, src }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <video
      className={className}
      controls
      muted
      onLoadedMetadata={() => {
        if (videoRef.current) videoRef.current.volume = DEFAULT_VOLUME
      }}
      poster={poster}
      preload="metadata"
      ref={videoRef}
      src={src}
    />
  )
}
