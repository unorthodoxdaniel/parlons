# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Anonymous practice

Choose a practice language independently of the FR/EN interface switch. Random
includes every theme; specific themes come from Supabase. Re-spin avoids the
previous prompt when another eligible prompt exists. Preparation defaults to
10 minutes, with 5, 2 and spontaneous options; speaking offers 1, 2:30, 5 and
10 minutes, defaulting to 1 minute. Preparation ends at a ready screen; speaking starts explicitly.
Timers support pause/resume, skip preparation and finish early. Another prompt
returns home, clears the prompt and keeps settings for this page visit only.
Reloading resets the session. No recording or session data is stored.

Run `npm test` for filtering and deadline timer tests and `npm run build` for
the production build. Browser verification covered both interface languages,
independent practice language, theme filtering, re-spin, constraint invalidation,
preparation/ready/speaking/completion, pause/resume, spontaneous preparation,
automatic deadlines, empty/error/retry states, reduced motion and 375px layout
using mocked Supabase read responses. Keyboard activation and transition focus
also passed. The configured local Supabase connection loaded successfully;
production deployment credentials should be checked when releasing.

Sound is off by default. Enable it with the Sound control to hear a brief preview,
soft roulette ticks and a reveal note, a preparation-end chime and a two-note speaking-end cue. Muting stops active
cues. Sound uses the browser Web Audio API and stays optional; audio failures
do not affect the session. The choice lasts for this page visit only.

## Authentication

Email-code sign-in and optional Google/Apple OAuth are documented in
[the authentication tutorial](docs/authentication.md). Hosted Supabase email
configuration and provider credentials must be set up separately; local config
changes do not modify the hosted project. Social buttons remain hidden until
their `PUBLIC_AUTH_GOOGLE` / `PUBLIC_AUTH_APPLE` flags are enabled. No private
history or saved-prompt tables are introduced in this batch.

Private practice: [tutorial](docs/private-practice.md), [backlog](docs/backlog.md), and [launch checklist](docs/before-launch.md).
