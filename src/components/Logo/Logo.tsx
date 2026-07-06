import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className, loading = 'lazy', priority = 'auto' } = props

  return (
    <div className={clsx('flex items-center', className)}>
      <Image
        alt="The Coldies"
        className="h-10 w-auto md:h-11"
        fetchPriority={priority}
        height={200}
        loading={loading}
        priority={priority === 'high'}
        src="/coldies-logo-0626.1.png"
        width={860}
      />
    </div>
  )
}
