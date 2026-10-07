import { HomeSongPlayer } from './home-song-player';

export function FloatingStudyDock() {
  return (
    <aside className="floating-study-dock" aria-label="全站学习与音乐副刊">
      <div className="floating-study-dock-player">
        <HomeSongPlayer />
      </div>
      <div className="floating-study-dock-materials">
        <a
          href="/materials/"
          className="floating-study-materials-link"
          aria-label="获取资料：前往公考学习资料库"
        >
          <span className="floating-study-materials-badge">资料库</span>
          <span className="floating-study-materials-text">获取资料</span>
          <span className="floating-study-materials-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </aside>
  );
}
