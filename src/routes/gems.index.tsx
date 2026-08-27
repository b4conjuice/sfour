import { createFileRoute, Link } from '@tanstack/react-router'
import { Show } from '@clerk/tanstack-react-start'
import { useQuery } from '@tanstack/react-query'
import { PencilSquareIcon } from '@heroicons/react/20/solid'

import TopNav from '@/components/top-nav'
import Menu from '@/components/menu'
import { useTRPC } from '@/integrations/trpc/react'
import { editNoteUrl, GEM_TAGS } from '@/lib/constants'
import { transformBibleParamToScripture } from '@/lib/book-search'

export const Route = createFileRoute('/gems/')({
  component: RouteComponent,
})

function GemList() {
  const trpc = useTRPC()
  const { data: gems, isFetching } = useQuery(
    trpc.notes.getAllGems.queryOptions()
  )
  if (isFetching) {
    return (
      <ul className='divide-cb-dusty-blue divide-y'>
        {Array.from(
          {
            length: 15,
          },
          (_, i) => i + 1
        ).map((_, index) => (
          <li key={index} className='group flex h-14 space-x-2'>
            <div className='text-cb-pink hover:text-cb-pink/75 flex grow items-center justify-between py-4 group-first:pt-0'></div>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <ul className='divide-cb-dusty-blue divide-y'>
      {(gems ?? [])
        .filter(note => GEM_TAGS.every(tag => note.tags.includes(tag)))
        .map(note => {
          const scripture = transformBibleParamToScripture(note.gem.bibleParam)
          return (
            <li key={note.id} className='group flex items-center space-x-2'>
              <Link
                to={`/notes/${note.id}`}
                className='text-cb-pink hover:text-cb-pink/75 flex grow items-center justify-between py-4 group-first:pt-0'
              >
                <div>
                  <div>{note.title}</div>
                  {scripture !== '' && <div>{scripture.asString}</div>}
                </div>
              </Link>
              <a
                className='text-cb-pink hover:text-cb-pink/75 disabled:pointer-events-none disabled:opacity-25'
                href={editNoteUrl(note.id)}
                target='_blank'
              >
                <PencilSquareIcon className='h-6 w-6' />
              </a>
            </li>
          )
        })}
    </ul>
  )
}

const NEW_GEM_URL = `https://s5.dlo.app/gems/new`

function RouteComponent() {
  return (
    <>
      <TopNav title='gems' />
      <main className='flex grow flex-col gap-4 px-4'>
        <Show when='signed-out'>
          <p>login to see your gems</p>
        </Show>
        <Show when='signed-in'>
          <GemList />
        </Show>
      </main>
      <footer className='bg-cb-dusty-blue sticky bottom-0 flex items-center justify-between px-2 pt-2 pb-6'>
        <div className='flex space-x-4'>
          <Menu />
        </div>
        <div className='flex space-x-4'>
          <a
            className='text-cb-yellow hover:text-cb-yellow/75 disabled:pointer-events-none disabled:opacity-25'
            href={NEW_GEM_URL}
            target='_blank'
          >
            <PencilSquareIcon className='h-6 w-6' />
          </a>
        </div>
      </footer>
    </>
  )
}
