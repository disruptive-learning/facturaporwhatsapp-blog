const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const blogPost = path.resolve(`./src/templates/blog-post.js`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const isDevelopment = process.env.NODE_ENV === `development`

  // Query MDX posts
  const mdxResult = await graphql(`
    {
      allMdx(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          frontmatter {
            slug
            published
            tags
            author
          }
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  // Query Markdown posts
  const mdResult = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          frontmatter {
            slug
            published
            tags
            author
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  if (mdxResult.errors) {
    reporter.panicOnBuild(`Error loading MDX posts`, mdxResult.errors)
    return
  }
  if (mdResult.errors) {
    reporter.panicOnBuild(`Error loading Markdown posts`, mdResult.errors)
    return
  }

  const mdxPosts = mdxResult.data.allMdx.nodes.filter(
    node => isDevelopment || node.frontmatter.published !== false
  )
  const mdPosts = mdResult.data.allMarkdownRemark.nodes.filter(
    node => isDevelopment || node.frontmatter.published !== false
  )

  mdxPosts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : mdxPosts[index - 1].id
    const nextPostId =
      index === mdxPosts.length - 1 ? null : mdxPosts[index + 1].id
    const slug = post.frontmatter.slug || post.fields.slug

    createPage({
      path: slug,
      component: `${blogPost}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        id: post.id,
        previousPostId,
        nextPostId,
        tags: post.frontmatter.tags || [],
        author: post.frontmatter.author || null,
      },
    })
  })

  mdPosts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : mdPosts[index - 1].id
    const nextPostId =
      index === mdPosts.length - 1 ? null : mdPosts[index + 1].id
    const slug = post.frontmatter.slug || post.fields.slug

    createPage({
      path: slug,
      component: blogPost,
      context: {
        id: post.id,
        previousPostId,
        nextPostId,
        tags: post.frontmatter.tags || [],
        author: post.frontmatter.author || null,
      },
    })
  })
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (
    node.internal.type === `MarkdownRemark` ||
    node.internal.type === `Mdx`
  ) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Mdx implements Node {
      frontmatter: MdxFrontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      slug: String
      tags: [String]
      author: String
      published: Boolean
    }

    type MdxFrontmatter {
      title: String
      description: String
      date: Date @dateformat
      slug: String
      tags: [String]
      author: String
      published: Boolean
    }

    type Fields {
      slug: String
    }
  `)
}
