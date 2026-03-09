# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run develop    # Start dev server at localhost:8000
npm run build      # Production build
npm run serve      # Serve production build locally
npm run clean      # Clear Gatsby cache (.cache and public/)
npm run format     # Format with Prettier
```

No test suite is configured (the `test` script is a placeholder).

## Architecture

This is a **Gatsby 5 blog** built from `gatsby-starter-blog`, using Markdown files as the content source.

### Content Flow

1. Markdown files in `content/blog/<post-slug>/index.md` are sourced via `gatsby-source-filesystem`
2. `gatsby-transformer-remark` converts them to `MarkdownRemark` GraphQL nodes
3. `gatsby-node.js` queries all posts and creates a page per post using `src/templates/blog-post.js`
4. Slugs are derived from the file path via `createFilePath`

### Frontmatter Schema

Each blog post requires:
```md
---
title: Post Title
date: "2024-01-01T00:00:00.000Z"
description: "Short description"
---
```

### Key Files

- `gatsby-config.js` — site metadata (title, author, siteUrl, social), plugin config
- `gatsby-node.js` — page creation logic, slug generation, GraphQL schema customization
- `src/pages/index.js` — blog listing page
- `src/templates/blog-post.js` — individual post template with prev/next navigation
- `src/components/bio.js` — author bio (reads from `siteMetadata.author`)
- `src/components/layout.js` — site wrapper with header/footer
- `src/style.css` / `src/normalize.css` — global styles (loaded in `gatsby-browser.js`)

### Adding a New Blog Post

Create `content/blog/<slug>/index.md` with required frontmatter. Images placed in the same directory can be referenced relatively and are processed by `gatsby-remark-images`.

### Plugins

- `gatsby-remark-prismjs` — syntax highlighting in code blocks
- `gatsby-plugin-feed` — generates `/rss.xml`
- `gatsby-plugin-manifest` — PWA manifest
- `gatsby-plugin-image` + `gatsby-transformer-sharp` — optimized images
