export const INTENT_KEY = 'parlons:hide-intent';
export interface HideIntent { promptId: number; expires: number; }
export function parseIntent(raw: string | null, now = Date.now()): HideIntent | null {
  try {
    const value = JSON.parse(raw ?? 'null');
    return value && Number.isSafeInteger(value.promptId) && value.promptId > 0 &&
      Number.isFinite(value.expires) && value.expires > now && value.expires <= now + 15 * 60_000
      ? {promptId: value.promptId, expires: value.expires} : null;
  } catch { return null; }
}
export function spokenMilliseconds(seconds: number, remaining: number) {
  return Math.round(Math.max(0, Math.min(seconds * 1000, seconds * 1000 - remaining)));
}
