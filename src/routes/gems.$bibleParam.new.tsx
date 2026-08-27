import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Show } from '@clerk/tanstack-react-start'
import { useLocalStorage } from '@uidotdev/usehooks'

import Menu from '@/components/menu'
import { PencilSquareIcon } from '@heroicons/react/20/solid'
import { GEM_TAGS } from '@/lib/constants'
import useTextarea from '@/lib/useTextarea'
import Textarea from '@/components/textarea'
import { useTRPC } from '@/integrations/trpc/react'
import { useMutation } from '@tanstack/react-query'

export const Route = createFileRoute('/gems/$bibleParam/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { bibleParam } = Route.useParams()
  const [text, setText] = useLocalStorage('sfour-new-gem-text', '')
  const textarea = useTextarea({ text, setText })
  const hasChanges = text !== '' // is this redundant?
  const canSave = !(!hasChanges || text === '')

  const trpc = useTRPC()
  const { mutateAsync: saveGem, isPending: isSavingGem } = useMutation(
    trpc.notes.saveGem.mutationOptions()
  )
  return (
    <>
      <main className='flex grow flex-col gap-4'>
        <Show when='signed-out'>
          {/* TODO: allow editing gem locally first */}
          <p>login to save your gem</p>
        </Show>
        <Show when='signed-in'>
          <Textarea
            {...textarea}
            textareaProps={{ placeholder: `new gem for ${bibleParam}` }}
          />
        </Show>
      </main>
      <footer className='bg-cb-dusty-blue sticky bottom-0 flex items-center justify-between px-2 pt-2 pb-6'>
        <div className='flex space-x-4'>
          <Menu />
        </div>
        <div className='flex space-x-4'>
          <Show when='signed-in'>
            <button
              className='text-cb-yellow hover:text-cb-yellow/75 disabled:pointer-events-none disabled:opacity-25'
              type='button'
              onClick={async () => {
                const noteId = await saveGem({
                  noteOptions: {
                    text,
                    tags: GEM_TAGS,
                  },
                  bibleParam,
                })
                setText('')

                await navigate({
                  to: `/notes/${noteId}`,
                })
              }}
              disabled={!canSave || isSavingGem}
            >
              <PencilSquareIcon className='h-6 w-6' />
            </button>
          </Show>
        </div>
      </footer>
    </>
  )
}
