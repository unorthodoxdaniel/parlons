-- Cleanup after the relational-model rollout: the application reads prompts
-- through language_id/theme_id (languages.code, themes.key), so the legacy
-- text columns are no longer needed.

alter table public.prompts
  drop column language,
  drop column theme;
