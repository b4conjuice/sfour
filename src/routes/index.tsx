import { createFileRoute } from '@tanstack/react-router'

import Menu from '@/components/menu'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <main className='flex grow flex-col p-4'>
        <div className='flex grow flex-col items-center justify-center space-y-4'>
          <h1 className='font-bold'>📖</h1>
        </div>
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
