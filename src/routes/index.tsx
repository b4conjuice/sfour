import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'

import Menu from '@/components/menu'
import { MWLink, WTLink } from '@/components/mwt-links'
import SettingsModal from '@/components/settings-modal'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const now = new Date()
  const dateString = format(now, 'M.d.yy')
  return (
    <>
      <main className='flex grow flex-col p-4'>
        <div className='flex grow flex-col items-center justify-center space-y-4'>
          <h1 className='font-bold'>📖</h1>
          <p>{dateString}</p>
          <MWLink />
          <WTLink />
        </div>
      </main>
      <footer className='bg-cb-dusty-blue sticky bottom-0 flex items-center justify-between px-2 pt-2 pb-6'>
        <div className='flex space-x-4'>
          <Menu />
        </div>
        <div className='flex space-x-4'>
          <SettingsModal />
        </div>
      </footer>
    </>
  )
}
