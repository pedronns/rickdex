import {
  locationTypeTranslation,
  translateDimensionName,
  translateLocationName,
} from '@/lib/translations/pt'
import { fetchCharacter } from '@/services/fetchCharacter'
import { Character } from '@/types/character'
import type { Location } from '@/types/location'
import Image from 'next/image'
import Link from 'next/link'
import { statusDotColor } from '@/lib/translations/pt'

import {
  MapPinIcon,
  EarthIcon,
  SatelliteIcon,
  MicroscopeIcon,
  StarIcon,
  TvIcon,
  WavesLadderIcon,
  BedIcon,
} from 'lucide-react'
import { ReactNode } from 'react'

interface LocationPageProps {
  params: Promise<{ id: string }>
}

export default async function LocationPage({ params }: LocationPageProps) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const location: Location = await fetch(
    `https://rickandmortyapi.com/api/location/${id}`,
    { next: { revalidate: 60 } },
  ).then((res) => res.json())

  const createdDate = location.created
    ? new Date(location.created).toLocaleDateString('pt-BR')
    : 'Desconhecida'

  const getLocationTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Planet: 'from-blue-500 to-cyan-500',
      'Space station': 'from-purple-500 to-pink-500',
      Microverse: 'from-green-500 to-emerald-500',
      Dimension: 'from-orange-500 to-red-500',
      TV: 'from-yellow-500 to-orange-500',
      Resort: 'from-pink-500 to-rose-500',
      Spa: 'from-pink-500 to-rose-500',
      Dream: 'from-indigo-500 to-purple-500',
      Nightmare: 'bg-gradient-to-br from-violet-700 via-purple-900 to-zinc-950',
    }
    return colors[type] || 'from-slate-500 to-slate-600'
  }

  const getLocationTypeIcon = (type: string) => {
    const icons: Record<string, ReactNode> = {
      Planet: <EarthIcon size={32} />,
      'Space station': <SatelliteIcon size={32} />,
      Microverse: <MicroscopeIcon size={32} />,
      Dimension: <StarIcon size={32} />,
      TV: <TvIcon size={32} />,
      Resort: <WavesLadderIcon size={32} />,
      Spa: <WavesLadderIcon size={32} />,
      Dream: <BedIcon size={32} />,
      Nightmare: <BedIcon size={32} />,
    }
    return icons[type] || <MapPinIcon size={32} />
  }

  const residentsCount = location.residents?.length || 0

  function getIdFromUrl(url: string): number {
    return Number(url.split('/').pop())
  }

  const residents = location.residents
    .map((url) => fetchCharacter(getIdFromUrl(url)))
    .filter(Boolean) as Character[]

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 mb-4">
              {getLocationTypeIcon(location.type)}
            </span>
            <div>
              <h1 className="text-5xl font-bold">
                {translateLocationName(location.name)}
              </h1>
              <p className="text-muted-foreground text-lg mt-1">ID: {id}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Type Info */}
          <div className="lg:col-span-1">
            <div
              className={`bg-linear-to-br ${getLocationTypeColor(location.type)} rounded-2xl p-8 text-white shadow-xl mb-6`}
            >
              <p className="text-sm font-semibold uppercase tracking-wider opacity-90 mb-2">
                Tipo de Localização
              </p>
              <h2 className="text-3xl font-bold">
                {locationTypeTranslation[location.type] || location.type}
              </h2>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm opacity-90 mb-2">Dimensão</p>
                <p className="text-lg font-semibold">
                  {translateDimensionName(location.dimension)}
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Residentes
                  </p>
                  <p className="text-4xl font-bold text-primary">
                    {residentsCount}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Data de Criação
                  </p>
                  <p className="text-sm">{createdDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Overview Card */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6">
                  Informações da Localização
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        Nome
                      </p>
                      <p className="text-lg font-semibold">
                        {translateLocationName(location.name)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Tipo de Localização
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {getLocationTypeIcon(location.type)}
                      </span>
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-semibold text-white bg-linear-to-r ${getLocationTypeColor(location.type)}`}
                      >
                        {locationTypeTranslation[location.type] ||
                          location.type}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Dimensão
                    </p>
                    <p className="text-lg">
                      {translateDimensionName(location.dimension)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Residents Info */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl  font-bold mb-4">Residentes</h3>
                {residentsCount > 0 ? (
                  <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {residents.map((char: Character) => {
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
                ) : (
                  <p className="text-md text-gray-400 italic">
                    Sem residentes para exibir
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href={`/locations?page=${Math.ceil(location.id / 20)}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            ← Voltar para Localizações
          </a>
        </div>
      </div>
    </div>
  )
}
