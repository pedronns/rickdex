'use client'

import { DicesIcon } from "lucide-react"
import Link from 'next/link'

const RandomPage = () => {
  const totalCharacters = 826
  const totalLocations = 126

  function randomCharacter() {
    const randomId = Math.floor(Math.random() * totalCharacters) + 1
    return `/characters/${randomId}`
  }

  function randomLocation() {
    const randomId = Math.floor(Math.random() * totalLocations) + 1
    return `/locations/${randomId}`
  }

  function randomPage(): string {
    const temp = Math.random() <= 0.5 ? 1 : 2

    if (temp == 1) {
      return randomCharacter()
    }

    if (temp == 2) {
      return randomLocation()
    } else return '#'
  }

  return (
    <Link className="mt-2" href={randomPage()}>
      <DicesIcon />
    </Link>
  )
}

export default RandomPage
