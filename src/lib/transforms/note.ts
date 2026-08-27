import type { CreateNoteOptions, NewNote } from '../types'

export function transformTextToNote(text: string) {
  const [title, body] = text.split('\n\n')
  const isList = title.startsWith('= ')
  const listItems = body.split('\n')
  const list = isList ? listItems.filter(item => item !== '') : []

  return {
    title,
    body,
    list,
  }
}

export function transformNoteFields(noteOptions: CreateNoteOptions) {
  const { text, tags } = noteOptions
  const { title, body, list } = transformTextToNote(text)
  return {
    text,
    title,
    body,
    list,
    tags,
  }
}
