import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <div className={clsx('flex flex-col leading-none text-foreground', className)}>
      <span className="text-[0.65rem] font-medium uppercase tracking-[0.42em] text-muted-foreground">
        Jeffrey
      </span>
      <span className="mt-1 text-[1.15rem] font-semibold uppercase tracking-[0.28em] text-foreground md:text-[1.35rem]">
        Malek
      </span>
    </div>
  )
}
