import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useLocalStorage } from '@uidotdev/usehooks'
import {
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
} from '@heroicons/react/20/solid'
import classNames from 'classnames'

import Textarea from '@/components/textarea'
import useTextarea from '@/lib/useTextarea'
import Menu from '@/components/menu'
import { MWLink } from '@/components/mwt-links'
import Modal from '@/components/ui/modal'

export const Route = createFileRoute('/mw')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'mw' }],
  }),
})

function RouteComponent() {
  const [text, setText] = useLocalStorage('sfour-mw-text', '')
  const [url, setUrl] = useLocalStorage('sfour-mw-url', '')
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const textarea = useTextarea({ text, setText })
  return (
    <>
      <main className='flex grow flex-col'>
        <Textarea {...textarea} textareaProps={{ placeholder: 'mw' }} />
      </main>
      <footer className='bg-cb-dusty-blue sticky bottom-0 flex items-center justify-between px-2 pt-2 pb-6'>
        <div className='flex space-x-4'>
          <Menu />
        </div>
        <div className='flex space-x-4'>
          <button
            type='button'
            onClick={() => {
              setIsSettingsModalOpen(true)
            }}
            className='text-cb-yellow hover:text-cb-yellow/75'
          >
            <Cog6ToothIcon className='h-6 w-6' />
          </button>
          <a
            href={url}
            className={classNames(
              'text-cb-yellow hover:text-cb-yellow/75',
              !url ? 'pointer-events-none opacity-25' : ''
            )}
            target='_blank'
          >
            <PencilSquareIcon className='h-6 w-6' />
          </a>
          <MWLink className='text-cb-yellow hover:text-cb-yellow/75'>
            <ArrowTopRightOnSquareIcon className='h-6 w-6' />
          </MWLink>
        </div>
      </footer>
      <Modal
        isOpen={isSettingsModalOpen}
        setIsOpen={setIsSettingsModalOpen}
        title='settings'
      >
        <input
          type='text'
          className='bg-cb-blue w-full disabled:pointer-events-none disabled:opacity-25'
          placeholder='url'
          value={url}
          onChange={e => {
            setUrl(e.target.value)
          }}
        />
      </Modal>
    </>
  )
}
