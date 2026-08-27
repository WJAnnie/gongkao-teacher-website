'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const AUDIO_URL = 'https://cdn1.suno.ai/9699b383-feba-4acb-80af-38c15fe7dfd8.mp3';
const FALLBACK_DURATION = 234.072;

// 时间轴依据用户上传的 3:54 成品音频，结合实际波形段落与歌曲结构校准到行。
const LYRICS = [
  { at: 8.90, text: '清晨的灯还亮在窗' },
  { at: 13.35, text: '桌上的书翻过几章' },
  { at: 17.80, text: '行测的题做了又想' },
  { at: 22.25, text: '申论的字写了又改几行' },
  { at: 26.70, text: '有时候路显得很长' },
  { at: 31.15, text: '有时候心也会迷茫' },
  { at: 35.60, text: '可昨天不会替你登场' },
  { at: 40.05, text: '今天的你还要继续向前闯' },
  { at: 44.50, text: '一道题，一页纸，一段时光' },
  { at: 49.35, text: '一点点，把未知变成日常' },
  { at: 54.20, text: '别急着问还有多远的地方' },
  { at: 59.05, text: '先把今天走得坦荡' },
  { at: 63.90, text: '乘一程云帆，向心中的岸启航' },
  { at: 66.85, text: '穿过几阵风，也穿过几场迷茫' },
  { at: 69.80, text: '行测练判断，申论写下主张' },
  { at: 72.75, text: '一笔一画，都在靠近梦想' },
  { at: 75.70, text: '乘一程云帆，朝想去的地方' },
  { at: 78.41, text: '不用比谁快，也不用四处张望' },
  { at: 81.12, text: '今天坐书桌，明天走进考场' },
  { at: 83.84, text: '走过的每一步，终会有回响' },
  { at: 86.55, text: '资料分析算到天亮' },
  { at: 90.80, text: '判断推理绕过几场' },
  { at: 95.05, text: '有些答案曾经勉强' },
  { at: 99.30, text: '后来才懂方法比答案更长' },
  { at: 103.55, text: '申论不是辞藻漂亮' },
  { at: 107.80, text: '也不是模板写满纸张' },
  { at: 112.05, text: '读懂材料厘清思想' },
  { at: 116.30, text: '才能让每一句话都有分量' },
  { at: 120.55, text: '一道题，一次错，一次成长' },
  { at: 124.80, text: '一次次，把慌张变成平常' },
  { at: 129.05, text: '那些没人知道的晚上' },
  { at: 133.30, text: '都在替未来积攒力量' },
  { at: 137.55, text: '乘一程云帆，向心中的岸启航' },
  { at: 140.50, text: '穿过几阵风，也穿过几场迷茫' },
  { at: 143.45, text: '行测练判断，申论写下主张' },
  { at: 146.40, text: '一笔一画，都在靠近梦想' },
  { at: 149.35, text: '乘一程云帆，朝想去的地方' },
  { at: 152.32, text: '不用比谁快，也不用四处张望' },
  { at: 155.30, text: '今天坐书桌，明天走进考场' },
  { at: 158.28, text: '走过的每一步，终会有回响' },
  { at: 161.25, text: '是遇到难题，不再慌张' },
  { at: 165.45, text: '是面对材料，学会判断' },
  { at: 169.65, text: '是一次次想清楚以后' },
  { at: 173.85, text: '再写下自己的主张' },
  { at: 178.05, text: '有人陪你看过几页文章' },
  { at: 182.25, text: '有人提醒你别急着找答案' },
  { at: 186.45, text: '云起的时候，帆自然会扬' },
  { at: 190.65, text: '剩下的路，要由你自己去闯' },
  { at: 194.85, text: '乘一程云帆，向心中的岸启航' },
  { at: 197.80, text: '走过这段路，也走过年少时光' },
  { at: 200.75, text: '行测有方法，申论自有文章' },
  { at: 203.70, text: '提笔的时候，心里已有方向' },
  { at: 206.65, text: '乘一程云帆，朝想去的地方' },
  { at: 209.60, text: '等有一天，你真的站在人群中央' },
  { at: 212.55, text: '回头看那些，伏案许久的晚上' },
  { at: 215.50, text: '你会发现，坚持早已经有了模样' },
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

  useEffect(() => {
    try {
      setDismissed(window.sessionStorage.getItem('xiang-an-dismissed') === '1');
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      const audio = audioRef.current;
      if (audio) setCurrentTime(audio.currentTime);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [playing]);

  useEffect(() => {
    if (dismissed || started) return;
    const startFromHero = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('a, button, input, textarea, select, label, [role="button"]')) return;
      const hero = document.getElementById('top');
      if (!hero || !hero.contains(target)) return;
      const audio = audioRef.current;
      if (!audio) return;
      void audio.play().then(() => {
        setStarted(true);
        setPlaying(true);
      }).catch(() => undefined);
    };
    document.addEventListener('pointerdown', startFromHero);
    return () => document.removeEventListener('pointerdown', startFromHero);
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
      } catch {
        setAudioError(true);
      }
    } else {
      audio.pause();
      setPlaying(false);
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
    try { window.sessionStorage.removeItem('xiang-an-dismissed'); } catch { /* noop */ }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const currentLyric = activeIndex >= 0 ? LYRICS[activeIndex].text : '♪ 前奏 · 向岸';
  const nextLyric = LYRICS[Math.min(activeIndex + 1, LYRICS.length - 1)]?.text ?? '';
  const safeDuration = duration || FALLBACK_DURATION;

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_URL}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || FALLBACK_DURATION)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setCurrentTime(0); }}
        onError={() => setAudioError(true)}
      />

      {dismissed ? (
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
              <em>{started ? (playing ? '正在播放' : '已暂停') : '点击首页空白处或播放键开始'}</em>
            </div>
            <button className="home-song-close" type="button" onClick={closePlayer} aria-label="关闭向岸播放器">×</button>
          </div>

          <div className="home-song-live" aria-live="polite">
            <p>{audioError ? '音频暂时无法加载，请稍后再试。' : currentLyric}</p>
            {!audioError && <span>{nextLyric}</span>}
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
                step="0.1"
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
      )}
    </>
  );
}
