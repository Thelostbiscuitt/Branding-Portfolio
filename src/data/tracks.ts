/**
 * HABIBCORE® — background sound.
 *
 * Titles and artists are taken verbatim from the masters' filenames
 * in /public/Music (BlvckOreo, 2021–2023). Masters and raw downloads stay
 * local (gitignored); only the slugged .mp3 derivatives ship.
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
  { title: '1 Love Drill', artist: 'BLVCK OREO', file: '/Music/1-love-drill.mp3' },
  { title: '234drill', artist: 'BLVCK OREO', file: '/Music/234drill.mp3' },
  { title: 'Oyoon Your Own', artist: 'BLVCK OREO', file: '/Music/oyoon-your-own.mp3' },
  { title: 'Calm Down (Cover)', artist: 'BLVCK OREO', file: '/Music/calm-down-cover.mp3' },
  { title: 'Cheques', artist: 'BLVCK OREO', file: '/Music/cheques.mp3' },
  { title: 'Fake Heads', artist: 'BLVCK OREO', file: '/Music/fake-heads.mp3' },
  { title: 'GIDI Anthem', artist: 'BLVCK OREO', file: '/Music/gidi-anthem.mp3' },
  { title: 'Good Days', artist: 'BLVCK OREO', file: '/Music/good-days.mp3' },
  { title: 'I Deserve It', artist: 'BLVCK OREO', file: '/Music/i-deserve-it.mp3' },
  { title: 'Im That OG', artist: 'BLVCK OREO', file: '/Music/im-that-og.mp3' },
  { title: 'Lagos Party', artist: 'BLVCK OREO', file: '/Music/lagos-party.mp3' },
  { title: 'Marceline', artist: 'BLVCK OREO', file: '/Music/marceline.mp3' },
  { title: 'Money Wahala', artist: 'BLVCK OREO', file: '/Music/money-wahala.mp3' },
  { title: 'Return of the Dead', artist: 'BLVCK OREO', file: '/Music/return-of-the-dead.mp3' },
  { title: 'Set Me Free', artist: 'BLVCK OREO', file: '/Music/set-me-free.mp3' },
  { title: 'Spazzing Hard', artist: 'BLVCK OREO', file: '/Music/spazzing-hard.mp3' },
  { title: "Trap Lan'je", artist: 'BLVCK OREO', file: '/Music/trap-lan-je.mp3' },
  { title: 'Vice City', artist: 'BLVCK OREO', file: '/Music/vice-city.mp3' },
  { title: 'VPN Visa', artist: 'BLVCK OREO', file: '/Music/vpn-visa.mp3' },
  { title: 'Wild Wild West', artist: 'BLVCK OREO', file: '/Music/wild-wild-west.mp3' },
]

