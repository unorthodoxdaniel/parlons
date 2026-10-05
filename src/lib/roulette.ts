// Roulette rules and session settings. Pure functions with no DOM or Supabase
// access, so the page script stays thin and these can be tested on their own.

export interface Prompt {
  id: number;
  text: string;
  /** Practice language code, from languages.code. */
  lang: string;
  /** Language-independent theme key, from themes.key. */
  theme: string;
}

export interface Theme {
  key: string;
  /** Database name; only a fallback when the interface has no translation. */
  name: string;
}

/** `random` is an application option, not a database theme. */
export const RANDOM_THEME = 'random';

export interface Choice<T> {
  value: T;
  label: string;
}

// Practice languages for v1. Each is named in its own language, so the labels
// do not depend on the interface language.
export const PRACTICE_LANGUAGES: Choice<string>[] = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
];

// Durations are in seconds. 0 preparation means spontaneous (see PreparationOption).
export const PREPARATION_SECONDS = [600, 300, 120, 0];
export const SPEAKING_SECONDS = [60, 150, 300, 600];

export const DEFAULTS = {
  practiceLang: 'fr',
  theme: RANDOM_THEME,
  preparationSeconds: 600,
  speakingSeconds: 600,
};

export function formatDuration(seconds: number): string {
  if (seconds % 60 === 0) return `${seconds / 60} min`;
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

export function matches(prompt: Prompt, lang: string, theme: string): boolean {
  return prompt.lang === lang && (theme === RANDOM_THEME || prompt.theme === theme);
}

export function eligiblePrompts(prompts: Prompt[], lang: string, theme: string): Prompt[] {
  return prompts.filter((p) => matches(p, lang, theme));
}

/**
 * Pick one prompt at random. When `previous` is given, avoid repeating it so a
 * re-spin visibly changes; prefer a different id *and* different text (the same
 * wording can exist under two ids), then a different id, then anything.
 */
export function pickPrompt(
  eligible: Prompt[],
  previous: Prompt | null = null,
  random: () => number = Math.random,
): Prompt | null {
  if (eligible.length === 0) return null;
  const pools = previous
    ? [
        eligible.filter((p) => p.id !== previous.id && p.text !== previous.text),
        eligible.filter((p) => p.id !== previous.id),
        eligible,
      ]
    : [eligible];
  const pool = pools.find((candidates) => candidates.length > 0)!;
  return pool[Math.floor(random() * pool.length)];
}

/** What the primary session action is for a given preparation time. */
export function sessionAction(preparationSeconds: number): 'prepare' | 'speak' {
  return preparationSeconds > 0 ? 'prepare' : 'speak';
}

/** Everything the next change (preparation / speaking timers) needs to start. */
export interface Session {
  prompt: Prompt;
  preparationSeconds: number;
  speakingSeconds: number;
  /** Screen to open first: preparation, or straight to speaking. */
  next: 'prepare' | 'speak';
}

export function buildSession(
  prompt: Prompt,
  preparationSeconds: number,
  speakingSeconds: number,
): Session {
  return { prompt, preparationSeconds, speakingSeconds, next: sessionAction(preparationSeconds) };
}
