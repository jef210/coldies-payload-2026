import type { Header as HeaderType } from '@/payload-types'

export type NavItems = NonNullable<HeaderType['navItems']>
type NavLink = NavItems[number]['link']

export const getNavHref = (link: NavLink): string | undefined => {
  return link.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link.reference.value.slug
    ? `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${link.reference.value.slug}`
    : (link.url ?? undefined)
}

export const isNavHrefActive = (href: string | undefined, pathname: string | null): boolean => {
  if (!href) return false
  return href === '/' ? pathname === '/' : Boolean(pathname?.startsWith(href))
}
