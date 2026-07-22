'use client'

import { Menu, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

import { MobileNav } from './MobileNav'
import { getNavHref, isNavHrefActive } from './utils'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <>
      <nav className="hidden items-center gap-1 md:flex md:gap-2">
        {navItems.map(({ link }, i) => {
          const href = getNavHref(link)
          const isActive = isNavHrefActive(href, pathname)

          return (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className={[
                'rounded-full px-3 py-2 text-[0.67rem] font-medium uppercase tracking-[0.24em] no-underline transition-colors md:px-4',
                isActive
                  ? 'bg-primary text-primary-foreground hover:no-underline'
                  : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground hover:no-underline',
              ].join(' ')}
            />
          )
        })}
        <Link
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
          href="/search"
        >
          <span className="sr-only">Search</span>
          <SearchIcon className="w-4" />
        </Link>
      </nav>

      <button
        aria-controls="mobile-nav-drawer"
        aria-expanded={isMobileNavOpen}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground md:hidden"
        onClick={() => setIsMobileNavOpen(true)}
        type="button"
      >
        <span className="sr-only">Open menu</span>
        <Menu className="w-5" />
      </button>

      <MobileNav
        isOpen={isMobileNavOpen}
        navItems={navItems}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  )
}
