module.exports = {
  siteMetadata: {
    title: 'luetkemj',
    description: 'change is good',
    siteUrl: 'https://luetkemj.github.io/',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: "markdown-pages",
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              console.log(allMarkdownRemark.edges.map(edge => edge.node.frontmatter));
              return allMarkdownRemark.edges
                .filter(edge => edge.node.frontmatter.layout !== 'comic')
                .map(edge => {
                  return Object.assign({}, edge.node.frontmatter, {
                    url: site.siteMetadata.siteUrl + edge.node.fields.path,
                    guid: site.siteMetadata.siteUrl + edge.node.fields.path,
                    custom_elements: [{ "content:encoded": edge.node.html }],
                  });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      html
                      fields { path }
                      frontmatter {
                        title
                        date
                        layout
                      }
                    }
                  }
                }
              }
            `,
            output: "/feed.xml",
          },
        ],
      },
    },
  ],
}
