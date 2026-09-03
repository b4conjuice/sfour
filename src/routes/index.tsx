import { createFileRoute } from '@tanstack/react-router'
import { format, getDay } from 'date-fns'

import Menu from '@/components/menu'
import { MWLink, WTLink } from '@/components/mwt-links'
import SettingsModal from '@/components/settings-modal'
import useMidweekDayNumber from '@/lib/useMidweekDayNumber'
import { getDailyTextUrl } from '@/lib/constants'

export const Route = createFileRoute('/')({ component: Home })

function DTLink({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  const now = new Date()
  return (
    <a
      className={className ?? 'text-cb-pink hover:text-cb-pink/75'}
      href={getDailyTextUrl(now)}
      target='_blank'
    >
      {children ?? 'dt'}
    </a>
  )
}

function Home() {
  const now = new Date()
  const dateString = format(now, 'E M.d.yy')
  const [midweekDayNumber] = useMidweekDayNumber()
  const todaysDayOfWeek = getDay(now)
  const finishedMidweek = todaysDayOfWeek > Number(midweekDayNumber)
  return (
    <>
      <main className='flex grow flex-col p-4'>
        <div className='flex grow flex-col items-center justify-center space-y-4'>
          <h1 className='font-bold'>📖</h1>
          <p>{dateString}</p>
          <DTLink />
          {!finishedMidweek && <MWLink />}
          <WTLink />
          {finishedMidweek && <MWLink />}
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
