/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// add all markdown content to gatsby graphQL from src/data with correct paths
 exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;

  // BLOG POSTS
  if (node.internal.type === `MarkdownRemark` && node.frontmatter.layout === 'post') {
    const fileNode = getNode(node.parent);
    // relative path structure: YYYY-MM-DD-blog-post-title.md
    const fragments = fileNode.relativePath.split('-');
    const folderName = fragments.slice(0, 3).join('').slice(2); // => YYMMDD
    const fileName = fragments.slice(3).join('-').replace('.md', ''); // => blog-post-title

    createNodeField({
      node,
      name: `path`,
      value: `/${folderName}/${fileName}`,
    })
  }

  // COMICS
  if (node.internal.type === `MarkdownRemark` && node.frontmatter.layout === 'comic') {
    const fileNode = getNode(node.parent);
    // relative path structure: comic-title.md
    const fileName = fileNode.relativePath.replace('.md', ''); // => comic-title

    createNodeField({
      node,
      name: `path`,
      value: `/comics/${fileName}`,
    })
  }
 };


 const path = require("path");

 exports.createPages = ({ boundActionCreators, graphql }) => {
   const { createPage } = boundActionCreators;

   const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);

   return graphql(`
     {
       allMarkdownRemark(
         sort: { order: DESC, fields: [frontmatter___date] }
         limit: 1000
       ) {
         edges {
           node {
             fields {
               path
             }
           }
         }
       }
     }
   `).then(result => {
     if (result.errors) {
       return Promise.reject(result.errors);
     }

     result.data.allMarkdownRemark.edges.forEach(({ node }) => {
       createPage({
         path: node.fields.path,
         component: blogPostTemplate,
         context: {}, // additional data can be passed via context
       });
     });
   });
 };
