import Image from 'next/image'

import type { Character, CharacterResponse } from '@/types/character'
import {
  statusTranslation,
  speciesTranslation,
  statusColor,
} from '@/lib/translations/pt'
import Link from 'next/link'
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
import RandomPage from '@/components/RandomPage'

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
      next: { revalidate: 3600 }
    },
  ).then((res) => res.json())

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
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2 text-center">Personagens</h1>
          {currentPage > 1 && (
            <p className="text-center text-muted-foreground text-lg">
              Página {currentPage} de {totalPages}
            </p>
          )}
          <RandomPage pageType="character" />
        </div>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.results.map((char: Character) => (
            <Link
              href={`/characters/${char.id}`}
              className="
                cursor-pointer
                overflow-hidden
                rounded-2xl
                p-3
                shadow-md
                transition
                duration-300
                hover:scale-105
              dark:bg-brand-deep
              "
              key={char.id}
            >
              <Image
                className="w-75 mt-2 mx-auto h-auto rounded-full"
                src={`/avatars/${char.id}.jpg`}
                loading="lazy"
                alt={char.name}
                width={150}
                height={200}
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
