import { useLocalStorage } from '@uidotdev/usehooks'

export default function useMidweekDayNumber() {
  const [midweekDayNumber, setMidweekDayNumber] = useLocalStorage<
    number | undefined
  >('sfour-midweek-day-number', undefined)
  return [midweekDayNumber, setMidweekDayNumber]
}
