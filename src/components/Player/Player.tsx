import { tracks } from '../../data/tracks'

/**
 * Site-wide background music strip (bottom-left).
 * Pure static markup: the single <audio>, play/pause/prev/next,
 * auto-advance and the first-interaction gate are all wired by
 * public/engine.js. Track data rides to the client as a JSON island —
 * same pattern as the range dataset.
 */
export default function Player() {
  return (
    <aside className="player" aria-label="Background music — BlvckOreo">
      <div className="pl-controls">
        <button type="button" className="pl-btn pl-shuffle" data-act="shuffle" aria-label="Shuffle" aria-pressed="true">
          <svg className="pl-i-stroke" viewBox="0 0 10 10" aria-hidden="true"><path d="M0.8 2.6h1.9L7 7.4h1.7" /><path d="M0.8 7.4h1.9L7 2.6h1.7" /><path d="M7.4 1.3l1.8 1.3-1.8 1.3" /><path d="M7.4 6.1l1.8 1.3-1.8 1.3" /></svg>
        </button>
        <button type="button" className="pl-btn" data-act="prev" aria-label="Previous track">
          <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 1h1.6v8H1.5zM9 1L3.8 5 9 9z" /></svg>
        </button>
        <button type="button" className="pl-btn pl-toggle" data-act="toggle" aria-label="Play music" aria-pressed="false">
          <svg className="pl-i-play" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1l7 4-7 4z" /></svg>
          <svg className="pl-i-pause" viewBox="0 0 10 10" aria-hidden="true"><path d="M2.2 1h2.1v8H2.1zM5.7 1h2.1v8H5.7z" /></svg>
        </button>
        <button type="button" className="pl-btn" data-act="next" aria-label="Next track">
          <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M6.9 1h1.6v8H6.9zM1 1l5.2 4L1 9z" /></svg>
        </button>
        <button type="button" className="pl-btn pl-repeat" data-act="repeat" aria-label="Repeat this song: off" aria-pressed="false">
          <svg className="pl-i-stroke" viewBox="0 0 10 10" aria-hidden="true"><path d="M7.9 3.9A3.1 3.1 0 0 0 2.2 4.9" /><path d="M2.1 6.1a3.1 3.1 0 0 0 5.7-1" /><path d="M7.8 1.6v2.3H5.5" /><path d="M2.2 8.4V6.1h2.3" /></svg>
        </button>
      </div>
      <button type="button" className="pl-meta" data-act="list" aria-haspopup="dialog" aria-expanded="false" aria-label="Open tracklist — Habibcore sound">
        <span className="pl-now">HABIBCORE® SOUND</span>
        <b className="pl-title">{tracks[0].title}</b>
        <span className="pl-artist">{tracks[0].artist}</span>
      </button>
      <span className="pl-count">01 / {String(tracks.length).padStart(2, '0')}</span>
      <span className="pl-bar" aria-hidden="true"><i /></span>
      <script
        type="application/json"
        id="sound-data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tracks) }}
      />
    </aside>
  )
}
