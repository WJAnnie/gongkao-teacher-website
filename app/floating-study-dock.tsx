import { HomeSongPlayer } from './home-song-player';
import { MATERIALS_POPOVER_ID, materialsContact } from './materials-contact';

export function FloatingStudyDock() {
  return (
    <aside className="floating-study-dock" aria-label="全站学习与音乐副刊">
      <details className="floating-study-dock-player" open>
        <summary className="floating-study-music-toggle"><span className="music-hide-label">收起音乐</span><span className="music-show-label">显示音乐</span></summary>
        <HomeSongPlayer />
      </details>
      <div className="floating-study-dock-materials">
        <button
          type="button"
          popoverTarget={MATERIALS_POPOVER_ID}
          className="floating-study-materials-link"
          aria-label="获取资料：展开二维码"
        >
          <svg className="floating-study-materials-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 5.5C8.5 3.5 5.5 3.5 3 4.5v14c3-1 6-1 9 1 3-2 6-2 9-1v-14c-2.5-1-5.5-1-9 1Z" /><path d="M12 5.5v14M6 8h3M15 8h3M6 11h3M15 11h3" /></svg>
          <span className="floating-study-materials-text">获取资料</span>
          <svg className="floating-study-materials-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
        </button>
        <section id={MATERIALS_POPOVER_ID} popover="auto" className="materials-contact-popover" role="dialog" aria-labelledby="materials-contact-title">
          <header className="materials-contact-heading">
            <h2 id="materials-contact-title">获取资料</h2>
            <button type="button" popoverTarget={MATERIALS_POPOVER_ID} popoverTargetAction="hide" aria-label="关闭资料二维码" autoFocus>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
          </header>
          {materialsContact.qrImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- 保留原始二维码图像，便于手机长按识别。
            <img className="materials-contact-qr" src={materialsContact.qrImage} alt="扫码获取申论与面试学习资料" width="208" height="208" />
          ) : (
            <p className="materials-contact-unavailable" role="status">扫码入口暂未开放<br /><span>可以先查看站内资料</span></p>
          )}
          <p className="materials-contact-description">申论方法 · 结构化面试<br />真题训练 · 课堂内容</p>
          <a className="materials-contact-library" href="/materials/">查看站内资料 <span aria-hidden="true">→</span></a>
        </section>
      </div>
    </aside>
  );
}
