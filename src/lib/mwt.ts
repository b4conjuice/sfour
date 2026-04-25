const MEETINGS_URL = 'https://wol.jw.org/en/wol/meetings/r1/lp-e/'

export const getMeetingsUrl = (week?: number) => `${MEETINGS_URL}${week ?? ''}`
