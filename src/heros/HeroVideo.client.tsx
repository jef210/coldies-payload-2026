'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './heroVideo.module.css'

export default function HeroVideo() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(Boolean(mq.matches))
    const handler = (ev: MediaQueryListEvent) => setPrefersReducedMotion(Boolean(ev.matches))
    mq.addEventListener?.('change', handler) ?? mq.addListener(handler)
    return () => mq.removeEventListener?.('change', handler) ?? mq.removeListener(handler)
  }, [])

  const MOUNTAINS_VIDEO_URL = '/video/mountains.mp4' // or a validated external .mp4 URL
  if (prefersReducedMotion || pathname !== '/') return null

  return (
    <div className={styles.heroContainer} data-reveal="fade">
      <div className={styles.videoWrap} aria-hidden="true" data-parallax-speed="0.08">
        <video
          className={styles.video}
          src={MOUNTAINS_VIDEO_URL}
          poster="/images/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      <div className={styles.heroOverlay} aria-hidden="true" />
    </div>
  )
}
