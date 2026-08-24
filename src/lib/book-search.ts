// from: https://github.com/b4conjuice/s5/blob/main/src/components/book-search/lib/index.ts

function sliceScriptureFromBibleParam(bibleParam: string) {
  const bookNumber = Number(bibleParam.slice(0, 2)) as BookNumber
  const chapter = Number(bibleParam.slice(2, 5))
  const verse = Number(bibleParam.slice(5, 8))
  return { bookNumber, chapter, verse }
}

// bibleParam = <booknumber><chapter><verse>
// example = 01001001
// multiple verses = 01001001-01001003
export function transformBibleParamToScripture(bibleParam: string) {
  // mutliple verses
  if (bibleParam.length === 17 && bibleParam.includes('-')) {
    const [first, second] = bibleParam.split('-')
    const { bookNumber, chapter, verse } = sliceScriptureFromBibleParam(first)
    const { verse: secondVerse } = sliceScriptureFromBibleParam(second)
    if (secondVerse <= verse) {
      console.log(
        `transformBibleParamToScripture: invalid bibleParam ${bibleParam}: verses must be in ascending order`
      )
      return ''
    }
    const book = bookNumberToBookMap[bookNumber]
    const bookName = book.name

    const verseSeperator = secondVerse === verse + 1 ? ', ' : '-'
    const scripture: Scripture = {
      bibleParam,
      bookName,
      bookNumber,
      chapter,
      verse: [verse, secondVerse],
      asString: `${bookName} ${chapter}:${verse}${verseSeperator}${secondVerse}`,
    }
    return scripture
  }
  if (bibleParam.length !== 8) {
    console.error(
      `transformTextToScripture: invalid bibleParam ${bibleParam}: must be 8 characters`
    )
    return ''
  }
  const { bookNumber, chapter, verse } =
    sliceScriptureFromBibleParam(bibleParam)
  const book = bookNumberToBookMap[bookNumber]
  const bookName = book.name
  // if (!bookName) { // TODO: confirm if this is needed
  //   console.log(
  //     `transformTextToScripture: bookName not found, invalid bookNumber ${bookNumber} (first 3 characters of text)`
  //   )
  //   return ''
  // }
  const scripture: Scripture = {
    bibleParam,
    bookName,
    bookNumber,
    chapter,
    verse,
    asString: `${bookName} ${chapter}:${verse}`,
  }
  return scripture
}

export function getScriptureUrl(
  bibleParam: string,
  scriptureUrlType: ScriptureUrlType = 'jwlibrary'
) {
  const scripture = transformBibleParamToScripture(bibleParam)
  if (scripture === '') {
    return ''
  }
  const { bookNumber, chapter, verse } = scripture
  const wolBibleText = Array.isArray(verse)
    ? `${bookNumber}/${chapter}#v=${bookNumber}:${chapter}:${verse[0]}-${bookNumber}:${chapter}:${verse[1]}`
    : `${bookNumber}/${chapter}/${verse}`

  const scriptureUrlBase = scriptureUrlTypeToUrlMap[scriptureUrlType]
  const scriptureInUrl = scriptureUrlType === 'wol' ? wolBibleText : bibleParam
  const scriptureUrl = `${scriptureUrlBase}${scriptureInUrl}`
  return scriptureUrl
}

// from: https://github.com/b4conjuice/s5/blob/main/src/components/book-search/lib/types.ts
export type BookNumber = keyof typeof bookNumberToBookMap
export type Scripture = {
  bibleParam: string
  bookName: string
  bookNumber: number
  chapter: number
  verse: number | [number, number]
  asString?: string
}

export type ScriptureUrlType = keyof typeof scriptureUrlTypeToUrlMap

// from: https://github.com/b4conjuice/s5/blob/main/src/components/book-search/lib/constants.ts

const BOOKS = {
  1: {
    name: 'Gen.',
    chapters: 50,
  },
  2: {
    name: 'Ex.',
    chapters: 40,
  },
  3: {
    name: 'Lev.',
    chapters: 27,
  },
  4: {
    name: 'Num.',
    chapters: 36,
  },
  5: {
    name: 'Deut.',
    chapters: 34,
  },
  6: {
    name: 'Josh.',
    chapters: 24,
  },
  7: {
    name: 'Judg.',
    chapters: 21,
  },
  8: {
    name: 'Ruth',
    chapters: 4,
  },
  9: {
    name: '1 Sam.',
    chapters: 31,
  },
  10: {
    name: '2 Sam.',
    chapters: 24,
  },
  11: {
    name: '1 Ki.',
    chapters: 22,
  },
  12: {
    name: '2 Ki.',
    chapters: 25,
  },
  13: {
    name: '1 Chron.',
    chapters: 29,
  },
  14: {
    name: '2 Chron.',
    chapters: 36,
  },
  15: {
    name: 'Ezra',
    chapters: 10,
  },
  16: {
    name: 'Neh.',
    chapters: 13,
  },
  17: {
    name: 'Esth.',
    chapters: 10,
  },
  18: {
    name: 'Job',
    chapters: 42,
  },
  19: {
    name: 'Ps.',
    chapters: 150,
  },
  20: {
    name: 'Prov.',
    chapters: 31,
  },
  21: {
    name: 'Eccl.',
    chapters: 12,
  },
  22: {
    name: 'Song of Sol.',
    chapters: 8,
  },
  23: {
    name: 'Isa.',
    chapters: 66,
  },
  24: {
    name: 'Jer.',
    chapters: 52,
  },
  25: {
    name: 'Lam.',
    chapters: 5,
  },
  26: {
    name: 'Ezek.',
    chapters: 48,
  },
  27: {
    name: 'Dan.',
    chapters: 12,
  },
  28: {
    name: 'Hos.',
    chapters: 14,
  },
  29: {
    name: 'Joel',
    chapters: 3,
  },
  30: {
    name: 'Amos',
    chapters: 9,
  },
  31: {
    name: 'Obad.',
    chapters: 1,
  },
  32: {
    name: 'Jonah',
    chapters: 4,
  },
  33: {
    name: 'Mic.',
    chapters: 7,
  },
  34: {
    name: 'Nah.',
    chapters: 3,
  },
  35: {
    name: 'Hab.',
    chapters: 3,
  },
  36: {
    name: 'Zeph.',
    chapters: 3,
  },
  37: {
    name: 'Hag.',
    chapters: 2,
  },
  38: {
    name: 'Zech.',
    chapters: 14,
  },
  39: {
    name: 'Mal.',
    chapters: 4,
  },
  40: {
    name: 'Matt.',
    chapters: 28,
  },
  41: {
    name: 'Mark',
    chapters: 16,
  },
  42: {
    name: 'Luke',
    chapters: 24,
  },
  43: {
    name: 'John',
    chapters: 21,
  },
  44: {
    name: 'Acts',
    chapters: 28,
  },
  45: {
    name: 'Rom.',
    chapters: 16,
  },
  46: {
    name: '1 Cor.',
    chapters: 16,
  },
  47: {
    name: '2 Cor.',
    chapters: 13,
  },
  48: {
    name: 'Gal.',
    chapters: 6,
  },
  49: {
    name: 'Eph.',
    chapters: 6,
  },
  50: {
    name: 'Phil.',
    chapters: 4,
  },
  51: {
    name: 'Col.',
    chapters: 4,
  },
  52: {
    name: '1 Thess.',
    chapters: 5,
  },
  53: {
    name: '2 Thess.',
    chapters: 3,
  },
  54: {
    name: '1 Tim.',
    chapters: 6,
  },
  55: {
    name: '2 Tim.',
    chapters: 4,
  },
  56: {
    name: 'Titus',
    chapters: 3,
  },
  57: {
    name: 'Philem.',
    chapters: 1,
  },
  58: {
    name: 'Heb.',
    chapters: 13,
  },
  59: {
    name: 'Jas.',
    chapters: 5,
  },
  60: {
    name: '1 Pet.',
    chapters: 5,
  },
  61: {
    name: '2 Pet.',
    chapters: 3,
  },
  62: {
    name: '1 John',
    chapters: 5,
  },
  63: {
    name: '2 John',
    chapters: 1,
  },
  64: {
    name: '3 John',
    chapters: 1,
  },
  65: {
    name: 'Jude',
    chapters: 1,
  },
  66: {
    name: 'Rev.',
    chapters: 22,
  },
} as const

export const bookNumberToBookMap = BOOKS

// examples:
// jwlibrary://view/finder?srcid=jwlshare&wtlocale=E&prefer=lang&pub=nwtsty&bible=01001001
// https://www.jw.org/finder?srcid=jwlshare&wtlocale=E&prefer=lang&pub=nwtsty&bible=01001001
// https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/1/1/1
export const scriptureUrlTypeToUrlMap = {
  jwlibrary:
    'jwlibrary://view/finder?srcid=jwlshare&wtlocale=E&prefer=lang&pub=nwtsty&bible=',
  jworg:
    'https://www.jw.org/finder?srcid=jwlshare&wtlocale=E&prefer=lang&pub=nwtsty&bible=',
  wol: 'https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/',
} as const
