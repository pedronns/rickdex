type Endpoint = 'episode' | 'character' | 'location'

export async function fetchID(id: number, endpoint: Endpoint) {
  const response: Response = await fetch(
    `https://rickandmortyapi.com/api/${endpoint}/${id}`,
    { next: { revalidate: 3600 } },
  )

  return response
}
