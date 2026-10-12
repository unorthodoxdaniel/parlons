import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Countdown, clockText } from './timer.ts';
test('deadline catches up after background throttling and clamps at zero', () => {
  let now = 1000; const timer = new Countdown(() => now);
  timer.start(60); now += 45100; assert.equal(timer.remaining(), 14900);
  now += 20000; assert.equal(timer.remaining(), 0);
});
test('pause preserves fractions and resume excludes paused time', () => {
  let now = 0; const timer = new Countdown(() => now);
  timer.start(150); now = 1234; timer.pause(); now += 500000;
  assert.equal(timer.remaining(), 148766); timer.resume(); now += 148766;
  assert.equal(timer.remaining(), 0);
});
test('zero duration and fresh starts', () => {
  const timer = new Countdown(() => 0); timer.start(0); assert.equal(timer.remaining(), 0);
  timer.start(600); assert.equal(timer.remaining(), 600000); assert.equal(timer.paused, false);
});
test('display rounds up until the deadline', () => {
  assert.equal(clockText(600000), '10:00'); assert.equal(clockText(1), '00:01');
  assert.equal(clockText(0), '00:00'); assert.equal(clockText(150000), '02:30');
});
