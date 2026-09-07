import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

// Posts live in content/blog/<post-slug>/index.mdx, outside of src/.
// The [^_] prefix keeps _template.mdx out of the collection.
const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    slug: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    published: z.boolean().optional(),
  }),
})

export const collections = { blog }
