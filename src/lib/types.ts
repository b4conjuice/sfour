// types.ts
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'

import type { gems, notes } from '@/db/schema'

// SELECT * FROM users → what you get back
export type Note = InferSelectModel<typeof notes>

// INSERT INTO users (...) → what you can send
export type NewNote = InferInsertModel<typeof notes>

export type CreateNoteOptions = Pick<NewNote, 'text' | 'tags'>

export type Gem = InferSelectModel<typeof gems>
export type NewGem = InferInsertModel<typeof gems>
