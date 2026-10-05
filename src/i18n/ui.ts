// Interface strings. This is the interface language only; it is independent of
// the language being practised. Add keys to both languages.

const en = {
  tagline: 'Speaking prompts',
  headline: 'Let’s talk.',
  promptsHeading: 'Prompts',
  loading: 'Loading…',
  loadError: 'Could not load prompts. Try again in a moment.',
  empty: 'No prompts yet.',
  interfaceLanguage: 'Interface language',
};

const fr: Record<keyof typeof en, string> = {
  tagline: 'Sujets pour parler',
  headline: 'Parlons.',
  promptsHeading: 'Sujets',
  loading: 'Chargement…',
  loadError: 'Impossible de charger les sujets. Réessaie dans un instant.',
  empty: 'Aucun sujet pour l’instant.',
  interfaceLanguage: 'Langue de l’interface',
};

export const ui = { en, fr };
export type UiKey = keyof typeof en;
