import React from "react";
import './blogTemplate.scss';
import { last } from 'lodash';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark, allFile } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;

  function getBannerImage() {
    // check if there is an banner image and just return if not.
    if (frontmatter.illustration) {
      // check if image is external
      if (frontmatter.illustration.startsWith('http')) {
        // go ahead and return external images as is
        return frontmatter.illustration;
      } else {
        // filter on all imageNodes and find the right one
        const imageNode = allFile.edges.filter(edge => edge.node.relativePath === last(frontmatter.illustration.split('/')));
        return imageNode[0].node.publicURL;
      }
    }

    return;
  }

  const bannerImage = getBannerImage();

  return (
    <div className="blog-template">
      <div className="blog-template__post">
        {bannerImage && <img className="blog-template__banner-image" src={bannerImage} alt=""/>}
        <h2 className="blog-template__date">{frontmatter.date}</h2>
        <h1 className="blog-template__title">{frontmatter.title}</h1>
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
