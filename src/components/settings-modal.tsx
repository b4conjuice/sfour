import { useState } from 'react'

import { Cog6ToothIcon } from '@heroicons/react/20/solid'

import Modal from '@/components/ui/modal'
import useMidweekDayNumber from '@/lib/useMidweekDayNumber'

// day of week
// 0 = sunday
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function SettingsModal() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [midweekDayNumber, setMidweekDayNumber] = useMidweekDayNumber()
  return (
    <>
      <button
        type='button'
        onClick={() => {
          setIsSettingsModalOpen(true)
        }}
        className='text-cb-yellow hover:text-cb-yellow/75'
      >
        <Cog6ToothIcon className='h-6 w-6' />
      </button>
      <Modal
        isOpen={isSettingsModalOpen}
        setIsOpen={setIsSettingsModalOpen}
        title='settings'
      >
        <label className='block'>when is your midweek meeting?</label>
        <select
          className='bg-cobalt w-full'
          value={midweekDayNumber}
          onChange={e => {
            setMidweekDayNumber(Number(e.target.value))
          }}
        >
          <option>select day</option>
          {DAYS.map((day, index) => (
            <option key={index} value={index}>
              {day}
            </option>
          ))}
        </select>
      </Modal>
    </>
  )
}
