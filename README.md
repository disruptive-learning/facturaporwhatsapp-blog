# Factura por WhatsApp — Blog

An Astro 7 blog with MDX support for the Factura por WhatsApp project.

## Development

Requires Node 22.12 or newer (see `.nvmrc`) and [bun](https://bun.sh).

```shell
bun install
bun run develop   # Start dev server at http://localhost:4321
bun run build     # Production build into dist/
bun run serve     # Preview the production build
bun run clean     # Remove dist/ and .astro/
```

## Creating a new blog post

1. Copy `content/blog/_template.mdx` to a new directory under `content/blog/`:

   ```shell
   cp content/blog/_template.mdx content/blog/my-new-post/index.mdx
   ```

2. Fill in the frontmatter fields. `title`, `date` and `description` are required and are
   validated at build time. All other fields are optional.

3. Write your content below the `---` closing delimiter. The file is MDX, so you can use
   components inline alongside standard Markdown (GitHub-Flavored Markdown, including
   tables, is supported out of the box).

### The `published` flag

- `published: true` (default) — post appears in development and production.
- `published: false` — post is **hidden in production builds** but still rendered during
  `bun run develop`, so you can preview drafts locally before pushing.

## Stack

- [Astro](https://astro.build) — static site generation, no client-side JavaScript
- [`@astrojs/mdx`](https://docs.astro.build/en/guides/integrations-guide/mdx/) — MDX posts
- [`@astrojs/rss`](https://docs.astro.build/en/guides/rss/) — feed at `/rss.xml`

Posts are a content collection defined in `src/content.config.ts` and sourced from
`content/blog/`. Site identity (title, description, URL, author) lives in `src/consts.js`.

## Deployment

Firebase Hosting, deployed by Cloud Build on merge to `master`.

A push to `master` fires the Cloud Build trigger, which runs `bun install
--frozen-lockfile`, `bun run build`, then `firebase deploy --only=hosting`.
Auth rides on the build service account -- there is no deploy token to rotate.

- `cloudbuild.yaml` — the three build steps
- `firebase.json` — hosting site, `dist/` as the public dir, and cache headers
  (content-hashed `/_astro/` assets are immutable for a year; HTML always revalidates).
  Firebase applies the **last** matching header rule, so the broad `**` rule comes
  first and the specific ones override it.

To deploy by hand from a clean checkout:

```shell
bun install && bun run build
firebase deploy --only=hosting --project=factura-por-whatsapp
```
