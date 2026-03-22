import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container relative -mt-18 mb-20 md:-mt-24" data-reveal="up">
      <div className="max-w-[56rem] rounded-[1.5rem] border border-border/50 bg-background/78 px-6 py-8 shadow-[0_30px_100px_-40px_rgba(0,0,0,0.85)] backdrop-blur-xl md:px-10 md:py-12">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
