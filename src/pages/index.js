import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data: { allMarkdownRemark: { edges }}}) => (
  <div>
    {edges.map(post => (
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
            title
            date(formatString: "YYMMDD")
          }
        }
      }
    }
  }
`;
