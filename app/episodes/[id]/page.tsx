import { translateEpisodeCode, statusDotColor } from '@/lib/translations/pt'
import { Character } from '@/types/character'
import type { Episode } from '@/types/episode'
import Image from 'next/image'
import Link from 'next/link'
import { fetchCharacter } from '@/services/fetchCharacter'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { redirect } from 'next/navigation'

interface EpisodePageProps {
  params: Promise<{ id: string }>
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const response: Response = await fetch(
    `https://rickandmortyapi.com/api/episode/${id}`,
    { next: { revalidate: 3600 } },
  )

  if (!response.ok) {
    redirect('/')
  }

  const episode: Episode = await response.json()

  const airDate = episode.air_date
    ? new Date(episode.air_date).toLocaleDateString('pt-BR')
    : 'Desconhecida'

  const charactersCount = episode.characters?.length ?? 0

  function getIdFromUrl(url: string): number {
    return Number(url.split('/').pop())
  }

  const presentCharacters = episode.characters
    .map((url) => fetchCharacter(getIdFromUrl(url)))
    .filter(Boolean) as Character[]

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
              <div className="flex gap-4">
                {episode.id > 1 && (
                  <Link
                    href={`/episodes/${episode.id - 1}`}
                    className="flex gap-1"
                  >
                    <ChevronLeftIcon />
                    Anterior
                  </Link>
                )}
                {episode.id < 51 && (
                  <Link href={`/episodes/${episode.id + 1}`} className="flex">
                    Próximo
                    <ChevronRightIcon />
                  </Link>
                )}
              </div>
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
                  <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {presentCharacters.map((char: Character) => {
                      return (
                        <div
                          className="relative transition duration-300 hover:scale-105"
                          key={char.id}
                        >
                          <Link href={`/characters/${char.id}`}>
                            <div
                              className={`rounded-full absolute left-3.5 top-5 ${statusDotColor[char.status]} w-3 h-3 z-3`}
                            />
                            <Image
                              className="w-75 mt-2 mx-auto h-auto rounded-full"
                              src={`/avatars/${char.id}.jpg`}
                              alt={char.name}
                              width={150}
                              height={150}
                              quality={75}
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
