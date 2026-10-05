// Interface strings. This is the interface language only; it is independent of
// the language being practised. Add keys to both languages.

const en = {
  tagline: 'Speaking prompts',
  headline: 'Let’s talk.',
  interfaceLanguage: 'Interface language',

  stageHeading: 'Your prompt',
  settingsHeading: 'Settings',
  practiceLanguage: 'Practice language',
  theme: 'Theme',
  themeRandom: 'Random',
  preparationTime: 'Preparation time',
  speakingTime: 'Speaking time',
  spontaneous: 'Spontaneous',

  placeholder: 'Nothing drawn yet. Spin for a prompt.',
  loading: 'Loading prompts…',
  loadError: 'Could not load prompts. Try again in a moment.',
  retry: 'Try again',
  empty: 'No prompts yet.',
  noMatch: 'No prompts for this language and theme yet. Try Random or another theme.',
  cleared: 'Your settings changed, so that prompt was cleared. Spin for a new one.',

  spin: 'Spin →',
  spinAgain: 'Spin again →',
  prepare: 'Prepare →',
  startSpeaking: 'Start speaking →',
  sessionSoon: 'The timers are coming soon.',
};

const fr: Record<keyof typeof en, string> = {
  tagline: 'Sujets pour parler',
  headline: 'Parlons.',
  interfaceLanguage: 'Langue de l’interface',

  stageHeading: 'Ton sujet',
  settingsHeading: 'Réglages',
  practiceLanguage: 'Langue de pratique',
  theme: 'Thème',
  themeRandom: 'Aléatoire',
  preparationTime: 'Temps de préparation',
  speakingTime: 'Temps de parole',
  spontaneous: 'Spontané',

  placeholder: 'Rien de tiré pour l’instant. Lance la roulette pour un sujet.',
  loading: 'Chargement des sujets…',
  loadError: 'Impossible de charger les sujets. Réessaie dans un instant.',
  retry: 'Réessayer',
  empty: 'Aucun sujet pour l’instant.',
  noMatch: 'Pas encore de sujet pour cette langue et ce thème. Essaie Aléatoire ou un autre thème.',
  cleared: 'Tes réglages ont changé, le sujet a été retiré. Relance la roulette pour un nouveau sujet.',

  spin: 'Lancer la roulette →',
  spinAgain: 'Relancer →',
  prepare: 'Se préparer →',
  startSpeaking: 'Commencer à parler →',
  sessionSoon: 'Les minuteurs arrivent bientôt.',
};

export const ui = { en, fr };
export type UiKey = keyof typeof en;

// Theme names are presentation only. The database keys (themes.key) are
// language-independent; unknown keys fall back to the database name.
const themeNames = {
  en: { technology: 'Technology', work: 'Work', travel: 'Travel' } as Record<string, string>,
  fr: { technology: 'Technologie', work: 'Travail', travel: 'Voyage' } as Record<string, string>,
};

export function themeName(key: string, fallback: string) {
  return { en: themeNames.en[key] ?? fallback, fr: themeNames.fr[key] ?? fallback };
}

// Markup for text shown in both interface languages (same shape as T.astro),
// for text the page script writes at runtime. Inputs are static or escaped.
const escapeHtml = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export function bilingual(text: { en: string; fr: string }) {
  return (
    `<span class="ui" lang="en">${escapeHtml(text.en)}</span>` +
    `<span class="ui" lang="fr">${escapeHtml(text.fr)}</span>`
  );
}

export function t(key: UiKey) {
  return bilingual({ en: ui.en[key], fr: ui.fr[key] });
}
