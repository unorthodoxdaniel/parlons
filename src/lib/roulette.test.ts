import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  RANDOM_THEME,
  buildSession,
  eligiblePrompts,
  formatDuration,
  matches,
  pickPrompt,
  sessionAction,
  type Prompt,
} from './roulette.ts';

const p = (id: number, lang: string, theme: string, text = `t${id}`): Prompt => ({ id, text, lang, theme });
const prompts = [
  p(1, 'fr', 'work'),
  p(2, 'fr', 'travel'),
  p(3, 'en', 'technology'),
  p(4, 'en', 'technology', 't3'), // same wording as 3, different id
];

test('random theme matches any theme in the practice language only', () => {
  assert.deepEqual(eligiblePrompts(prompts, 'fr', RANDOM_THEME).map((x) => x.id), [1, 2]);
  assert.deepEqual(eligiblePrompts(prompts, 'en', RANDOM_THEME).map((x) => x.id), [3, 4]);
});

test('a specific theme narrows within the practice language', () => {
  assert.deepEqual(eligiblePrompts(prompts, 'fr', 'work').map((x) => x.id), [1]);
  assert.deepEqual(eligiblePrompts(prompts, 'en', 'work'), []);
  assert.equal(matches(prompts[0], 'en', 'work'), false);
  assert.equal(matches(prompts[0], 'fr', RANDOM_THEME), true);
});

test('pickPrompt returns null when nothing is eligible', () => {
  assert.equal(pickPrompt([]), null);
});

test('pickPrompt avoids the previous id and wording when it can', () => {
  const eligible = eligiblePrompts(prompts, 'en', RANDOM_THEME);
  // 3 and 4 share wording, so no fully different option exists: fall back to a different id.
  assert.equal(pickPrompt(eligible, prompts[2], () => 0)!.id, 4);
  const fr = eligiblePrompts(prompts, 'fr', RANDOM_THEME);
  for (let i = 0; i < 20; i++) assert.equal(pickPrompt(fr, fr[0])!.id, 2);
});

test('pickPrompt repeats only when it is the single option', () => {
  assert.equal(pickPrompt([prompts[0]], prompts[0])!.id, 1);
});

test('session action and settings', () => {
  assert.equal(sessionAction(600), 'prepare');
  assert.equal(sessionAction(0), 'speak');
  assert.deepEqual(buildSession(prompts[0], 0, 150), {
    prompt: prompts[0],
    preparationSeconds: 0,
    speakingSeconds: 150,
    next: 'speak',
  });
});

test('formatDuration', () => {
  assert.deepEqual([60, 150, 300, 600, 120].map(formatDuration), ['1 min', '2:30', '5 min', '10 min', '2 min']);
});
