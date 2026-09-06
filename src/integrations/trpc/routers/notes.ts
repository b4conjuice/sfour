import { z } from 'zod'
import { auth } from '@clerk/tanstack-react-start/server'
import { TRPCError } from '@trpc/server'
import type { TRPCRouterRecord } from '@trpc/server'

import { publicProcedure } from '../init'

import { transformNoteFields } from '@/lib/transforms/note'
import { getGems, getNote, getNotes, saveGem, saveNote } from '@/db/notes'

export const notesRouter = {
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const noteId = input.id

      return await getNote(noteId)
    }),
  getAll: publicProcedure
    .input(
      z
        .object({ offset: z.number().optional(), q: z.string().optional() })
        .optional()
    )
    .query(async ({ input }) => {
      return await getNotes(input)
    }),
  // getGemsByBibleParam: publicProcedure
  //   .input(z.object({ bibleParam: z.string() }))
  //   .query(async ({ input }) => {
  //     const { bibleParam } = input

  //     return await getGemByBibleParam(bibleParam)
  //   }),
  getAllGems: publicProcedure.query(async () => {
    return await getGems()
  }),
  saveGem: publicProcedure
    .input(
      z.object({
        noteOptions: z.object({
          text: z.string(),
          tags: z.array(z.string()),
        }),
        bibleParam: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { noteOptions, bibleParam } = input

      const user = await auth()

      if (!user.userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'unauthorized - you must be signed in',
        })
      }

      const note = {
        ...transformNoteFields(noteOptions),
        author: user.userId,
      }
      const { id: noteId } = await saveNote(note)

      await saveGem({
        noteId,
        bibleParam,
      })

      return noteId
    }),
} satisfies TRPCRouterRecord
