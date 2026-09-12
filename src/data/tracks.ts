/**
 * HABIBCORE® — background sound.
 *
 * Titles/artists come from the masters' filenames in /public/Music
 * (BlvckOreo, 2021–2023). bpm / energy / mood are MEASURED from the audio
 * by scripts/analyze-tracks.mjs (onset autocorrelation, RMS energy,
 * zero-crossing brightness) — re-run that script after adding songs and
 * paste its rows here. Masters and raw downloads stay local (gitignored);
 * only the slugged .mp3 derivatives ship.
 * Nothing invented — if it isn't a file here, it isn't in the set.
 */

export type Track = {
  title: string
  artist: string
  /** path under /public */
  file: string
  /** measured (scripts/analyze-tracks.mjs) */
  bpm: number
  /** measured RMS energy, 0..1 */
  energy: number
  /** derived bucket: CHILL · GROOVE · PARTY · DRILL · RAGE · NIGHT */
  mood: string
}

export const tracks: Track[] = [
  { title: "What's Up!!!", artist: 'BLVCK OREO', file: '/Music/whats-up.mp3', bpm: 140, energy: 0.68, mood: 'DRILL' },
  { title: 'Afro Woo', artist: 'BLVCK OREO × DROXX', file: '/Music/afro-woo.mp3', bpm: 144, energy: 0.64, mood: 'DRILL' },
  { title: 'Finer Things', artist: 'BLVCK OREO', file: '/Music/finer-things.mp3', bpm: 140, energy: 0.5, mood: 'DRILL' },
  { title: 'Vibes & Inshallah', artist: 'BLVCK OREO', file: '/Music/vibes-inshallah.mp3', bpm: 152, energy: 0.73, mood: 'DRILL' },
  { title: '1 Love Drill', artist: 'BLVCK OREO', file: '/Music/1-love-drill.mp3', bpm: 144, energy: 0.64, mood: 'DRILL' },
  { title: '234drill', artist: 'BLVCK OREO', file: '/Music/234drill.mp3', bpm: 144, energy: 0.65, mood: 'DRILL' },
  { title: 'Oyoon Your Own', artist: 'BLVCK OREO', file: '/Music/oyoon-your-own.mp3', bpm: 140, energy: 0.73, mood: 'DRILL' },
  { title: 'Calm Down (Cover)', artist: 'BLVCK OREO', file: '/Music/calm-down-cover.mp3', bpm: 108, energy: 0.76, mood: 'PARTY' },
  { title: 'Cheques', artist: 'BLVCK OREO', file: '/Music/cheques.mp3', bpm: 132, energy: 0.62, mood: 'DRILL' },
  { title: 'Fake Heads', artist: 'BLVCK OREO', file: '/Music/fake-heads.mp3', bpm: 148, energy: 0.68, mood: 'DRILL' },
  { title: 'GIDI Anthem', artist: 'BLVCK OREO', file: '/Music/gidi-anthem.mp3', bpm: 99, energy: 0.64, mood: 'PARTY' },
  { title: 'Good Days', artist: 'BLVCK OREO', file: '/Music/good-days.mp3', bpm: 123, energy: 0.66, mood: 'PARTY' },
  { title: 'I Deserve It', artist: 'BLVCK OREO', file: '/Music/i-deserve-it.mp3', bpm: 144, energy: 0.64, mood: 'DRILL' },
  { title: 'Im That OG', artist: 'BLVCK OREO', file: '/Music/im-that-og.mp3', bpm: 140, energy: 0.68, mood: 'DRILL' },
  { title: 'Lagos Party', artist: 'BLVCK OREO', file: '/Music/lagos-party.mp3', bpm: 126, energy: 0.75, mood: 'PARTY' },
  { title: 'Marceline', artist: 'BLVCK OREO', file: '/Music/marceline.mp3', bpm: 130, energy: 0.65, mood: 'DRILL' },
  { title: 'Money Wahala', artist: 'BLVCK OREO', file: '/Music/money-wahala.mp3', bpm: 152, energy: 0.66, mood: 'DRILL' },
  { title: 'Return of the Dead', artist: 'BLVCK OREO', file: '/Music/return-of-the-dead.mp3', bpm: 162, energy: 0.74, mood: 'PARTY' },
  { title: 'Set Me Free', artist: 'BLVCK OREO', file: '/Music/set-me-free.mp3', bpm: 120, energy: 0.52, mood: 'GROOVE' },
  { title: 'Spazzing Hard', artist: 'BLVCK OREO', file: '/Music/spazzing-hard.mp3', bpm: 124, energy: 0.73, mood: 'PARTY' },
  { title: "Trap Lan'je", artist: 'BLVCK OREO', file: '/Music/trap-lan-je.mp3', bpm: 83, energy: 0.7, mood: 'GROOVE' },
  { title: 'Vice City', artist: 'BLVCK OREO', file: '/Music/vice-city.mp3', bpm: 86, energy: 0.56, mood: 'NIGHT' },
  { title: 'VPN Visa', artist: 'BLVCK OREO', file: '/Music/vpn-visa.mp3', bpm: 144, energy: 0.73, mood: 'DRILL' },
  { title: 'Wild Wild West', artist: 'BLVCK OREO', file: '/Music/wild-wild-west.mp3', bpm: 144, energy: 0.66, mood: 'DRILL' },
  { title: 'Ends', artist: 'BLVCK OREO', file: '/Music/ends.mp3', bpm: 92, energy: 0.61, mood: 'GROOVE' },
  { title: 'HOPE (Cover)', artist: 'BLVCK OREO', file: '/Music/hope-cover.mp3', bpm: 148, energy: 0.62, mood: 'DRILL' },
]


