import type { Header } from '@/payload-types'

export const defaultHeaderNavItems: NonNullable<Header['navItems']> = [
  {
    link: {
      type: 'custom',
      label: 'Home',
      url: '/',
      newTab: false,
    },
  },
  {
    link: {
      type: 'custom',
      label: 'Music',
      url: '/music',
      newTab: false,
    },
  },
  {
    link: {
      type: 'custom',
      label: 'About',
      url: '/about',
      newTab: false,
    },
  },
  {
    link: {
      type: 'custom',
      label: 'Events',
      url: '/events',
      newTab: false,
    },
  },
  {
    link: {
      type: 'custom',
      label: 'EPK',
      url: '/epk',
      newTab: false,
    },
  },
  {
    link: {
      type: 'custom',
      label: 'Contact',
      url: '/contact',
      newTab: false,
    },
  },
]
