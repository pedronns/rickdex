"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/characters', label: 'Personagens' },
    { href: '/locations', label: 'Locais' },
    { href: '/episodes', label: 'Episódios' },
    { href: 'https://github.com/pedronns', label: 'Contato' },
  ]

  return (
    <header className="w-full bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-black/6 dark:border-white/6">
      <nav className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-black dark:text-zinc-50">
          Rickdex
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                pathname === l.href
                  ? 'text-foreground'
                  : 'text-zinc- dark:text-zinc-300'
              } hover:opacity-95`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-black/4 dark:hover:bg-white/2"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-black/6 dark:border-white/6 bg-white dark:bg-black">
          <div className="flex flex-col px-4 py-3 gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`py-2 px-2 rounded-md transition-colors ${
                  pathname === l.href ? 'bg-foreground/10 text-foreground' : 'text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
