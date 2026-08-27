import { auth } from '@clerk/tanstack-react-start/server'
import { and, eq } from 'drizzle-orm'

import { db } from '@/db'
import { notes, gems } from './schema'
import type { NewGem, NewNote, Note } from '@/lib/types'
import { GEM_TAGS } from '@/lib/constants'

const LIMIT = 100

export async function getNotes() {
  const user = await auth()
  if (!user.userId) throw new Error('unauthorized')
  return await db.query.notes.findMany({
    where: (model, { eq }) => eq(model.author, user.userId),
    orderBy: (model, { desc }) => desc(model.updatedAt),
    limit: LIMIT,
  })
}

export async function getNote(id: number) {
  const note = await db.query.notes.findFirst({
    where: (model, { eq }) => and(eq(model.id, id)),
  })

  return note
}

export async function saveNote(note: Note | NewNote) {
  const { tags } = note
  const newTags = [...new Set([...tags, ...GEM_TAGS])]

  const newNotes = await db
    .insert(notes)
    .values(note)
    .onConflictDoUpdate({
      target: notes.id,
      set: {
        ...note,
        tags: newTags,
      },
    })
    .returning()
  if (newNotes.length < 0) {
    throw new Error('something went wrong')
  }
  const newNote = newNotes[0]
  return newNote
}

// TODO: add option to filter by bibleParam
export async function getGems() {
  const user = await auth()

  if (!user.userId) throw new Error('unauthorized')

  // First get note IDs for this user
  const userNoteIds = db
    .select({ id: notes.id })
    .from(notes)
    .where(eq(notes.author, user.userId))

  const gemsWithNotes = await db.query.gems.findMany({
    with: {
      note: true,
    },
    where: (model, { inArray }) => inArray(model.noteId, userNoteIds),
    orderBy: (model, { desc }) => desc(model.noteId),
    limit: LIMIT,
  })

  return gemsWithNotes.map(gem => ({
    ...gem.note,
    gem: {
      bibleParam: gem.bibleParam,
    },
  }))
}

export async function saveGem({ noteId, bibleParam }: NewGem) {
  const newGem = await db.insert(gems).values({
    noteId,
    bibleParam,
  })
  return newGem
}
