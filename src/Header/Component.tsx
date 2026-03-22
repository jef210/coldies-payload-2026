import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { defaultHeaderNavItems } from '@/utilities/defaultHeaderNavItems'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  const headerWithFallback: Header = {
    ...headerData,
    navItems: headerData?.navItems?.length ? headerData.navItems : defaultHeaderNavItems,
  }

  return <HeaderClient data={headerWithFallback} />
}
