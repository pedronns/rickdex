import Image from 'next/image'

import type { Character, CharacterResponse } from '@/types/character'
import {
  statusTranslation,
  speciesTranslation,
  statusColor,
} from '@/lib/translations/pt'
import Link from 'next/link'

export default async function Page() {
  const page = Math.floor(Math.random() * 25) + 1 // just to check different species and statuses; pagination will be implemented later
  const data: CharacterResponse = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`,
    {
      cache: 'no-store',
    },
  ).then((res) => res.json())

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-950 to-black bg-fixed text-white px-6 py-12">
      <h1 className="text-3xl text-brand-primary font-bold mb-8 text-center">
        Personagens - Página {page}
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.results.map((char: Character) => (
          <Link
            href={`/characters/${char.id}`}
            className="bg-brand-dark p-3 rounded-2xl overflow-hidden shadow-md hover:scale-105 hover:bg-brand-muted transition duration-300 cursor-pointer"
            key={char.id}
          >
            
            <Image
              className="w-75 mt-2 mx-auto h-auto rounded-full"
              src={char.image}
              loading="lazy"
              alt={char.name}
              width={150}
              height={200}
              quality={70}
            />
            <p className="pt-4 text-lg font-semibold text-center">
              {char.name}
            </p>
            <p className="text-md font-semibold text-gray-500 text-center">
              {speciesTranslation[char.species] || char.species}
            </p>
            <p
              className={`text-sm font-semibold text-center ${statusColor[char.status]}`}
            >
              {statusTranslation[char.status]}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
