import characters from '@public/data/characters.json'

 type SimpleCharacter = {
  id: number
  name: string
  image: string
  status: string
}


export function fetchSimpleCharacter(id: number): SimpleCharacter | null {
  return characters[id - 1] || null
}