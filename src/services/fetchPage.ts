import { CharactersResponse } from '@/types/character'
import { EpisodesResponse } from '@/types/episode'
import { LocationsResponse } from '@/types/location'

type EndpointMap = {
  character: CharactersResponse
  episode: EpisodesResponse
  location: LocationsResponse
}

export async function fetchPage<T extends keyof EndpointMap>(
  endpoint: T,
  page: number,
): Promise<EndpointMap[T]> {
  const res = await fetch(
    `https://rickandmortyapi.com/api/${endpoint}?page=${page}`,
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint} page ${page}`)
  }

  const data = (await res.json()) as EndpointMap[T]

  return data
}
