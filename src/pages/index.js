import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data: { allMarkdownRemark: { edges }}}) => (
  <div>
    <h2>Blog</h2>
    {edges
      .filter(post => post.node.frontmatter.layout === 'post')
      .map(post => (
      <div>{post.node.frontmatter.date}<Link to={post.node.fields.path}>{post.node.frontmatter.title}</Link></div>
    ))}

    <h2>Comics</h2>
    {edges
      .filter(post => post.node.frontmatter.layout === 'comic')
      .map(post => (
      <div>{post.node.frontmatter.date}<Link to={post.node.fields.path}>{post.node.frontmatter.title}</Link></div>
    ))}
  </div>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields {
            path
          }
          frontmatter {
            layout
            title
            date(formatString: "YYMMDD")
          }
        }
      }
    }
  }
`;
