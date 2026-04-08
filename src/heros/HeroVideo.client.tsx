'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './heroVideo.module.css'

const HERO_VIDEO_MP4_URL =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
const HERO_VIDEO_WEBM_URL =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'

export default function HeroVideo() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(Boolean(mq.matches))
    const handler = (ev: MediaQueryListEvent) => setPrefersReducedMotion(Boolean(ev.matches))
    mq.addEventListener?.('change', handler) ?? mq.addListener(handler)
    return () => mq.removeEventListener?.('change', handler) ?? mq.removeListener(handler)
  }, [])

  if (prefersReducedMotion || pathname !== '/') return null

  return (
    <div className={styles.heroContainer} data-reveal="fade">
      <div className={styles.fallbackBackdrop} aria-hidden="true" />
      <div className={styles.videoWrap} aria-hidden="true" data-parallax-speed="0.08">
        <video
          className={[styles.video, !videoLoaded || videoFailed ? styles.videoHidden : '']
            .filter(Boolean)
            .join(' ')}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoLoaded(true)}
          onError={() => setVideoFailed(true)}
        >
          <source src={HERO_VIDEO_WEBM_URL} type="video/webm" />
          <source src={HERO_VIDEO_MP4_URL} type="video/mp4" />
        </video>
      </div>
      <div className={styles.heroOverlay} aria-hidden="true" />
    </div>
  )
}
