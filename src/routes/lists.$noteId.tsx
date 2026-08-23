import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Show } from '@clerk/tanstack-react-start'
import {
  DocumentTextIcon,
  ListBulletIcon,
  PencilSquareIcon,
} from '@heroicons/react/20/solid'
import classNames from 'classnames'

import TopNav from '@/components/top-nav'
import { useTRPC } from '@/integrations/trpc/react'
import CommandPalette from '@/components/command-palette'
import { editNoteUrl, editListUrl } from '@/lib/constants'
import Menu from '@/components/menu'
import ScriptureList from '@/components/scripture-list'

export const Route = createFileRoute('/lists/$noteId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { noteId } = Route.useParams()
  const trpc = useTRPC()
  const { data: note, isFetching } = useQuery(
    trpc.notes.getById.queryOptions({
      id: Number(noteId),
    })
  )
  if (isFetching) {
    return <div>loading...</div>
  }
  if (!note) {
    return <div>note not found</div>
  }
  const { title, list } = note
  return (
    <>
      <TopNav title={title} />
      <div className='flex grow flex-col px-4'>
        {/* <pre className='whitespace-pre-wrap'>{note.text}</pre> */}
        <ScriptureList list={list} />
      </div>
      <footer className='bg-cb-dusty-blue sticky bottom-0 flex items-center justify-between px-2 pt-2 pb-6'>
        <div className='flex space-x-4'>
          <Menu />
        </div>
        <div className='flex space-x-4'>
          <a
            href={editListUrl(noteId)}
            className='text-cb-yellow hover:text-cb-yellow/75'
            target='_blank'
          >
            <ListBulletIcon className='h-6 w-6' />
          </a>
          <a
            href={editNoteUrl(noteId)}
            className='text-cb-yellow hover:text-cb-yellow/75'
            target='_blank'
          >
            <PencilSquareIcon className='h-6 w-6' />
          </a>
        </div>
      </footer>
    </>
  )
}
