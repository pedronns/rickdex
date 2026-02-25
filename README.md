# Rickdex

Rickdex é um frontend em Next.js / TypeScript que consome a API pública "Rick and Morty API" para exibir episódios, personagens e localizações da série.

## Requisitos

- Node.js 18+ recomendado
- npm ou yarn

## Instalação

No diretório do projeto, instale dependências:

```bash
npm install
# ou
# yarn
```

## Estrutura relevante

- `app/` — rotas e páginas (Next.js App Router)
  - `app/episodes/[id]/page.tsx` — página de detalhe de episódio
  - `app/locations/[id]/page.tsx` — página de detalhe de localização
  - `app/characters/` — listagens e detalhes de personagens
- `components/` — componentes reutilizáveis (Navbar, UI)
- `lib/` — utilitários
- `types/` — definições TypeScript

## Observações

- A aplicação consome a API pública em `https://rickandmortyapi.com/api`.
- Algumas páginas usam a opção de revalidação (`next` fetch revalidate) para cache.

## Contato

Para dúvidas ou sugestões, abra uma issue no repositório.
