import { getMeetingsUrl } from '@/lib/mwt'

export function MWLink({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <a
      className={className ?? 'text-cb-pink hover:text-cb-pink/75'}
      href={getMeetingsUrl()}
      target='_blank'
    >
      {children ?? 'mw'}
    </a>
  )
}

export function WTLink({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <a
      className={className ?? 'text-cb-pink hover:text-cb-pink/75'}
      href={getMeetingsUrl()}
      target='_blank'
    >
      {children ?? 'wt'}
    </a>
  )
}
