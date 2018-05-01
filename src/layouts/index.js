import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header/header'
import Footer from '../components/footer'
import './normalize.css'
import './reset.css'
import './index.css'

const Layout = ({ children, data }) => (
  <div style={{ padding: '24px', }}>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'change is good' },
        { name: 'keywords', content: 'comics, graphic design, javascript, frontend, react, engineer, blog, wordpress, running' },
      ]}
      link={[
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Karla:400,400i,700,700i' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Inconsolata' },
      ]}
    />
    <Header title={data.site.siteMetadata.title} />
      {children()}
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
