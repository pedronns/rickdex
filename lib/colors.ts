export const getLocationTypeColor = (type: string) => {
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

export const statusColor: Record<string, string> = {
  Alive: 'text-green-400',
  Dead: 'text-red-400',
  unknown: 'text-gray-400',
}

export const statusDotColor: Record<string, string> = {
  Alive: 'bg-green-500',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-400',
}
