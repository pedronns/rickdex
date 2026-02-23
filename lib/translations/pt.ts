export const statusTranslation: Record<string, string> = {
  Alive: 'Vivo',
  Dead: 'Morto',
  unknown: 'Desconhecido',
}

export const speciesTranslation: Record<string, string> = {
  Human: 'Humano',
  Robot: 'Robô',
  Alien: 'Alienígena',
  Humanoid: 'Humanóide',
  'Mythological Creature': 'Criatura Mitológica',
  Disease: 'Doença',
  unknown: 'Desconhecido',
}

export const genderTranslation: Record<string, string> = {
  Male: 'Masculino',
  Female: 'Feminino',
  Genderless: 'Sem gênero',
  unknown: 'Desconhecido',
}

export const originTranslation: Record<string, string> = {
  unknown: 'Origem desconhecida',
}

export const locationTranslation: Record<string, string> = {
  unknown: 'Desconhecida',
}

export const statusColor: Record<string, string> = {
  Alive: 'text-green-400',
  Dead: 'text-red-400',
  unknown: 'text-gray-400',
}

export default {
  statusTranslation,
  speciesTranslation,
  genderTranslation,
  originTranslation,
  locationTranslation,
  statusColor,
}
