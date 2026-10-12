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

/** Accept only settings the practice controls can represent. */
export function replaySettings(value: {preparation_seconds: unknown; speaking_seconds: unknown}) {
  const prep = value.preparation_seconds;
  const speak = value.speaking_seconds;
  return typeof prep === 'number' && [0,120,300,600].includes(prep) &&
    typeof speak === 'number' && [60,150,300,600].includes(speak)
    ? {preparationSeconds: prep, speakingSeconds: speak} : null;
}
export function validSessionId(value: string | null): value is string {
  return !!value && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}
