import rss from "@astrojs/rss"

import { SITE } from "../consts.js"
import { excerpt, getPosts, postPath } from "../lib/posts.js"

export async function GET(context) {
  const posts = await getPosts()

  return rss({
    title: SITE.rssTitle,
    description: SITE.description,
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: excerpt(post.body),
      link: postPath(post),
    })),
  })
}
