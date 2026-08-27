'use client';

import { useEffect } from 'react';

export function HomeSongAutoplay() {
  useEffect(() => {
    let fallbackArmed = false;
    let disposed = false;

    const findAudio = () => document.querySelector<HTMLAudioElement>('.home-song-player audio, audio[src*="suno.ai"]');

    const tryPlay = async () => {
      const audio = findAudio();
      if (!audio || disposed) return false;
      try {
        await audio.play();
        return true;
      } catch {
        return false;
      }
    };

    const armFallback = () => {
      if (fallbackArmed || disposed) return;
      fallbackArmed = true;
      const resume = async () => {
        const played = await tryPlay();
        if (played) {
          window.removeEventListener('pointerdown', resume, true);
          window.removeEventListener('keydown', resume, true);
        }
      };
      window.addEventListener('pointerdown', resume, true);
      window.addEventListener('keydown', resume, true);
    };

    const timer = window.setTimeout(async () => {
      const dismissed = (() => {
        try { return window.sessionStorage.getItem('xiang-an-dismissed') === '1'; }
        catch { return false; }
      })();
      if (dismissed) return;
      const played = await tryPlay();
      if (!played) armFallback();
    }, 80);

    return () => {
      disposed = true;
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
