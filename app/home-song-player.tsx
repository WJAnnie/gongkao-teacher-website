'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { HOME_SONG, getAudioPreload, getLyricIndex } from './home-song-data';

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

type NavigatorWithSaveData = Navigator & {
  connection?: { saveData?: boolean };
};

export function HomeSongPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const lyricsPanelRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number>(HOME_SONG.fallbackDuration);
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [started, setStarted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);
  const [saveData, setSaveData] = useState(true);

  const syncFromAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(Number.isFinite(audio.currentTime) ? audio.currentTime : 0);
    if (Number.isFinite(audio.duration) && audio.duration > 0) setDuration(audio.duration);
  };

  // 保守地从 metadata 开始；客户端确认未开启 Save-Data 后才允许预载完整音频。
  useEffect(() => {
    let active = true;
    let wasDismissed = false;
    try {
      wasDismissed = window.sessionStorage.getItem('xiang-an-dismissed') === '1';
    } catch { /* sessionStorage is optional */ }

    const connectionSaveData = Boolean((navigator as NavigatorWithSaveData).connection?.saveData);
    queueMicrotask(() => {
      if (!active) return;
      setDismissed(wasDismissed);
      setSaveData(connectionSaveData);
      if (audioRef.current?.error) setAudioError(true);
    });

    return () => { active = false; };
  }, []);

  // 首屏保持干净：ABOUT 进入阅读位置后显示播放器；滚回首屏再次隐藏。
  useEffect(() => {
    let frame = 0;
    const updateVisibility = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const about = document.getElementById('about');
        if (!about) {
          setPlayerVisible(false);
          return;
        }
        const threshold = Math.min(120, window.innerHeight * 0.14);
        setPlayerVisible(about.getBoundingClientRect().top <= threshold);
      });
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  // 播放时用 rAF 提供更顺滑的进度显示；歌词时间仍直接读取 audio.currentTime。
  useEffect(() => {
    if (!playing || audioError) return;
    let frame = 0;
    const tick = () => {
      syncFromAudio();
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [audioError, playing]);

  // 浏览器后台标签页会节流 rAF；回到页面时立即重新取真实音频时间。
  useEffect(() => {
    const syncOnVisibility = () => {
      if (!document.hidden) syncFromAudio();
    };
    document.addEventListener('visibilitychange', syncOnVisibility);
    return () => document.removeEventListener('visibilitychange', syncOnVisibility);
  }, []);

  const activeIndex = useMemo(() => getLyricIndex(currentTime), [currentTime]);

  useEffect(() => {
    if (!lyricsOpen || activeIndex < 0) return;
    const panel = lyricsPanelRef.current;
    const row = panel?.querySelector<HTMLElement>(`[data-lyric-index="${activeIndex}"]`);
    if (!panel || !row) return;
    const target = row.offsetTop - panel.clientHeight / 2 + row.clientHeight / 2;
    panel.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
  }, [activeIndex, lyricsOpen]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setStarted(true);
        setPlaying(true);
        setAudioError(false);
        syncFromAudio();
      } catch {
        setPlaying(false);
        setAudioError(true);
      }
    } else {
      audio.pause();
      setPlaying(false);
      syncFromAudio();
    }
  };

  const closePlayer = () => {
    audioRef.current?.pause();
    setPlaying(false);
    setDismissed(true);
    try { window.sessionStorage.setItem('xiang-an-dismissed', '1'); } catch { /* noop */ }
  };

  const reopenPlayer = () => {
    setDismissed(false);
    syncFromAudio();
    try { window.sessionStorage.removeItem('xiang-an-dismissed'); } catch { /* noop */ }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    syncFromAudio();
  };

  const currentLyric = activeIndex >= 0 ? HOME_SONG.lyrics[activeIndex].text : '♪ 前奏 · 向岸';
  const nextLyric = activeIndex + 1 < HOME_SONG.lyrics.length ? HOME_SONG.lyrics[activeIndex + 1].text : '';
  const safeDuration = duration || HOME_SONG.fallbackDuration;

  return (
    <>
      <audio
        ref={audioRef}
        src={HOME_SONG.src}
        preload={getAudioPreload(saveData)}
        onLoadedMetadata={(event) => {
          const audio = event.currentTarget;
          setDuration(audio.duration || HOME_SONG.fallbackDuration);
          setCurrentTime(audio.currentTime || 0);
        }}
        onDurationChange={syncFromAudio}
        onTimeUpdate={syncFromAudio}
        onSeeking={syncFromAudio}
        onSeeked={syncFromAudio}
        onPlay={() => {
          setStarted(true);
          setPlaying(true);
          setAudioError(false);
          syncFromAudio();
        }}
        onPause={() => {
          setPlaying(false);
          syncFromAudio();
        }}
        onEnded={() => {
          setPlaying(false);
          syncFromAudio();
        }}
        onError={() => {
          setPlaying(false);
          setAudioError(true);
          syncFromAudio();
        }}
      />

      {playerVisible && (dismissed ? (
        <button className="home-song-reopen" type="button" onClick={reopenPlayer} aria-label="重新打开向岸播放器">
          <span>♪</span><b>向岸</b>
        </button>
      ) : (
        <aside className={`home-song-player${playing ? ' is-playing' : ''}${lyricsOpen ? ' lyrics-open' : ''}`} aria-label="向岸音乐播放器">
          <div className="home-song-head">
            <div className="home-song-orbit" aria-hidden="true"><i /><span>♪</span></div>
            <div className="home-song-meta">
              <small>STUDY TRACK / 学习歌单</small>
              <strong>向岸</strong>
              <em>{started ? (playing ? '正在播放' : '已暂停') : '点击播放键开始'}</em>
            </div>
            <button className="home-song-close" type="button" onClick={closePlayer} aria-label="关闭向岸播放器">×</button>
          </div>

          <div className="home-song-live" aria-live="polite">
            {audioError ? (
              <div className="home-song-error" role="status">
                <span>音频暂时无法加载。</span>
                <button type="button" onClick={() => { setAudioError(false); audioRef.current?.load(); }}>重新加载</button>
              </div>
            ) : (
              <>
                <p>{currentLyric}</p>
                {nextLyric && <span>{nextLyric}</span>}
              </>
            )}
          </div>

          <div className="home-song-controls">
            <button className="home-song-play" type="button" onClick={togglePlay} aria-label={playing ? '暂停' : '播放'}>
              {playing ? 'Ⅱ' : '▶'}
            </button>
            <label className="home-song-progress">
              <span className="sr-only">歌曲进度</span>
              <input
                type="range"
                min="0"
                max={safeDuration}
                step="0.05"
                value={Math.min(currentTime, safeDuration)}
                onChange={(event) => seek(Number(event.target.value))}
              />
            </label>
            <span className="home-song-time">{formatTime(currentTime)} / {formatTime(safeDuration)}</span>
            <button className="home-song-lyrics-toggle" type="button" onClick={() => setLyricsOpen((value) => !value)}>
              {lyricsOpen ? '收起歌词' : '歌词'}
            </button>
          </div>

          {lyricsOpen && (
            <div className="home-song-lyrics-list" ref={lyricsPanelRef} aria-label="向岸完整歌词">
              {HOME_SONG.lyrics.map((line, index) => (
                <p
                  key={`${line.at}-${line.text}`}
                  data-lyric-index={index}
                  className={`${index === activeIndex ? 'active' : ''}${index % 4 === 0 ? ' group-start' : ''}`}
                  onClick={() => seek(line.at)}
                >
                  <span>{formatTime(line.at)}</span>{line.text}
                </p>
              ))}
            </div>
          )}
        </aside>
      ))}
    </>
  );
}
