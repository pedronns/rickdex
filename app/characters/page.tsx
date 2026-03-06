import Image from 'next/image'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

import type { Character, CharacterResponse } from '@/types/character'

import RandomPage from '@/components/RandomPage'
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import { statusTranslation, speciesTranslation } from '@/lib/translations/pt'
import { statusColor } from '@/lib/colors'

type Props = {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams

  const currentPage = Number(params.page ?? 1)

  const data: CharacterResponse = await fetch(
    `https://rickandmortyapi.com/api/character?page=${currentPage}`,
    {
      next: { revalidate: 3600 },
    },
  ).then((res) => res.json())

  const characters = data.results

  const totalPages = data.info.pages
  const startPage = Math.max(1, currentPage - 2)
  const endPage = Math.min(totalPages, startPage + 4)

  const adjustedStart =
    endPage - startPage < 4 ? Math.max(1, endPage - 4) : startPage
  const totalVisiblePages = endPage - adjustedStart + 1

  const pages = Array.from(
    { length: totalVisiblePages },
    (_, i) => adjustedStart + i,
  )

  return (
    <div className="px-6 py-12">
      <div>
        <div className="mb-12 align-center">
          <h1 className="text-5xl font-bold mb-2 text-center">Personagens</h1>
          {currentPage > 1 && (
            <p className="text-center text-muted-foreground text-lg">
              Página {currentPage} de {totalPages}
            </p>
          )}
          <div className="mx-auto w-75 max-w-md my-4">
            <SearchBar />
          </div>
          <RandomPage pageType="character" />
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {characters.map((char: Character) => (
            <Link
              href={`/characters/${char.id}`}
              key={char.id}
              className="group lg:flex relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 bg-card border border-border shadow-lg hover:shadow-xl"
            >
              <Image
                className="w-50  md:w-75 lg:w-48 mt-2 mx-auto h-auto rounded-full"
                src={`/avatars/${char.id}.jpg`}
                loading="lazy"
                alt={char.name}
                width={150}
                height={200}
              />
              <div className="flex flex-col justify-between">
                <h2 className="text-2xl font-bold group-hover:text-primary transition-colors text-center">
                  {char.name}
                </h2>
                <div>
                  <p className="text-md font-semibold text-gray-500 text-center">
                    {speciesTranslation[char.species] || char.species}
                  </p>
                  <p
                    className={`text-sm font-semibold text-center ${statusColor[char.status]}`}
                  >
                    {statusTranslation[char.status]}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>

        <Pagination className="mx-auto mt-8">
          <PaginationFirst href="?page=1" />
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`?page=${currentPage - 1}`} />
              </PaginationItem>
            )}

            {pages.map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`?page=${pageNum}`}
                  isActive={pageNum === currentPage}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < data.info.pages && (
              <PaginationItem>
                <PaginationNext href={`?page=${currentPage + 1}`} />
              </PaginationItem>
            )}
            <PaginationLast href={`?page=${totalPages}`} />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
