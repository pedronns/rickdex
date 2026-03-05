'use client'

import { SunIcon, MoonIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
  }

  useEffect(() => {
    const html = document.documentElement

    setIsDark(html.classList.contains('dark'))

    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains('dark'))
    })

    observer.observe(html, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  return (
    <button
      className="cursor-pointer transition"
      onClick={toggleTheme}
    >
      {isDark ? (
        <MoonIcon color="#ccc" className="duration-300 hover:rotate-[-15deg]" />
      ) : (
        <SunIcon color="#222" className="duration-500 hover:rotate-180" />
      )}
    </button>
  )
}
