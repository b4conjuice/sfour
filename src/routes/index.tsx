import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { addDays, format, getDay, subDays } from 'date-fns'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
} from '@heroicons/react/20/solid'

import Menu from '@/components/menu'
import { MWLink, WTLink } from '@/components/mwt-links'
import SettingsModal from '@/components/settings-modal'
import useMidweekDayNumber from '@/lib/useMidweekDayNumber'
import { getDailyTextUrl } from '@/lib/constants'

export const Route = createFileRoute('/')({ component: Home })

function DTLink({
  className,
  children,
  date,
}: {
  className?: string
  children?: React.ReactNode
  date: Date
}) {
  return (
    <a
      className={className ?? 'text-cb-pink hover:text-cb-pink/75'}
      href={getDailyTextUrl(date)}
      target='_blank'
    >
      {children ?? 'dt'}
    </a>
  )
}

function Home() {
  const [date, setDate] = useState(new Date())
  const dateString = format(date, 'E M.d.yy')
  const [midweekDayNumber] = useMidweekDayNumber()
  const todaysDayOfWeek = getDay(date)
  const finishedMidweek = todaysDayOfWeek > Number(midweekDayNumber)
  const today = new Date()
  const isToday = date.toDateString() === today.toDateString()
  return (
    <>
      <main className='flex grow flex-col p-4'>
        <div className='flex grow flex-col items-center justify-center space-y-4'>
          <h1 className='font-bold'>📖</h1>
          <p>{dateString}</p>
          <DTLink date={date} />
          {!finishedMidweek && <MWLink date={date} />}
          <WTLink />
          {finishedMidweek && <MWLink date={date} />}
        </div>
        <div className='flex items-center justify-center gap-4 pt-4'>
          <button
            className='text-cb-yellow hover:text-cb-yellow/75'
            onClick={() => setDate(d => subDays(d, 7))}
          >
            <ChevronDoubleLeftIcon className='h-6 w-6' />
          </button>
          <button
            className='text-cb-yellow hover:text-cb-yellow/75'
            onClick={() => setDate(d => subDays(d, 1))}
          >
            <ChevronLeftIcon className='h-6 w-6' />
          </button>
          <button
            className='text-cb-yellow hover:text-cb-yellow/75 disabled:opacity-25'
            disabled={isToday}
            onClick={() => setDate(new Date())}
          >
            <CalendarIcon className='h-6 w-6' />
          </button>
          <button
            className='text-cb-yellow hover:text-cb-yellow/75'
            onClick={() => setDate(d => addDays(d, 1))}
          >
            <ChevronRightIcon className='h-6 w-6' />
          </button>
          <button
            className='text-cb-yellow hover:text-cb-yellow/75'
            onClick={() => setDate(d => addDays(d, 7))}
          >
            <ChevronDoubleRightIcon className='h-6 w-6' />
          </button>
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
