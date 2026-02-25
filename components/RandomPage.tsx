'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DicesIcon } from 'lucide-react'

type PageType = 'character' | 'location' | 'episode'

const MAX_BY_TYPE: Record<PageType, number> = {
  character: 826,
  location: 126,
  episode: 51
}

const PAGE_TYPES: PageType[] = ['character', 'location', 'episode']

export default function RandomPage({ pageType }: { pageType?: PageType }) {
  const [href, setHref] = useState<string | null>(null)

  useEffect(() => {
    const resolvedType =
      pageType ??
      PAGE_TYPES[Math.floor(Math.random() * PAGE_TYPES.length)]

    const randomId =
      Math.floor(Math.random() * MAX_BY_TYPE[resolvedType]) + 1

    setHref(`/${resolvedType}s/${randomId}`)
  }, [pageType])

  if (!href) return null

  return (
    <div className="flex justify-center" title="Página aleatória">
      <Link
        className="mt-2 transition duration-300 hover:scale-110"
        href={href}
      >
        <DicesIcon />
      </Link>
    </div>
  )
}