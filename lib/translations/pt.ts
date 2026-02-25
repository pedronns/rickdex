// STATUS
export const statusTranslation: Record<string, string> = {
  Alive: 'Vivo',
  Dead: 'Morto',
  unknown: 'Desconhecido',
}

export const statusColor: Record<string, string> = {
  Alive: 'text-green-400',
  Dead: 'text-red-400',
  unknown: 'text-gray-400',
}

// EPISODE CODE
export function translateEpisodeCode(string: string):string {
  return string.replace('S', 'T')
}

// SPECIES
export const speciesTranslation: Record<string, string> = {
  Alien: 'Alienígena',
  Disease: 'Doença',
  Human: 'Humano',
  Humanoid: 'Humanóide',
  'Mythological Creature': 'Criatura Mitológica',
  Robot: 'Robô',
  unknown: 'Desconhecido',
}

export const genderTranslation: Record<string, string> = {
  Female: 'Feminino',
  Genderless: 'Sem gênero',
  Male: 'Masculino',
  unknown: 'Desconhecido',
}

export const originTranslation: Record<string, string> = {
  unknown: 'Origem desconhecida',
}

// LOCATION
export const locationNameBaseTranslation: Record<string, string> = {
  'Anatomy Park': 'Parque da Anatomia',
  'Bird World': 'Planeta Pássaro',
  'Citadel of Ricks': 'Cidadela dos Ricks',
  'Cronenberg Earth': 'Terra Cronenberg',
  Earth: 'Terra',
  'Gorgon Quadrant': 'Quadrante Gorgon',
  'Hideout Planet': 'Planeta Esconderijo',
  'Monogatron Mothership': 'Nave-mãe dos Monogatrons',
  'Morty’s Story': 'História do Morty',
  'Ricks’s Story': 'História dos Ricks',
  'Mount Space Everest': 'Monte Everest Espacial',
  "Mr. Goldenfold's dream": 'Sonho do Sr. Goldenfold',
  'Midland Quasar': 'Quasar de Midland',
  'Normal Size Bug Dimension': 'Dimensão dos Insetos de Tamanho Normal',
  'Non-Diegetic Alternative Reality': 'Realidade Alternativa Não Diegética',
  'Planet Squanch': 'Planeta Squanch',
  'Purge Planet': 'Planeta do Expurgo',
  "Rick's Battery Microverse": 'Microverso da Bateria do Rick',
  "Rick's Consciousness": 'Consciência do Rick',
  "Rick's Memories": 'Memórias do Rick',
  'The Menagerie': 'O Zoológico',
}

export const locationNameSuffixTranslation: Record<string, string> = {
  'Chair Dimension': 'Dimensão das Cadeiras',
  "Evil Rick's Target Dimension": 'Dimensão Alvo do Rick Mau',
  'Fascist Dimension': 'Dimensão Fascista',
  'Fascist Shrimp Dimension': 'Dimensão dos Camarões Fascistas',
  'Fascist Teddy Bear Dimension': 'Dimensão dos Ursinhos Fascistas',
  'Giant Telepathic Spiders Dimension':
    'Dimensão das Aranhas Gigantes Telepatas',
  'Phone Dimension': 'Dimensão Telefone',
  'Pizza Dimension': 'Dimensão Pizza',
  'Replacement Dimension': 'Dimensão Substituta',
  'Tusk Dimension': 'Dimensão das Morsas',
  'Unknown dimension': 'Dimensão desconhecida',
  'Wasp Dimension': 'Dimensão das Vespas',
}

export function translateLocationName(name: string) {
  const match = name.match(/^(.+?)(\s*\((.*)\))?$/)
  if (!match) return name

  const base = match[1]
  const suffix = match[3] ?? ''

  const translatedBase = locationNameBaseTranslation[base] ?? base

  const translatedSuffix = locationNameSuffixTranslation[suffix] ?? suffix

  return translatedSuffix
    ? `${translatedBase} (${translatedSuffix})`
    : translatedBase
}

// LOCATION - DIMENSION
const dimensionNameBaseTranslation: Record<string, string> = {
  Chair: 'das Cadeiras',
  Cromulon: 'Cromulon',
  Fantasy: 'Fantástica',
  Fascist: 'Fascista',
  'Fascist Shrimp': 'dos Camarões Fascistas',
  'Fascist Teddy Bear': 'dos Ursinhos Fascistas',
  "Evil Rick's Target": 'Alvo do Rick Mau',
  'Giant Telepathic Spiders': 'das Aranhas Gigantes Telepatas',
  Magic: 'Mágica',
  Merged: 'Mesclada',
  'Post-Apocalyptic': 'Pós-apocalíptica',
  Replacement: 'Substituta',
  'Testicle Monster': 'dos Monstros Testículo',
  Tusk: 'das Morsas',
  Wasp: 'das Vespas',
  unknown: 'Desconhecida',
  Unknown: 'Desconhecida',
}

export function translateDimensionName(name: string) {
  if (name.endsWith(' Dimension') || name.endsWith(' dimension')) {
    const base = name.replace(/\s[Dd]imension$/, '')
    const translatedBase = dimensionNameBaseTranslation[base] ?? base

    return `Dimensão ${translatedBase}`
  }

  if (name.startsWith('Dimension ')) {
    const base = name.replace(/^Dimension /, '')
    const translatedBase = dimensionNameBaseTranslation[base] ?? base

    return translatedBase
  }

  return dimensionNameBaseTranslation[name] ?? name
}

// LOCATION - TYPE
export const locationTypeTranslation: Record<string, string> = {
  'Acid Plant': 'Planta Ácida',
  Arcade: 'Fliperama',
  Asteroid: 'Asteroide',
  'Artificially generated world': 'Mundo gerado artificialmente',
  Box: 'Caixa',
  Consciousness: 'Consciência',
  Convention: 'Convenção',
  Country: 'País',
  Customs: 'Alfândega',
  Daycare: 'Creche',
  'Death Star': 'Estrela da Morte',
  Diegesis: 'Diegese',
  Dimension: 'Dimensão',
  Dream: 'Sonho',
  'Dwarf planet (Celestial Dwarf)': 'Planeta anão (Anão Celestial)',
  'Elemental Rings': 'Anéis Elementais',
  'Fantasy town': 'Cidade Fantástica',
  Game: 'Jogo',
  Hell: 'Inferno',
  Human: 'Humano',
  Liquid: 'Líquido',
  Machine: 'Máquina',
  Memory: 'Memória',
  Menagerie: 'Zoológico',
  Microverse: 'Microverso',
  Miniverse: 'Miniverso',
  Mount: 'Monte',
  Nightmare: 'Pesadelo',
  'Non-Diegetic Alternative Reality': 'Realidade Alternativa Não Diegética',
  Planet: 'Planeta',
  'Police Department': 'Delegacia',
  Quadrant: 'Quadrante',
  Reality: 'Realidade',
  Space: 'Espaço',
  'Space station': 'Estação Espacial',
  Spacecraft: 'Nave Espacial',
  Teenyverse: 'Teeniverso',
  Woods: 'Floresta',
  unknown: 'Desconhecido',
}

export default {
  statusTranslation,
  statusColor,
  speciesTranslation,
  genderTranslation,
  originTranslation,
  locationNameBaseTranslation,
  locationNameSuffixTranslation,
  locationTypeTranslation,
  translateLocationName,
  translateDimensionName,
  translateEpisodeCode,
}
