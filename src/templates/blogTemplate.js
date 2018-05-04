import React from "react";
import './blogTemplate.scss';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark, allFile } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;
  const imageNode = allFile.edges.filter(edge => edge.node.relativePath === frontmatter.illustration);

  return (
    <div className="blog-template">
      <div className="blog-template__post">
        <h2 className="blog-template__date">{frontmatter.date}</h2>
        <h1 className="blog-template__title">{frontmatter.title}</h1>
        {imageNode[0] && <img src={imageNode[0].node.publicURL} alt=""/>}
        <div
          className="blog-template__content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(fields: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "YYMMDD")
        title
        illustration
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      edges {
        node {
          relativePath
          publicURL
        }
      }
    }
  }
`;
