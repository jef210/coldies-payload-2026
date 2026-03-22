'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1 md:gap-2">
      {navItems.map(({ link }, i) => {
        const href =
          link.type === 'reference' &&
          typeof link.reference?.value === 'object' &&
          link.reference.value.slug
            ? `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${link.reference.value.slug}`
            : link.url

        const isActive = href
          ? href === '/'
            ? pathname === '/'
            : pathname?.startsWith(href)
          : false

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
  )
}
