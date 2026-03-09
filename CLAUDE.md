# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run develop    # Start dev server at localhost:8000
bun run build      # Production build
bun run serve      # Serve production build locally
bun run clean      # Clear Gatsby cache (.cache and public/)
bun run format     # Format with Prettier
```

No test suite is configured (the `test` script is a placeholder). Use bun (not npm) as the package manager.

## Architecture

This is a **Gatsby 5 blog** with MDX support. `.mdx` is the preferred format for new posts; `.md` files continue to work for backwards compatibility with the starter's sample posts.

### Content Flow

1. Content files in `content/blog/<post-slug>/index.mdx` (or `.md`) are sourced via `gatsby-source-filesystem`
2. `.mdx` files → `gatsby-plugin-mdx` → `allMdx` GraphQL nodes
3. `.md` files → `gatsby-transformer-remark` → `allMarkdownRemark` GraphQL nodes
4. `gatsby-node.js` queries both node types, filters out `published: false` posts in production, and creates a page per post using `src/templates/blog-post.js`
5. MDX pages use the `?__contentFilePath=` suffix on the component path so MDX content is injected as `children` into the template
6. Slugs are derived from frontmatter `slug` field first, then fall back to the file path

### Frontmatter Schema

```md
---
title: Post Title          # required
date: "2026-01-01T00:00:00.000Z"  # required, ISO 8601
description: "..."         # required, used for SEO
slug: ""                   # optional, overrides path-derived slug
tags: []                   # optional, rendered as pill chips
author: ""                 # optional, defaults to siteMetadata.author.name
published: true            # optional, false hides post from production builds
---
```

### Key Files

- `gatsby-config.js` — site metadata (title, author, siteUrl), plugin config; update `siteMetadata` here for site identity
- `gatsby-node.js` — page creation for both MDX and MD, slug generation, GraphQL schema customization
- `src/pages/index.js` — blog listing page; merges MDX + MD post lists, sorts by date, filters drafts
- `src/templates/blog-post.js` — single post template; renders `{children}` for MDX, `dangerouslySetInnerHTML` for MD; displays title, description, date, author, tag pills, prev/next nav, "Back to blog" link
- `src/components/bio.js` — author bio (reads from `siteMetadata.author`)
- `src/components/layout.js` — site wrapper with header/footer
- `src/style.css` — global styles including `.post-tag`, `.post-description`, `.post-meta` classes
- `content/blog/_template.mdx` — copy this when creating new posts

### Adding a New Blog Post

```bash
cp content/blog/_template.mdx content/blog/my-post-slug/index.mdx
```

Fill in frontmatter, write content. Posts with `published: false` are visible in dev but excluded from production builds.
