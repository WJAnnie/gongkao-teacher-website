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

// 未播放时展示副歌两行，作为「副刊」栏的歌词节选。
const CHORUS_INDEX = Math.max(0, HOME_SONG.lyrics.findIndex((line) => line.text === '一道题，一页纸，一段时光'));

export function HomeSongPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const sourceLinkRef = useRef<HTMLAnchorElement>(null);
  const lyricsPanelRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number>(HOME_SONG.fallbackDuration);
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [saveData, setSaveData] = useState(true);

  const syncFromAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(Number.isFinite(audio.currentTime) ? audio.currentTime : 0);
    if (Number.isFinite(audio.duration) && audio.duration > 0) setDuration(audio.duration);
  };

  const ensureAudioSource = (audio: HTMLAudioElement) => {
    if (audio.getAttribute('src')) return;
    const source = sourceLinkRef.current?.href;
    if (!source) throw new Error('Home audio source is unavailable.');
    audio.src = source;
    audio.load();
  };

  // 保守地从 metadata 开始；客户端确认未开启 Save-Data 后才允许预载完整音频。
  useEffect(() => {
    let active = true;
    const connectionSaveData = Boolean((navigator as NavigatorWithSaveData).connection?.saveData);
    queueMicrotask(() => {
      if (!active) return;
      setSaveData(connectionSaveData);
      if (audioRef.current?.error) setAudioError(true);
    });

    return () => { active = false; };
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
        ensureAudioSource(audio);
        await audio.play();
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

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    syncFromAudio();
  };

  const reloadAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setAudioError(false);
    try {
      ensureAudioSource(audio);
      audio.load();
    } catch {
      setAudioError(true);
    }
  };

  const lyricIndex = activeIndex >= 0 ? activeIndex : CHORUS_INDEX;
  const currentLyric = HOME_SONG.lyrics[lyricIndex].text;
  const nextLyric = lyricIndex + 1 < HOME_SONG.lyrics.length ? HOME_SONG.lyrics[lyricIndex + 1].text : '';
  const safeDuration = duration || HOME_SONG.fallbackDuration;

  return (
    <div
      className={`home-song-player${playing ? ' is-playing' : ''}${lyricsOpen ? ' lyrics-open' : ''}`}
      role="group" aria-label="向岸音乐播放器"
    >
      <a ref={sourceLinkRef} href={HOME_SONG.src} hidden aria-hidden="true" tabIndex={-1}>向岸音频</a>
      <audio
        ref={audioRef}
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

      <div className="home-song-live" aria-live="polite">
        {audioError ? (
          <div className="home-song-error" role="status">
            <span>音频暂时无法加载。</span>
            <button type="button" onClick={reloadAudio}>重新加载</button>
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
        <button
          className="home-song-lyrics-toggle"
          type="button"
          aria-expanded={lyricsOpen}
          onClick={() => setLyricsOpen((value) => !value)}
        >
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
    </div>
  );
}
