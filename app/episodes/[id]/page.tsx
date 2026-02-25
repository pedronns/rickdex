import { translateEpisodeCode } from '@/lib/translations/pt'
import { Character } from '@/types/character'
import { cache } from 'react'
import type { Episode } from '@/types/episode'
import Image from 'next/image'
import Link from 'next/link'

interface EpisodePageProps {
  params: Promise<{ id: string }>
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const episode: Episode = await fetch(
    `https://rickandmortyapi.com/api/episode/${id}`,
    { next: { revalidate: 3600 } },
  ).then((res) => res.json())

  const airDate = episode.air_date
    ? new Date(episode.air_date).toLocaleDateString('pt-BR')
    : 'Desconhecida'

  const charactersCount = episode.characters.length || 0

  // i'm reaching rate limit sometimes, working on that
  const fetchCharacter = cache(
    async (url: string): Promise<Character> => {
      const response = await fetch(url)
      const data = await response.json()
      return data
    }
  )

  const characters: Character[] = []

  for (const url of episode.characters) {
    const character = await fetchCharacter(url)
    characters.push(character)
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-5xl font-bold">{episode.name}</h1>
              <p className="text-muted-foreground text-lg mt-1">
                {translateEpisodeCode(episode.episode)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Episode Info */}
          <div className="lg:col-span-1">
            <div
              className={`bg-linear-to-br rounded-2xl p-8 text-white shadow-xl mb-6`}
            >
              <p className="text-sm font-semibold uppercase tracking-wider opacity-90 mb-2">
                Personagens
              </p>
              <p className="text-4xl font-bold text-primary">
                {charactersCount}
              </p>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm opacity-90 mb-2">DATA DE EXIBIÇÃO</p>
                <p className="text-lg font-semibold">{airDate}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Characters Info */}
              {charactersCount > 0 && (
                <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl  font-bold mb-4">Personagens</h3>
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {characters.map((char: Character) => {
                      return (
                        <div className="" key={char.id}>
                          <Link href={`/characters/${char.id}`}>
                            <Image
                              className="w-75 mt-2 mx-auto h-auto rounded-full transition duration-300 hover:scale-105"
                              src={char.image}
                              alt={char.name}
                              width={150}
                              height={200}
                              quality={70}
                            />
                          </Link>
                          <p className="text-center">{char.name}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href={`/episodes?page=${Math.ceil(episode.id / 20)}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            ← Voltar para Episódios
          </Link>
        </div>
      </div>
    </div>
  )
}
