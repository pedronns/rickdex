import icon from '../../app/icon.png'
import Image from 'next/image'
import RandomPage from '@/components/RandomPage'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-3xl flex flex-col items-center justify-center gap-6 py-24 px-8 bg-white dark:bg-black rounded-lg shadow-sm">
        <Image
          className=" transition-transform hover:scale-105"
          src={icon}
          alt="logo"
          width={128}
          height={128}
          quality={75}
        />
        <h1 className="text-8xl font-thin tracking-tight text-black dark:text-zinc-50">
          404
        </h1>
        <p className="text-lg text-center text-zinc-600 dark:text-zinc-400">
          Não foi possível encontrar o episódio requisitado
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            href="/episodes"
            className="inline-flex items-center text-center rounded-full bg-foreground px-5 py-3 text-background font-medium hover:opacity-95"
          >
            Voltar para episódios
          </Link>
        </div>
            <RandomPage pageType='episode' />
      </main>
    </div>
  )
}
