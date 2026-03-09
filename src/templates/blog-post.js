import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({
  data: { previous, next, previousMdx, nextMdx, site, markdownRemark, mdx },
  location,
  children,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const post = markdownRemark || mdx
  const isMdx = !!mdx
  const prev = previous || previousMdx
  const nxt = next || nextMdx

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          {post.frontmatter.description && (
            <p className="post-description">{post.frontmatter.description}</p>
          )}
          <div className="post-meta">
            <small>{post.frontmatter.date}</small>
            {post.frontmatter.author && (
              <small> · {post.frontmatter.author}</small>
            )}
          </div>
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="post-tags">
              {post.frontmatter.tags.map(tag => (
                <span key={tag} className="post-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <section itemProp="articleBody">
          {isMdx ? (
            children
          ) : (
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          )}
        </section>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {prev && (
              <Link to={prev.fields.slug} rel="prev">
                ← {prev.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {nxt && (
              <Link to={nxt.fields.slug} rel="next">
                {nxt.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <p className="back-to-blog">
        <Link to="/">← Back to blog</Link>
      </p>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark, mdx } }) => {
  const post = markdownRemark || mdx
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        author
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        author
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    previousMdx: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    nextMdx: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
