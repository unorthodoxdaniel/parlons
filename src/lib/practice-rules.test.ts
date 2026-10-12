import test from 'node:test';
import assert from 'node:assert/strict';
import {parseIntent, spokenMilliseconds} from './practice-rules.ts';
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
