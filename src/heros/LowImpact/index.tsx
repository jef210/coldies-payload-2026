import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      links?: never
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, links, richText }) => {
  return (
    <div className="container page-hero-shell relative mb-20" data-reveal="up">
      <div className="max-w-[56rem] rounded-[1.5rem] border border-border/50 bg-background/78 px-6 py-8 shadow-[0_30px_100px_-40px_rgba(0,0,0,0.85)] backdrop-blur-xl md:px-10 md:py-12">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-4">
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
  )
}
