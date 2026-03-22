'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const revealSelector = '[data-reveal]'
const parallaxSelector = '[data-parallax-speed]'

const setMotionMode = (isReducedMotion: boolean) => {
  document.documentElement.classList.toggle('reduced-motion', isReducedMotion)
  document.documentElement.classList.toggle('motion-enhanced', !isReducedMotion)
}

export function MotionController() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const revealedElements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector))
    const parallaxElements = Array.from(document.querySelectorAll<HTMLElement>(parallaxSelector))

    let revealObserver: IntersectionObserver | null = null
    let rafID = 0
    let scrollBound = false

    const updateParallax = () => {
      parallaxElements.forEach((element) => {
        const speed = Number(element.dataset.parallaxSpeed || '0')
        const rect = element.getBoundingClientRect()
        const viewportCenter = window.innerHeight / 2
        const elementCenter = rect.top + rect.height / 2
        const distanceFromCenter = viewportCenter - elementCenter
        const offset = distanceFromCenter * speed

        element.style.setProperty('--parallax-offset', `${offset.toFixed(2)}px`)
      })

      rafID = 0
    }

    const onScroll = () => {
      if (!rafID) {
        rafID = window.requestAnimationFrame(updateParallax)
      }
    }

    const stopMotion = () => {
      revealObserver?.disconnect()
      revealObserver = null

      if (scrollBound) {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
        scrollBound = false
      }

      if (rafID) {
        window.cancelAnimationFrame(rafID)
        rafID = 0
      }

      revealedElements.forEach((element) => element.classList.add('is-visible'))
      parallaxElements.forEach((element) => element.style.setProperty('--parallax-offset', '0px'))
    }

    const startMotion = () => {
      stopMotion()
      revealedElements.forEach((element) => element.classList.remove('is-visible'))

      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              revealObserver?.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.14,
          rootMargin: '0px 0px -10% 0px',
        },
      )

      revealedElements.forEach((element) => {
        revealObserver?.observe(element)
      })

      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      scrollBound = true
      updateParallax()
    }

    const refreshMotionState = () => {
      const isReducedMotion = mediaQuery.matches
      setMotionMode(isReducedMotion)

      if (isReducedMotion) {
        stopMotion()
        return
      }

      startMotion()
    }

    const onMotionPreferenceChange = () => {
      refreshMotionState()
    }

    refreshMotionState()
    mediaQuery.addEventListener?.('change', onMotionPreferenceChange)
    mediaQuery.addListener?.(onMotionPreferenceChange)

    return () => {
      stopMotion()
      mediaQuery.removeEventListener?.('change', onMotionPreferenceChange)
      mediaQuery.removeListener?.(onMotionPreferenceChange)
    }
  }, [pathname])

  return null
}
