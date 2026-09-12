import { tracks } from '../../data/tracks'
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, ChevronUp } from 'lucide-react'

/**
 * Site-wide background music strip (bottom-right).
 * Pure static markup: the single <audio>, play/pause/prev/next, shuffle,
 * repeat-one, seek and the first-interaction gate are all wired by
 * public/engine.js. Track data rides to the client as a JSON island —
 * same pattern as the range dataset.
 */
export default function Player() {
  return (
    <aside className="player" aria-label="Background music — BlvckOreo">
      <div className="pl-controls">
        <button type="button" className="pl-btn pl-toggle" data-act="toggle" aria-label="Play music" aria-pressed="false">
          <Play className="pl-i-play" size={10} strokeWidth={2} aria-hidden="true" />
          <Pause className="pl-i-pause" size={10} strokeWidth={2} aria-hidden="true" />
        </button>
        <button type="button" className="pl-btn pl-more" data-act="more" aria-label="More player controls" aria-expanded="false" aria-controls="pl-extra">
          <ChevronUp className="pl-i-more" size={10} strokeWidth={2} aria-hidden="true" />
        </button>
        <span className="pl-extra" id="pl-extra">
          <button type="button" className="pl-btn pl-shuffle" data-act="shuffle" aria-label="Shuffle" aria-pressed="true">
            <Shuffle size={10} strokeWidth={2} aria-hidden="true" />
          </button>
          <button type="button" className="pl-btn" data-act="prev" aria-label="Previous track">
            <SkipBack size={10} strokeWidth={2} aria-hidden="true" />
          </button>
          <button type="button" className="pl-btn" data-act="next" aria-label="Next track">
            <SkipForward size={10} strokeWidth={2} aria-hidden="true" />
          </button>
          <button type="button" className="pl-btn pl-repeat" data-act="repeat" aria-label="Repeat this song: off" aria-pressed="false">
            <Repeat size={10} strokeWidth={2} aria-hidden="true" />
          </button>
        </span>
      </div>
      <button
        type="button"
        className="pl-meta"
        data-act="list"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-label="Open tracklist — Habibcore sound"
      >
        <span className="pl-now">HABIBCORE® SOUND</span>
        <b className="pl-title">{tracks[0].title}</b>
        <span className="pl-artist">{tracks[0].artist}</span>
      </button>
      <span className="pl-count">01 / {String(tracks.length).padStart(2, '0')}</span>
      <span
        className="pl-bar"
        role="slider"
        tabIndex={0}
        aria-label="Seek within track"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      >
        <i aria-hidden="true" />
      </span>
      <script
        type="application/json"
        id="sound-data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tracks) }}
      />
    </aside>
  )
}
