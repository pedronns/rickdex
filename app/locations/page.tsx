import type { Location, LocationResponse } from '@/types/location'

import Link from 'next/link'

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

import {
  locationTypeTranslation,
  translateDimensionName,
  translateLocationName,
} from '@/lib/translations/pt'


type Props = {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams

  const currentPage = Number(params.page ?? 1)

  const data: LocationResponse = await fetch(
    `https://rickandmortyapi.com/api/location?page=${currentPage}`,
  ).then((res) => res.json())

  const locations = data.results

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
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2 text-center">Locais</h1>
          {currentPage > 1 && (
            <p className="text-center text-muted-foreground text-lg">
              Página {currentPage} de {totalPages}
            </p>
          )}
          <RandomPage pageType="location" />
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {locations.map((location: Location) => (
            <Link
              href={`/locations/${location.id}`}
              key={location.id}
              className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 bg-card border border-border hover:border- shadow-lg hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {translateLocationName(location.name)}
                  </h2>
                </div>

                <div className="space-y-3 pt-2">
                  {location.type && (
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-semibold text-muted-foreground min-w-fit">
                        Tipo:
                      </span>
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        {locationTypeTranslation[location.type] ||
                          location.type}
                      </span>
                    </div>
                  )}

                  {location.dimension && (
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-semibold text-muted-foreground min-w-fit">
                        Dimensão:
                      </span>
                      <span className="text-sm text-foreground/80">
                        {translateDimensionName(location.dimension)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    ID: {location.id}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Pagination className="mx-auto">
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
