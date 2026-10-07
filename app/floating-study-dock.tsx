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
          <svg className="floating-study-materials-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 5.5C8.5 3.5 5.5 3.5 3 4.5v14c3-1 6-1 9 1 3-2 6-2 9-1v-14c-2.5-1-5.5-1-9 1Z" /><path d="M12 5.5v14M6 8h3M15 8h3M6 11h3M15 11h3" /></svg>
          <span className="floating-study-materials-text">获取资料</span>
          <svg className="floating-study-materials-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
        </a>
      </div>
    </aside>
  );
}
