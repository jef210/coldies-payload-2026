'use client'

import { SearchIcon, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

import type { NavItems } from './utils'
import { getNavHref, isNavHrefActive } from './utils'

export const MobileNav: React.FC<{
  isOpen: boolean
  navItems: NavItems
  onClose: () => void
}> = ({ isOpen, navItems, onClose }) => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const closedByNavigationRef = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close automatically whenever the route actually changes underneath it.
  // Marked so the focus-restoration below knows not to pull focus back to the
  // trigger button - the user has deliberately moved on to a new page.
  useEffect(() => {
    closedByNavigationRef.current = true
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (!isOpen) return

    closedByNavigationRef.current = false
    const previouslyFocused = document.activeElement as HTMLElement | null

    // Deferred until the slide-in transition finishes - focusing the close
    // button while it's still transitioning in from off-screen can make the
    // browser attempt to scroll it into view mid-animation, adding a second
    // source of jumpiness on top of the transition itself.
    const focusTimeout = window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 300)

    // Locking scroll by hiding the scrollbar shifts the whole page sideways
    // by the scrollbar's width the instant it disappears (visible scrollbars
    // only - most mobile browsers already use overlay scrollbars with zero
    // width, so this is a no-op there). Compensate with matching padding so
    // nothing jumps.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimeout)
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
      document.removeEventListener('keydown', onKeyDown)
      if (!closedByNavigationRef.current) {
        previouslyFocused?.focus()
      }
    }
  }, [isOpen, onClose])

  if (!mounted) return null

  return createPortal(
    <div
      aria-hidden={!isOpen}
      className={cn(
        'fixed inset-0 z-[60] overflow-hidden md:hidden',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity duration-300 motion-reduce:transition-none',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
        inert={!isOpen}
        onClick={onClose}
      />
      <div
        aria-label="Menu"
        aria-modal="true"
        className={cn(
          'absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col gap-1 overflow-y-auto bg-background px-6 py-6 shadow-[0_20px_80px_-24px_rgba(0,0,0,0.85)] transition-transform duration-300 ease-out motion-reduce:transition-none',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        id="mobile-nav-drawer"
        inert={!isOpen}
        role="dialog"
      >
        <div className="mb-4 flex justify-end">
          <button
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <X className="w-5" />
          </button>
        </div>

        {navItems.map(({ link }, i) => {
          const href = getNavHref(link)
          const isActive = isNavHrefActive(href, pathname)

          return (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className={cn(
                'rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] no-underline transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground hover:no-underline'
                  : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground hover:no-underline',
              )}
            />
          )
        })}

        <Link
          className="mt-2 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
          href="/search"
        >
          <SearchIcon className="w-4" />
          Search
        </Link>
      </div>
    </div>,
    document.body,
  )
}
