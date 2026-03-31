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

    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      const shouldBeDark = saved === 'true'
      html.classList.toggle('dark', shouldBeDark)
    }

    setIsDark(html.classList.contains('dark'))

    const observer = new MutationObserver(() => {
      const dark = html.classList.contains('dark')
      setIsDark(dark)

      localStorage.setItem('darkMode', dark.toString())
    })

    observer.observe(html, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  return (
    <button className="cursor-pointer transition" onClick={toggleTheme} title={isDark ? 'Modo Claro' : 'Modo Escuro'}>
      {isDark ? (
        <MoonIcon color="#ccc" className="duration-300 hover:rotate-[-15deg]" />
      ) : (
        <SunIcon color="#222" className="duration-500 hover:rotate-180" />
      )}
    </button>
  )
}
