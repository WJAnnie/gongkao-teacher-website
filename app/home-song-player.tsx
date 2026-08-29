'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const AUDIO_URL = 'https://cdn1.suno.ai/9699b383-feba-4acb-80af-38c15fe7dfd8.mp3';
const FALLBACK_DURATION = 234.072;

// 时间点来自仓库 Audit Xiangan Lyrics 对同一份成品 MP3 的强制对齐产物，
// 播放器只以 HTMLAudioElement.currentTime 为时钟，不另开独立歌词计时器。
const LYRICS = [
  { at: 11.88, text: '清晨的灯还亮在窗' },
  { at: 16.42, text: '桌上的书翻过几章' },
  { at: 19.80, text: '行测的题做了又想' },
  { at: 22.86, text: '申论的字写了又改几行' },
  { at: 26.50, text: '有时候路显得很长' },
  { at: 29.90, text: '有时候心也会迷茫' },
  { at: 32.94, text: '可昨天不会替你登场' },
  { at: 36.34, text: '今天的你还要继续向前闯' },
  { at: 40.12, text: '一道题，一页纸，一段时光' },
  { at: 43.76, text: '一点点，把未知变成日常' },
  { at: 47.44, text: '别急着问还有多远的地方' },
  { at: 50.40, text: '先把今天走得坦荡' },
  { at: 53.42, text: '乘一程云帆，向心中的岸启航' },
  { at: 57.06, text: '穿过几阵风，也穿过几场迷茫' },
  { at: 60.88, text: '行测练判断，申论写下主张' },
  { at: 64.28, text: '一笔一画，都在靠近梦想' },
  { at: 67.18, text: '乘一程云帆，朝想去的地方' },
  { at: 70.84, text: '不用比谁快，也不用四处张望' },
  { at: 74.52, text: '今天坐书桌，明天走进考场' },
  { at: 77.86, text: '走过的每一步，终会有回响' },
  { at: 84.26, text: '资料分析算到天亮' },
  { at: 90.34, text: '判断推理绕过几场' },
  { at: 93.82, text: '有些答案曾经勉强' },
  { at: 96.88, text: '后来才懂方法比答案更长' },
  { at: 100.50, text: '申论不是辞藻漂亮' },
  { at: 104.06, text: '也不是模板写满纸张' },
  { at: 107.30, text: '读懂材料理清思想' },
  { at: 110.34, text: '才能让每一句话都有分量' },
  { at: 114.22, text: '一道题，一次错，一次成长' },
  { at: 117.80, text: '一次次，把慌张变成平常' },
  { at: 121.32, text: '那些没人知道的晚上' },
  { at: 124.40, text: '都在替未来积攒力量' },
  { at: 127.40, text: '乘一程云帆，向心中的岸启航' },
  { at: 131.08, text: '穿过几阵风，也穿过几场迷茫' },
  { at: 134.90, text: '行测练判断，申论写下主张' },
  { at: 138.30, text: '一笔一画，都在靠近梦想' },
  { at: 141.18, text: '乘一程云帆，朝想去的地方' },
  { at: 144.86, text: '不用比谁快，也不用四处张望' },
  { at: 148.54, text: '今天坐书桌，明天走进考场' },
  { at: 151.86, text: '走过的每一步，终会有回响' },
  { at: 157.70, text: '是遇到难题，不再慌张' },
  { at: 161.68, text: '是面对材料，学会判断' },
  { at: 165.02, text: '是一次次想清楚以后' },
  { at: 168.40, text: '再写下自己的主张' },
  { at: 171.44, text: '有人陪你看过几页文章' },
  { at: 174.94, text: '有人提醒你别急着找答案' },
  { at: 178.48, text: '云起的时候，帆自然会扬' },
  { at: 181.80, text: '剩下的路，要由你自己去闯' },
  { at: 187.30, text: '乘一程云帆，向心中的岸启航' },
  { at: 191.72, text: '走过这段路，也走过年少时光' },
  { at: 195.28, text: '行测有方法，申论自有文章' },
  { at: 198.70, text: '提笔的时候，心里已有方向' },
  { at: 201.76, text: '乘一程云帆，朝想去的地方' },
  { at: 205.42, text: '等有一天，你真的站在人群中央' },
  { at: 209.04, text: '回头看那些，伏案许久的晚上' },
  { at: 212.46, text: '你会发现，坚持早已经有了模样' },
] as const;

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function HomeSongPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const lyricsPanelRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(FALLBACK_DURATION);
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [started, setStarted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);

  const syncFromAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(Number.isFinite(audio.currentTime) ? audio.currentTime : 0);
    if (Number.isFinite(audio.duration) && audio.duration > 0) setDuration(audio.duration);
  };

  // 只由这个播放器负责自动播放。若浏览器拦截，等待首次用户交互后补播。
  useEffect(() => {
    let active = true;
    let wasDismissed = false;
    try {
      wasDismissed = window.sessionStorage.getItem('xiang-an-dismissed') === '1';
      queueMicrotask(() => {
        if (active) setDismissed(wasDismissed);
      });
    } catch {
      queueMicrotask(() => {
        if (active) setDismissed(false);
      });
    }

    if (wasDismissed) return () => { active = false; };
    const audio = audioRef.current;
    if (!audio) return () => { active = false; };

    void audio.play().then(() => {
      if (!active) return;
      setStarted(true);
      setPlaying(true);
      setAudioError(false);
      syncFromAudio();
    }).catch(() => {
      // 浏览器可能阻止未经过用户手势的有声自动播放。
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
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      syncFromAudio();
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [playing]);

  // 浏览器后台标签页会节流 rAF；回到页面时立即重新取真实音频时间。
  useEffect(() => {
    const syncOnVisibility = () => {
      if (!document.hidden) syncFromAudio();
    };
    document.addEventListener('visibilitychange', syncOnVisibility);
    return () => document.removeEventListener('visibilitychange', syncOnVisibility);
  }, []);

  useEffect(() => {
    if (dismissed || started) return;
    const startFromFirstInteraction = () => {
      const audio = audioRef.current;
      if (!audio) return;
      void audio.play().then(() => {
        setStarted(true);
        setPlaying(true);
        setAudioError(false);
        syncFromAudio();
      }).catch(() => undefined);
    };

    document.addEventListener('pointerdown', startFromFirstInteraction, { once: true });
    document.addEventListener('keydown', startFromFirstInteraction, { once: true });
    return () => {
      document.removeEventListener('pointerdown', startFromFirstInteraction);
      document.removeEventListener('keydown', startFromFirstInteraction);
    };
  }, [dismissed, started]);

  const activeIndex = useMemo(() => {
    let found = -1;
    for (let index = 0; index < LYRICS.length; index += 1) {
      if (currentTime >= LYRICS[index].at) found = index;
      else break;
    }
    return found;
  }, [currentTime]);

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

  const currentLyric = activeIndex >= 0 ? LYRICS[activeIndex].text : '♪ 前奏 · 向岸';
  const nextLyric = activeIndex + 1 < LYRICS.length ? LYRICS[activeIndex + 1].text : '';
  const safeDuration = duration || FALLBACK_DURATION;

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_URL}
        preload="metadata"
        onLoadedMetadata={(event) => {
          const audio = event.currentTarget;
          setDuration(audio.duration || FALLBACK_DURATION);
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
          setCurrentTime(0);
        }}
        onError={() => setAudioError(true)}
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
              <em>{started ? (playing ? '正在播放' : '已暂停') : '浏览器未允许自动播放，点击播放键即可开始'}</em>
            </div>
            <button className="home-song-close" type="button" onClick={closePlayer} aria-label="关闭向岸播放器">×</button>
          </div>

          <div className="home-song-live" aria-live="polite">
            <p>{audioError ? '音频暂时无法加载，请稍后再试。' : currentLyric}</p>
            {!audioError && nextLyric && <span>{nextLyric}</span>}
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
              {LYRICS.map((line, index) => (
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
