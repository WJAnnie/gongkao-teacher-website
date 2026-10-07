import test from 'node:test';
import assert from 'node:assert/strict';
import { createSongSeekController } from '../app/home-song-seek.ts';

function createAudio(overrides = {}) {
  return {
    currentTime: 0,
    duration: 120,
    readyState: 1,
    ...overrides,
  };
}

test('metadata alone does not start a seek before the target becomes seekable', () => {
  const controller = createSongSeekController(120);
  let availableEnd = 0;
  const audio = createAudio({ seekable: { length: 1, start: () => 0, end: () => availableEnd } });
  controller.request(80, audio);
  assert.equal(audio.currentTime, 0);
  assert.equal(controller.apply(audio), null);
  availableEnd = 120;
  assert.equal(controller.apply(audio), 80);
  assert.equal(audio.currentTime, 80);
});

test('ready events do not restart a native seek that is already in flight', () => {
  const controller = createSongSeekController(120);
  let writes = 0;
  const audio = { duration: 120, readyState: 4, seeking: false,
    get currentTime() { return 0; },
    set currentTime(_value) { writes += 1; this.seeking = true; },
  };
  controller.request(80, audio);
  assert.equal(writes, 1);
  assert.equal(controller.apply(audio), null);
  assert.equal(writes, 1);
  assert.equal(controller.pendingTime, 80);
});

test('queues seek before metadata and applies only the latest ready request', () => {
  const controller = createSongSeekController(90);
  const audio = createAudio({ currentTime: 3, readyState: 0 });

  assert.equal(controller.request(20, audio), 20);
  assert.equal(audio.currentTime, 3);
  assert.equal(controller.pendingTime, 20);

  assert.equal(controller.request(40, audio), 40);
  assert.equal(audio.currentTime, 3);
  assert.equal(controller.pendingTime, 40);

  audio.readyState = 1;
  assert.equal(controller.apply(audio), 40);
  assert.equal(audio.currentTime, 40);
  assert.equal(controller.pendingTime, 40);
});

test('keeps pending until real currentTime confirms the latest target', () => {
  const controller = createSongSeekController(120);
  const audio = createAudio({ currentTime: 10, readyState: 0 });

  controller.request(55, audio);
  audio.readyState = 1;
  assert.equal(controller.apply(audio), 55);

  audio.currentTime = 10;
  assert.equal(controller.settle(audio), false);
  assert.equal(controller.pendingTime, 55);

  controller.request(75, audio);
  audio.currentTime = 55;
  assert.equal(controller.settle(audio), false);
  assert.equal(controller.pendingTime, 75);

  audio.currentTime = 74.75;
  assert.equal(controller.settle(audio), true);
  assert.equal(controller.pendingTime, null);
});

test('same-position requests finish without waiting for an event that never fires', () => {
  const controller = createSongSeekController(120);
  const audio = createAudio({ currentTime: 30.03 });

  assert.equal(controller.request(30, audio), 30);
  assert.equal(audio.currentTime, 30.03);
  assert.equal(controller.pendingTime, null);
  assert.equal(controller.apply(audio), null);
  assert.equal(audio.currentTime, 30.03);
  assert.equal(controller.pendingTime, null);
});

test('queued positions clamp to the real duration when metadata arrives', () => {
  const controller = createSongSeekController(240);
  const audio = createAudio({ duration: Number.NaN, readyState: 0 });
  controller.request(200, audio);
  audio.duration = 150;
  audio.readyState = 1;
  assert.equal(controller.apply(audio), 150);
  assert.equal(audio.currentTime, 150);
});

test('pending native seeks are not confirmed merely because the getter shows a target', () => {
  const controller = createSongSeekController(120);
  const audio = createAudio({ currentTime: 10, seeking: true });
  controller.request(60, audio);
  controller.apply(audio);
  assert.equal(controller.pendingTime, 60);
  assert.equal(controller.settle(audio), false);
  audio.seeking = false;
  assert.equal(controller.settle(audio), true);
  assert.equal(controller.pendingTime, null);
});

test('clamps invalid, negative, overflow, and unknown duration inputs without NaN', () => {
  const controller = createSongSeekController(80);
  const unknownDurationAudio = createAudio({ duration: Number.NaN });

  assert.equal(controller.request(Number.NaN, unknownDurationAudio), 0);
  assert.equal(unknownDurationAudio.currentTime, 0);
  assert.equal(controller.pendingTime, null);

  assert.equal(controller.request(-12, unknownDurationAudio), 0);
  assert.equal(unknownDurationAudio.currentTime, 0);
  assert.equal(controller.pendingTime, null);

  assert.equal(controller.request(200, unknownDurationAudio), 80);
  assert.equal(unknownDurationAudio.currentTime, 80);
  assert.equal(controller.pendingTime, 80);

  assert.equal(controller.request(50, createAudio({ duration: 30 })), 30);
});

test('keeps queued target when setting currentTime throws', () => {
  const controller = createSongSeekController(100);
  let storedTime = 5;
  const audio = {
    duration: 100,
    readyState: 1,
    get currentTime() {
      return storedTime;
    },
    set currentTime(_value) {
      throw new Error('seek blocked');
    },
  };

  assert.equal(controller.request(45, audio), 45);
  assert.equal(storedTime, 5);
  assert.equal(controller.pendingTime, 45);
  assert.throws(() => controller.apply(audio), /seek blocked/);
  assert.equal(controller.pendingTime, 45);
});
