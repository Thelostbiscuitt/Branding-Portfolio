/**
 * HABIBCORE® — background sound.
 *
 * Titles and artists are taken verbatim from the WAV masters' filenames
 * in /public/Music (BlvckOreo, 2021–2023). The .wav masters stay local
 * (gitignored); only 192kbps .mp3 derivatives ship.
 * Nothing invented — if it isn't a file here, it isn't in the set.
 */

export type Track = {
  title: string
  artist: string
  /** path under /public */
  file: string
}

export const tracks: Track[] = [
  { title: "What's Up!!!", artist: 'BLVCK OREO', file: '/Music/whats-up.mp3' },
  { title: 'Afro Woo', artist: 'BLVCK OREO × DROXX', file: '/Music/afro-woo.mp3' },
  { title: 'Finer Things', artist: 'BLVCK OREO', file: '/Music/finer-things.mp3' },
  { title: 'Vibes & Inshallah', artist: 'BLVCK OREO', file: '/Music/vibes-inshallah.mp3' },
]
