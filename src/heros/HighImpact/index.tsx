'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <div
      className="page-hero-shell relative flex min-h-[70svh] items-center justify-center overflow-hidden text-white md:min-h-[88vh]"
      data-theme="dark"
    >
      <div
        className="container z-10 relative flex items-center justify-center py-16 md:py-32 lg:py-40"
        data-reveal="up"
      >
        <div className="max-w-[36.5rem] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0 select-none" data-parallax-speed="0.06">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,122,53,0.22),transparent_28%),linear-gradient(to_bottom,rgba(2,6,23,0.12),rgba(2,6,23,0.68))]" />
    </div>
  )
}
