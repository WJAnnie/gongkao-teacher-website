export type SeekableAudio = {
  currentTime: number;
  duration: number;
  readyState: number;
  seeking?: boolean;
  seekable?: { length: number; start(index: number): number; end(index: number): number };
};

type SongSeekController = {
  request(value: number, audio: SeekableAudio): number;
  apply(audio: SeekableAudio): number | null;
  settle(audio: SeekableAudio): boolean;
  readonly pendingTime: number | null;
};

const WRITE_EPSILON = 0.05;
const SETTLE_EPSILON = 0.3;

function finiteNonNegative(value: number, fallback: number) {
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

export function createSongSeekController(fallbackDuration: number) {
  let pendingTime: number | null = null;

  const fallbackEnd = finiteNonNegative(fallbackDuration, 0);

  const clamp = (value: number, audio: SeekableAudio) => {
    const end = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : fallbackEnd;
    const target = finiteNonNegative(value, 0);
    return Math.min(target, end);
  };

  const writePending = (audio: SeekableAudio, target: number) => {
    if (Math.abs(finiteNonNegative(audio.currentTime, 0) - target) <= WRITE_EPSILON) return;
    audio.currentTime = target;
  };

  const targetAvailable = (audio: SeekableAudio, target: number) => {
    const ranges = audio.seekable;
    if (!ranges) return true;
    for (let index = 0; index < ranges.length; index += 1) {
      if (target >= ranges.start(index) && target <= ranges.end(index)) return true;
    }
    return false;
  };

  const controller: SongSeekController = {
    request(value, audio) {
      const target = clamp(value, audio);
      pendingTime = target;
      if (audio.readyState < 1) return target;
      if (!audio.seeking && Math.abs(finiteNonNegative(audio.currentTime, 0) - target) <= WRITE_EPSILON) {
        pendingTime = null;
        return target;
      }
      if (!targetAvailable(audio, target)) return target;
      try {
        writePending(audio, target);
      } catch {
        return target;
      }
      return target;
    },
    apply(audio) {
      if (pendingTime === null || audio.readyState < 1) return null;
      const target = clamp(pendingTime, audio);
      pendingTime = target;
      if (!audio.seeking && Math.abs(finiteNonNegative(audio.currentTime, 0) - target) <= WRITE_EPSILON) {
        pendingTime = null;
        return target;
      }
      if (audio.seeking || !targetAvailable(audio, target)) return null;
      writePending(audio, target);
      return target;
    },
    settle(audio) {
      if (pendingTime === null) return false;
      if (audio.readyState < 1 || audio.seeking) return false;
      if (Math.abs(finiteNonNegative(audio.currentTime, 0) - pendingTime) > SETTLE_EPSILON) {
        return false;
      }
      pendingTime = null;
      return true;
    },
    get pendingTime() {
      return pendingTime;
    },
  };

  return controller;
}
