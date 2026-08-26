export const newNoteUrl = 'https://s4.dlopez.app/notes/new'
export const newListUrl = 'https://s4.dlopez.app/lists/new'

export const editNoteUrl = (noteId: string | number) =>
  `https://s4.dlopez.app/notes/${noteId}`

export const editListUrl = (noteId: string | number) =>
  `https://s4.dlopez.app/lists/${noteId}`

export const textUrl = (bibleParam: string) =>
  `https://s4.dlopez.app/text/${bibleParam}`

export const markdownNoteUrl = (noteId: string) =>
  `https://md.n4.dlopez.app/${noteId}`

export const SCRIPTURE_LIST_TAGS = ['📖', '📚']
export const GEM_TAGS = ['📖', '💎']
