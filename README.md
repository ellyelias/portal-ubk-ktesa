# vinext-starter

A clean full-stack starter running on [vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`
- Linux with `flock`, `curl`, and GNU `timeout`

## Sites Lifecycle

The Sites lifecycle CLI runs the locked dependency install before returning this checkout. Edit the source under `app/`, then checkpoint when a coherent milestone is ready to inspect or share. The remote Sites builder runs `npm run build` against the pushed commit. Do not repeat install or build as a normal pre-checkpoint step.

This starter does not use `wrangler.jsonc`.

`install:ci` is intentionally a single, non-retrying `npm ci`. It refuses a concurrent install for the same project, consumes a matching image-seeded npm cache with `--prefer-offline` while retaining registry fallback for a missing cache object, otherwise downloads and verifies the complete vinext tarball recorded in `package-lock.json`, limits npm to one socket, and terminates a stalled install. `build` applies a short timeout. These helpers target Linux and use GNU `timeout`; they are not native macOS scripts.

Scripts that need writable project-scoped home, npm, XDG, and temporary paths use `scripts/sites-env.sh`. The `dev` and `start` scripts honor the caller's runtime environment and keep Wrangler logs inside the checkout. The generated `.sites-runtime/` directory is disposable and ignored by Git.

## Included Shape

- edit site code under `app/`
- `app/access-auth.ts` verifies Cloudflare Access identity (JWT) for protected routes — see "Deploying outside ChatGPT Sites" below
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings (only relevant if this project is still previewed inside ChatGPT Sites)
- `vite.config.ts` simulates declared bindings for local development
- `db/index.ts` reads the D1 binding from the Cloudflare Worker environment
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Deploying outside ChatGPT Sites

This project no longer depends on ChatGPT Sites hosting. It deploys as a plain Cloudflare Worker (via the `@cloudflare/vite-plugin` already wired up in `vite.config.ts`), with `/kaunselor` protected by **Cloudflare Access** instead of "Sign in with ChatGPT".

### 1. Create a real D1 database

```sh
npx wrangler d1 create site-creator-d1
```

Copy the `database_id` it prints, and put it in `vite.config.ts` in place of `SITE_CREATOR_PLACEHOLDER_DATABASE_ID`.

Then apply the schema:

```sh
npm run db:generate
npx wrangler d1 migrations apply site-creator-d1 --remote
```

### 2. Set up Cloudflare Access in front of /kaunselor

In the Cloudflare Zero Trust dashboard: Access → Applications → Add an application → Self-hosted.

- Path: your domain + `/kaunselor*`
- Policy: allow only the specific counselor/admin emails (or your school's Google Workspace domain)
- After saving, copy the application's **Audience (AUD) tag** and your **team domain** (`<team-name>.cloudflareaccess.com`)

### 3. Set Worker environment variables

In the Cloudflare dashboard (Workers & Pages → your Worker → Settings → Variables), or in `vite.config.ts`'s `localBindingConfig.vars` for local testing, set:

- `CF_ACCESS_TEAM_DOMAIN` — e.g. `yourteam.cloudflareaccess.com`
- `CF_ACCESS_AUD` — the Audience tag from step 2
- `KAUNSELOR_ROLES` — comma-separated `email:role` pairs, e.g.
  `admin@example.com:admin,counselor@example.com:kaunselor`

These replace the emails that used to be hardcoded in `app/api/kaunselor/route.ts`, so they are never committed to this (public) repository.

### 4. Deploy

```sh
npm run build
npx wrangler deploy
```

### 5. Connect GitHub for auto-deploy (optional)

In Cloudflare dashboard → Workers & Pages → Create → connect this GitHub repository, so every push to `main` triggers `npm run build && npx wrangler deploy` automatically. GitHub itself only stores the code — Cloudflare is what runs it.

## Diagnostic Commands

- `npm run install:ci`: perform the one bounded lockfile install
- `npm run dev`: start the Vite/Vinext development server
- `npm run build`: build the deployable Sites artifact
- `npm run start`: start the built Vinext application
- `npm test`: build and verify the rendered development-preview metadata
- `npm run db:generate`: generate Drizzle migrations after schema changes

Use build commands for targeted diagnosis after a remote failure, not as part of the normal checkpoint path.

The timeout defaults can be overridden for a controlled canary with `SITES_INSTALL_TIMEOUT`, `SITES_INSTALL_KILL_AFTER`, `SITES_BUILD_TIMEOUT`, and `SITES_BUILD_KILL_AFTER`. A timeout fails the command; the helpers never retry an unchanged install or build.

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
