'use client'

import React, { useEffect, useRef } from 'react'
import styles from './heroVideo.module.css'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('HeroVideo (DEBUG) mounted — setting up listeners')
    const v = videoRef.current
    if (!v) {
      // eslint-disable-next-line no-console
      console.log('HeroVideo: no video element found yet')
      return
    }

    const onLoadedMeta = () => {
      // eslint-disable-next-line no-console
      console.log('video loadedmetadata:', { videoWidth: v.videoWidth, videoHeight: v.videoHeight, duration: v.duration })
    }
    const onLoadedData = () => {
      // eslint-disable-next-line no-console
      console.log('video loadeddata, readyState:', v.readyState)
    }
    const onPlay = () => {
      // eslint-disable-next-line no-console
      console.log('video play event (playing?). paused:', v.paused)
    }
    const onError = (ev: any) => {
      // eslint-disable-next-line no-console
      console.error('video error event', ev, v.error)
    }
    const onStalled = () => {
      // eslint-disable-next-line no-console
      console.warn('video stalled')
    }

    v.addEventListener('loadedmetadata', onLoadedMeta)
    v.addEventListener('loadeddata', onLoadedData)
    v.addEventListener('play', onPlay)
    v.addEventListener('error', onError)
    v.addEventListener('stalled', onStalled)

    // Try to call play() to see any autoplay errors
    v.play().then(() => {
      // eslint-disable-next-line no-console
      console.log('video.play() succeeded (promise resolved)')
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.warn('video.play() rejected:', err)
    })

    return () => {
      v.removeEventListener('loadedmetadata', onLoadedMeta)
      v.removeEventListener('loadeddata', onLoadedData)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('error', onError)
      v.removeEventListener('stalled', onStalled)
    }
  }, [])

  // Using a small reliable sample video from MDN
  const TEST_VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
  const POSTER_URL = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'

  return (
    <div className={styles.heroContainer} style={{ outline: '3px solid rgba(255,0,0,0.6)' }}>
      <div className={styles.videoWrap} aria-hidden="true" style={{ opacity: 0.98 }}>
        <video
          ref={videoRef}
          className={styles.video}
          src={TEST_VIDEO}
          poster={POSTER_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls
          style={{ maxHeight: '60vh', width: '100%' }}
        />
      </div>
    </div>
  )
}
