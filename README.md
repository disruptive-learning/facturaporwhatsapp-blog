# Factura por WhatsApp — Blog

A Gatsby 5 blog with MDX support for the Factura por WhatsApp project.

## Development

```shell
gatsby develop   # Start dev server at http://localhost:8000
gatsby build     # Production build
gatsby clean     # Clear cache if you hit stale data issues
```

The GraphQL explorer is available at `http://localhost:8000/___graphql` during development.

## Creating a new blog post

1. Copy `content/blog/_template.mdx` to a new directory under `content/blog/`:

   ```shell
   cp -r content/blog/_template.mdx content/blog/my-new-post/index.mdx
   ```

2. Fill in the frontmatter fields. `title`, `date`, and `description` are required. All other fields are optional.

3. Write your content below the `---` closing delimiter. The file is MDX, so you can use React components inline alongside standard Markdown.

### The `published` flag

- `published: true` (default) — post appears in development and production.
- `published: false` — post is **hidden in production builds** but still rendered during `gatsby develop`, so you can preview drafts locally before pushing.

### Frontmatter reference

| Field         | Required | Description |
|---------------|----------|-------------|
| `title`       | yes      | Post title shown in the header and listing |
| `date`        | yes      | ISO 8601 date, e.g. `"2026-03-09T10:00:00.000Z"` |
| `description` | yes      | Short summary used as the SEO meta description and post subtitle |
| `slug`        | no       | Custom URL path. If omitted, derived from the directory name |
| `tags`        | no       | Array of strings shown as tag pills, e.g. `["whatsapp", "facturación"]` |
| `author`      | no       | Overrides the default site author from `gatsby-config.js` |
| `published`   | no       | Boolean, defaults to `true`. Set to `false` to keep a post as a draft |

## Deploying

Pushing to `master` triggers a production deploy. Draft posts (`published: false`) are automatically excluded from the production build.
