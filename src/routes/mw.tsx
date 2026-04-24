import { createFileRoute } from '@tanstack/react-router'
import { useLocalStorage } from '@uidotdev/usehooks'

import Textarea from '@/components/textarea'
import useTextarea from '@/lib/useTextarea'
import Menu from '@/components/menu'

export const Route = createFileRoute('/mw')({
  component: RouteComponent,
})

function RouteComponent() {
  const [text, setText] = useLocalStorage('sfour-mw-text', '')
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
        <div className='flex space-x-4'></div>
      </footer>
    </>
  )
}
