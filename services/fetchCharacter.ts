import characters from '@/data/characters.json'
import { SimpleCharacter } from '@/types/character'

export function fetchCharacter(id: number): SimpleCharacter | null {
  return characters[id - 1] || null
}