'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HOME_SONG, getAudioPreload, getLyricIndex } from './home-song-data';
import { createSongSeekController } from './home-song-seek';

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function PlaybackIcon({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {playing ? <><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></> : <path d="M8 5.5v13l11-6.5Z" />}
    </svg>
  );
}

function VinylDisc() {
  return (
    <svg className="home-song-record" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="31" fill="#25251f" />
      {[26, 22, 18, 14].map((radius) => <circle key={radius} cx="32" cy="32" r={radius} fill="none" stroke="#4c4b43" strokeWidth=".65" />)}
      <path d="M10 27a23 23 0 0 1 15-17M39 54a23 23 0 0 0 15-15" fill="none" stroke="#a9a394" strokeWidth="1" opacity=".45" />
      <circle cx="32" cy="32" r="10" fill="#a84b3f" />
      <circle cx="32" cy="32" r="3" fill="#f4f0e7" />
    </svg>
  );
}

type NavigatorWithSaveData = Navigator & {
  connection?: { saveData?: boolean };
};

// 未播放时展示副歌两行。
const CHORUS_INDEX = Math.max(0, HOME_SONG.lyrics.findIndex((line) => line.text === '一道题，一页纸，一段时光'));

export function HomeSongPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const sourceLinkRef = useRef<HTMLAnchorElement>(null);
  const lyricsPanelRef = useRef<HTMLDivElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const scrubbingRef = useRef(false);
  const blobSourceRef = useRef<string | null>(null);
  const cacheAttemptedRef = useRef(false);
  const cacheAbortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  const seekController = useMemo(() => createSongSeekController(HOME_SONG.fallbackDuration), []);
  const [scrubTime, setScrubTime] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number>(HOME_SONG.fallbackDuration);
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [saveData, setSaveData] = useState(true);
  const [seekPending, setSeekPending] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cacheAbortRef.current?.abort();
      if (blobSourceRef.current) URL.revokeObjectURL(blobSourceRef.current);
    };
  }, []);

  const syncFromAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setSeekPending(seekController.pendingTime !== null);
    if (!scrubbingRef.current) setCurrentTime(seekController.pendingTime ?? (Number.isFinite(audio.currentTime) ? audio.currentTime : 0));
    if (Number.isFinite(audio.duration) && audio.duration > 0) setDuration(audio.duration);
  }, [seekController]);

  const ensureAudioSource = (audio: HTMLAudioElement) => {
    audio.preload = 'auto';
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
  }, [audioError, playing, syncFromAudio]);

  // 浏览器后台标签页会节流 rAF；回到页面时立即重新取真实音频时间。
  useEffect(() => {
    const syncOnVisibility = () => {
      if (!document.hidden) syncFromAudio();
    };
    document.addEventListener('visibilitychange', syncOnVisibility);
    return () => document.removeEventListener('visibilitychange', syncOnVisibility);
  }, [syncFromAudio]);

  const activeIndex = useMemo(() => getLyricIndex(currentTime), [currentTime]);

  useEffect(() => {
    if (!lyricsOpen || activeIndex < 0) return;
    const panel = lyricsPanelRef.current;
    const row = panel?.querySelector<HTMLElement>(`[data-lyric-index="${activeIndex}"]`);
    if (!panel || !row) return;
    const target = row.offsetTop - panel.clientHeight / 2 + row.clientHeight / 2;
    panel.scrollTo({ top: Math.max(0, target), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
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
    try {
      const target = seekController.request(value, audio);
      setCurrentTime(target);
      ensureAudioSource(audio);
      applyPendingSeek();
      setAudioError(false);
    } catch {
      setAudioError(true);
    }
  };

  const applyPendingSeek = () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      seekController.apply(audio);
      syncFromAudio();
      const ranges = audio.seekable;
      const hasSeekRange = Array.from({ length: ranges.length }, (_, index) => ranges.end(index)).some((end) => end > 0);
      if (seekController.pendingTime !== null && audio.readyState >= 3 && audio.networkState === 1 && !hasSeekRange) void cacheForSeeking(audio);
    } catch {
      setAudioError(true);
    }
  };

  // 有些静态服务/内嵌浏览器不支持分段读取；完整缓存为本地音频后仍可跳转。
  const cacheForSeeking = async (audio: HTMLAudioElement) => {
    if (cacheAttemptedRef.current || blobSourceRef.current) return;
    const source = sourceLinkRef.current?.href;
    if (!source) return;
    cacheAttemptedRef.current = true;
    const controller = new AbortController();
    cacheAbortRef.current = controller;
    try {
      const response = await fetch(source, { cache: 'force-cache', signal: controller.signal });
      if (!response.ok) throw new Error('Audio cache request failed.');
      const blob = await response.blob();
      if (!mountedRef.current || audioRef.current !== audio || controller.signal.aborted) return;
      const shouldResume = !audio.paused;
      blobSourceRef.current = URL.createObjectURL(blob);
      audio.src = blobSourceRef.current;
      audio.load();
      if (shouldResume) await audio.play();
    } catch {
      if (mountedRef.current && !controller.signal.aborted) setAudioError(true);
    }
  };

  const cancelScrub = () => {
    scrubbingRef.current = false;
    setScrubTime(null);
    syncFromAudio();
  };

  const commitScrub = (value: number) => {
    scrubbingRef.current = false;
    setScrubTime(null);
    seek(value);
  };

  const skip = (seconds: number) => {
    const base = seekController.pendingTime ?? audioRef.current?.currentTime ?? currentTime;
    commitScrub(base + seconds);
  };

  const reloadAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setAudioError(false);
    cacheAbortRef.current?.abort();
    cacheAttemptedRef.current = false;
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
  const displayedTime = Math.min(Math.max(0, scrubTime ?? currentTime), safeDuration);

  return (
    <div
      className={`home-song-player${playing ? ' is-playing' : ''}${expanded ? ' is-expanded' : ''}${lyricsOpen ? ' lyrics-open' : ''}`}
      role="group" aria-label="向岸音乐播放器"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          cancelScrub();
          setExpanded(false);
          setLyricsOpen(false);
          expandButtonRef.current?.focus();
        }
      }}
    >
      <a ref={sourceLinkRef} href={HOME_SONG.src} hidden aria-hidden="true" tabIndex={-1}>向岸音频</a>
      <audio
        ref={audioRef}
        preload={getAudioPreload(saveData)}
        onLoadedMetadata={applyPendingSeek}
        onCanPlay={applyPendingSeek}
        onCanPlayThrough={applyPendingSeek}
        onProgress={applyPendingSeek}
        onDurationChange={applyPendingSeek}
        onTimeUpdate={syncFromAudio}
        onSeeking={syncFromAudio}
        onSeeked={(event) => { seekController.settle(event.currentTarget); syncFromAudio(); }}
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

      <div className="home-song-summary">
        <button className="home-song-compact-play" type="button" onClick={togglePlay} aria-label={playing ? '暂停向岸' : '播放向岸'}>
          <VinylDisc />
          <span className="home-song-record-action"><PlaybackIcon playing={playing} /></span>
        </button>
        <button className="home-song-expand" ref={expandButtonRef} type="button" aria-expanded={expanded} aria-controls="home-song-panel" onClick={() => setExpanded((value) => !value)}>
          <span className="home-song-title-group">
            <b>向岸</b>
            <span className="home-song-tag">{audioError ? '暂时无法播放' : seekPending ? '正在跳转…' : playing ? '正在播放' : '音乐副刊'}</span>
          </span>
          <svg className="home-song-chevron" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={expanded ? 'm7 10 5 5 5-5' : 'm7 14 5-5 5 5'} /></svg>
          <span className="sr-only">{expanded ? '收起播放器' : '展开播放器'}</span>
        </button>
      </div>

      <div id="home-song-panel" hidden={!expanded}>
      <div className="home-song-heading"><span>副刊 · 向岸</span><span>{audioError ? '暂时无法加载' : seekPending ? '正在跳转…' : playing ? '正在播放' : '听一首歌，歇一会儿'}</span></div>
      {(!lyricsOpen || audioError) && <div className="home-song-live" aria-live="polite">
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
      </div>}

      <div className="home-song-controls">
        <label className="home-song-progress">
          <span className="sr-only">歌曲进度</span>
          <input
            type="range"
            min="0"
            max={safeDuration}
            step="1"
            value={displayedTime}
            aria-valuetext={`${formatTime(displayedTime)}，总长${formatTime(safeDuration)}`}
            onPointerDown={() => { scrubbingRef.current = true; setScrubTime(displayedTime); }}
            onPointerUp={(event) => commitScrub(Number(event.currentTarget.value))}
            onPointerCancel={cancelScrub}
            onBlur={(event) => { if (scrubbingRef.current) commitScrub(Number(event.currentTarget.value)); }}
            onChange={(event) => {
              const value = Number(event.target.value);
              if (scrubbingRef.current) setScrubTime(value);
              else seek(value);
            }}
            onKeyDown={(event) => {
              if (['ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
                event.preventDefault();
                const next = event.key === 'Home' ? 0 : event.key === 'End' ? safeDuration : displayedTime + (['ArrowRight', 'ArrowUp'].includes(event.key) ? 5 : -5);
                commitScrub(next);
              }
            }}
          />
        </label>
        <div className="home-song-time"><span>{formatTime(displayedTime)}</span><span>{formatTime(safeDuration)}</span></div>
        <div className="home-song-transport">
          <button className="home-song-skip" type="button" onClick={() => skip(-10)} aria-label="后退10秒">−10<span>秒</span></button>
          <button className="home-song-play" type="button" onClick={togglePlay} aria-label={playing ? '暂停' : '播放'}><PlaybackIcon playing={playing} /></button>
          <button className="home-song-skip" type="button" onClick={() => skip(10)} aria-label="前进10秒">+10<span>秒</span></button>
        </div>
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
            <button
              type="button"
              key={`${line.at}-${line.text}`}
              data-lyric-index={index}
              className={`${index === activeIndex ? 'active' : ''}${index % 4 === 0 ? ' group-start' : ''}`}
              onClick={() => seek(line.at)}
            >
              <span>{formatTime(line.at)}</span>{line.text}
            </button>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
