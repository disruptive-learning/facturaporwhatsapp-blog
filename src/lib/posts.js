import { getCollection } from "astro:content"

/**
 * All posts, newest first. Drafts (`published: false`) are visible while
 * developing and excluded from production builds.
 */
export async function getPosts() {
  const posts = await getCollection("blog", ({ data }) =>
    import.meta.env.DEV ? true : data.published !== false,
  )

  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

/** URL for a post: frontmatter `slug` wins, otherwise the content file path. */
export function postPath(post) {
  return `/${post.data.slug || post.id}/`
}

/** Matches the old GraphQL `formatString: "MMMM DD, YYYY"`, in UTC. */
export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  })
}

/**
 * Plain-text summary of a post body, replacing GraphQL's `excerpt`.
 * `prune` is a faithful port of the underscore.string implementation the previous
 * Gatsby build used, so the RSS feed's excerpts are unchanged.
 */
export function excerpt(body, pruneLength = 140) {
  const text = (body || "")
    .replace(/```[\s\S]*?```/g, "") // fenced code
    .replace(/^\s*\|.*$/gm, "") // tables
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> link text
    .replace(/^\s{0,3}(?:#{1,6}|>|[-*+]|\d+\.)\s+/gm, "") // block markers
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "") // mdx comments
    .replace(/[*_`~]/g, "")
    .split(/\n\s*\n/)
    .map(block => block.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n\n")

  return prune(text, pruneLength, "…")
}

function prune(str, length, pruneStr) {
  if (str.length <= length) return str

  const tmpl = c => (c.toUpperCase() !== c.toLowerCase() ? "A" : " ")
  let template = str.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, tmpl)

  if (/\w\w/.test(template.slice(-2))) {
    template = template.replace(/\s*\S+$/, "")
  } else {
    template = template.slice(0, -1).replace(/\s+$/, "")
  }

  return (template + pruneStr).length > str.length
    ? str
    : str.slice(0, template.length) + pruneStr
}
