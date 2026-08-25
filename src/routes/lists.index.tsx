import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Show } from '@clerk/tanstack-react-start'
import { PencilSquareIcon } from '@heroicons/react/20/solid'

import TopNav from '@/components/top-nav'
import { useTRPC } from '@/integrations/trpc/react'
import {
  editListUrl,
  editNoteUrl,
  newListUrl,
  SCRIPTURE_LIST_TAGS,
} from '@/lib/constants'
import Menu from '@/components/menu'

export const Route = createFileRoute('/lists/')({
  component: RouteComponent,
})

function ScriptureLists() {
  const trpc = useTRPC()
  const { data: lists, isFetching } = useQuery(trpc.notes.getAll.queryOptions())
  if (isFetching) {
    return (
      <ul className='divide-cb-dusty-blue divide-y'>
        {Array.from(
          {
            length: 15,
          },
          (_, i) => i + 1
        ).map((note, index) => (
          <li key={index} className='group flex h-14 space-x-2'>
            <div className='text-cb-pink hover:text-cb-pink/75 flex grow items-center justify-between py-4 group-first:pt-0'></div>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <ul className='divide-cb-dusty-blue divide-y'>
      {(lists ?? [])
        .filter(note =>
          SCRIPTURE_LIST_TAGS.every(tag => note.tags.includes(tag))
        )
        .map(note => (
          <li key={note.id} className='group flex items-center space-x-2'>
            <Link
              to={`/lists/${note.id}`}
              className='text-cb-pink hover:text-cb-pink/75 flex grow items-center justify-between py-4 group-first:pt-0'
            >
              <div>
                <div>{note.title}</div>
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
        ))}
    </ul>
  )
}

function RouteComponent() {
  return (
    <>
      <TopNav title='lists' />
      <main className='flex grow flex-col gap-4 px-4'>
        <Show when='signed-out'>
          <p>login to see your lists</p>
        </Show>
        <Show when='signed-in'>
          <ScriptureLists />
        </Show>
      </main>
      <footer className='bg-cb-dusty-blue sticky bottom-0 flex items-center justify-between px-2 pt-2 pb-6'>
        <div className='flex space-x-4'>
          <Menu />
        </div>
        <div className='flex space-x-4'>
          <a
            className='text-cb-yellow hover:text-cb-yellow/75 disabled:pointer-events-none disabled:opacity-25'
            href={newListUrl}
            target='_blank'
          >
            <PencilSquareIcon className='h-6 w-6' />
          </a>
        </div>
      </footer>
    </>
  )
}
