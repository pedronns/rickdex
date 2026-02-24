// app/character/[id]/page.tsx
import Image from 'next/image'
import type { Character } from '@/types/character'
import {
  genderTranslation,
  translateLocationName,
  originTranslation,
  speciesTranslation,
  statusTranslation,
  statusColor,
} from '@/lib/translations/pt'

interface CharacterPageProps {
  params: Promise<{ id: string }>
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const character: Character = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,
    { next: { revalidate: 60 } },
  ).then((res) => res.json())

  const firstAparison = await fetch(character.episode[0], {
    next: { revalidate: 60 },
  }).then((res) => res.json())

  const latestAparison = await fetch(character.episode.slice(-1)[0], {
    next: { revalidate: 60 },
  }).then((res) => res.json())

  const createdDate = character.created
    ? new Date(character.created).toLocaleDateString('pt-BR')
    : 'Desconhecida'

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-6 md:p-10 shadow-2xl border border-white/6 overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-1/3 shrink-0">
              <div className="relative">
                {character.image ? (
                  <Image
                    className="w-56 h-56 md:w-64 md:h-64 rounded-2xl object-cover transition-transform hover:scale-105"
                    src={character.image}
                    alt={character.name}
                    width={256}
                    height={256}
                    quality={75}
                  />
                ) : (
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl bg-white/6 flex items-center justify-center text-sm text-gray-300">
                    Sem imagem
                  </div>
                )}

                <span className="absolute -bottom-3 left-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-linear-to-r from-indigo-500 to-pink-500 text-white shadow-lg border border-white/10">
                  #{id}
                </span>
              </div>

              <div className="mt-4 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  {character.name}
                </h1>
                <p className="text-sm t mt-1">
                  {speciesTranslation[character.species] || character.species}
                </p>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${statusColor[character.status]} bg-white/5 border border-white/6`}
                >
                  {statusTranslation[character.status]}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/6 ">
                  {originTranslation[character.origin?.name] ||
                    character.origin?.name}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white/3 p-4 rounded-lg">
                  <p className="text-xs">Localização</p>
                  <p className="font-semibold ">
                    {translateLocationName(character.location?.name) ||
                      character.location?.name}
                  </p>
                </div>
                <div className="bg-white/3 p-4 rounded-lg">
                  <p className="text-xs ">Episódios</p>
                  <p className="font-semibold ">
                    {character.episode?.length || 0}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-sm text-gray-400 uppercase tracking-wider">
                  Sobre
                </h2>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/3 p-4 rounded-lg">
                    <p className="text-xs ">Espécie</p>
                    <p className="font-semibold">
                      {speciesTranslation[character.species] ||
                        character.species}
                    </p>
                  </div>

                  <div className="bg-white/3 p-4 rounded-lg">
                    <p className="text-xs ">Gênero</p>
                    <p className="font-semibold ">
                      {genderTranslation[character.gender] || character.species}
                    </p>
                  </div>

                  <div className="bg-white/3 p-4 rounded-lg">
                    <p className="text-xs ">Tipo</p>
                    <p className="font-semibold ">{character.type || 'N/A'}</p>
                  </div>

                  <div className="bg-white/3 p-4 rounded-lg">
                    <p className="text-xs ">Criado em</p>
                    <p className="font-semibold ">{createdDate}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm ">
                  Aparições:{' '}
                  <span className="font-semibold ">
                    {character.episode?.length || 0}
                  </span>
                </p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="text-xs ">
                    <p className="text-xs">Primeira aparição</p>
                    <p className="font-semibold ">
                      {firstAparison?.episode}
                      {' • '}
                      {firstAparison?.name}
                    </p>
                  </div>
                  <div className="text-xs">
                    <p className="text-xs">Última aparição</p>
                    <p className="font-semibold ">
                      {latestAparison?.episode}
                      {' • '}
                      {latestAparison?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <a
            href={`/characters?page=${Math.ceil(character.id / 20)}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            ← Voltar para Personagens
          </a>
        </div>
      </div>
    </div>
  )
}
