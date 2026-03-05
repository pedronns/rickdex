'use client'

import { Character } from '@/types/character'
import { useState, useEffect } from 'react'
import Select, { SingleValue, StylesConfig } from 'react-select'
import { useRouter } from 'next/navigation'

interface Option {
  value: string
  label: string
}

const darkStyles: StylesConfig<Option> = {
  control: (base, state) => ({
    ...base,
    background: '#050505',
    borderColor: state.isFocused ? '#aaa' : '#2a2a2a',
    '&:hover': {
      borderColor: state.isFocused ? '#aaa' : '#555',
    },
    borderWidth: '1.5px',
    boxShadow: 'none',
    padding: '4px 6px',
    cursor: 'text',
    transition: 'all 0.2s ease',
  }),
  menu: (base) => ({
    ...base,
    background: '#141414',
    border: '1.5px solid #2a2a2a',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    marginTop: '6px',
  }),
  menuList: (base) => ({
    ...base,
    padding: '6px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected
      ? '#6366f1'
      : state.isFocused
        ? '#1e1e1e'
        : 'transparent',
    color: state.isSelected ? '#fff' : '#d4d4d8',
    display: 'flex',
    borderRadius: '7px',
    padding: '10px 14px',
    fontSize: '14px',
    cursor: 'pointer',
    lineHeight: '2.5',
    transition: 'background 0.15s ease',
    ':before': {
      backgroundImage: `url(/avatars/${state.data.value}.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: 18,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 36,
      width: 36,
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#f4f4f5',
    fontSize: '14px',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#aaa',
    fontSize: '14px',
  }),
  input: (base) => ({
    ...base,
    color: '#f4f4f5',
    fontSize: '14px',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  clearIndicator: (base) => ({
    ...base,
    display: 'none',
  }),
}

const lightStyles: StylesConfig<Option> = {
  control: (base, state) => ({
    ...base,
    background: '#fff',
    borderColor: state.isFocused ? '#3af' : '#ccc',
    '&:hover': {
      borderColor: state.isFocused ? '#3af' : '#555',
    },
    borderWidth: '1.5px',
    boxShadow: 'none',
    padding: '4px 6px',
    cursor: 'text',
    transition: 'all 0.2s ease',
  }),
  menu: (base) => ({
    ...base,
    background: '#fff',
    border: '1.5px solid #2a2a2a',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    marginTop: '6px',
  }),
  menuList: (base) => ({
    ...base,
    padding: '6px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected
      ? '#6366f1'
      : state.isFocused
        ? '#eee'
        : 'transparent',
    color: state.isSelected ? '#fff' : '#333',
    borderRadius: '7px',
    padding: '10px 14px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background 0.15s ease',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#f4f4f5',
    fontSize: '14px',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#aaa',
    fontSize: '14px',
  }),
  input: (base) => ({
    ...base,
    color: '#222',
    fontSize: '14px',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
}

export default function SearchDropdown() {
  const [options, setOptions] = useState<Option[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const html = document.documentElement

    setIsDark(html.classList.contains('dark'))

    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains('dark'))
    })

    observer.observe(html, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  const router = useRouter()

  useEffect(() => {
    async function loadCharacters() {
      try {
        const res = await fetch('/data/characters.json')
        const data = await res.json()

        setOptions(
          data.map((char: Character) => ({
            value: char.id,
            label: char.name,
          })),
        )
      } catch (err) {
        console.error('Erro ao carregar personagens', err)
      }
    }

    loadCharacters()
  }, [])

  const handleChange = (option: SingleValue<Option>) => {
    if (option) router.push(`/characters/${option.value}`)
  }

  return (
    <div>
      <Select
        options={options}
        styles={isDark ? darkStyles : lightStyles}
        placeholder="Buscar personagens..."
        onChange={(option) => handleChange(option as SingleValue<Option>)}
        onInputChange={(value) => setInputValue(value)}
        filterOption={(option, input) =>
          inputValue.length > 0 &&
          option.label.toLowerCase().startsWith(input.toLowerCase())
        }
        noOptionsMessage={() =>
          inputValue.length > 0 ? 'Nenhum resultado encontrado' : null
        }
      />
    </div>
  )
}
