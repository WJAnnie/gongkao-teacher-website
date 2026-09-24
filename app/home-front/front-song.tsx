import { HomeSongPlayer } from '../home-song-player';

export function FrontSong() {
  return (
    <section className="front-col front-song" aria-label="副刊 · 向岸">
      <div className="front-kicker">
        <h2>副刊 · 向岸</h2>
        <span>写给备考的你</span>
      </div>
      <HomeSongPlayer />
    </section>
  );
}
