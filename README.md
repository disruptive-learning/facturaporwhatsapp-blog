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

Netlify builds with `bun run build` and publishes `dist/` (see `netlify.toml`).
