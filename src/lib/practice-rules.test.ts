import test from 'node:test';
import assert from 'node:assert/strict';
import {parseIntent, spokenMilliseconds, replaySettings, validSessionId} from './practice-rules.ts';
test('hide intent rejects expired, malformed and unbounded requests', () => {
  assert.equal(parseIntent('{', 100), null);
  assert.equal(parseIntent(JSON.stringify({promptId: 1, expires:100}), 100), null);
  assert.equal(parseIntent(JSON.stringify({promptId:-1, expires:200}), 100), null);
  assert.equal(parseIntent(JSON.stringify({promptId:1, expires:1e20}), 100), null);
  assert.deepEqual(parseIntent(JSON.stringify({promptId:1, expires:200}), 100), {promptId:1, expires:200});
});
test('speaking duration uses remaining timer time, bounds background overshoot and preserves partial seconds', () => {
  assert.equal(spokenMilliseconds(60, 45000),15000);
  assert.equal(spokenMilliseconds(60, -500),60000);
  assert.equal(spokenMilliseconds(60, 70000),0);
  assert.equal(spokenMilliseconds(60, 59900.2),100);
});

test('history replay accepts supported durations and rejects corrupt settings', () => {
  assert.deepEqual(replaySettings({preparation_seconds:0,speaking_seconds:150}),{preparationSeconds:0,speakingSeconds:150});
  assert.equal(replaySettings({preparation_seconds:60,speaking_seconds:150}),null);
  assert.equal(replaySettings({preparation_seconds:600,speaking_seconds:'60'}),null);
  assert.equal(validSessionId('10000000-0000-0000-0000-000000000001'),true);
  assert.equal(validSessionId('../auth/'),false);
});
