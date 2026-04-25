import { createFileRoute } from '@tanstack/react-router'
import { useLocalStorage } from '@uidotdev/usehooks'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'

import Textarea from '@/components/textarea'
import useTextarea from '@/lib/useTextarea'
import Menu from '@/components/menu'
import { MWLink } from '@/components/mwt-links'

export const Route = createFileRoute('/wt')({
  component: RouteComponent,
})

function RouteComponent() {
  const [text, setText] = useLocalStorage('sfour-wt-text', '')
  const textarea = useTextarea({ text, setText })
  return (
    <>
      <main className='flex grow flex-col'>
        <Textarea {...textarea} textareaProps={{ placeholder: 'wt' }} />
      </main>
      <footer className='bg-cb-dusty-blue sticky bottom-0 flex items-center justify-between px-2 pt-2 pb-6'>
        <div className='flex space-x-4'>
          <Menu />
        </div>
        <div className='flex space-x-4'>
          <MWLink className='text-cb-yellow hover:text-cb-yellow/75'>
            <ArrowTopRightOnSquareIcon className='h-6 w-6' />
          </MWLink>
        </div>
      </footer>
    </>
  )
}
