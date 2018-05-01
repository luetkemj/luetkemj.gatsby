import React from 'react'
import Link from 'gatsby-link'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

const Footer = ({ siteTitle }) => (
  <div>
    <ul>
      <li>
        <OutboundLink href="https://github.com/luetkemj">github</OutboundLink>
      </li>
      <li>
        <OutboundLink href="https://twitter.com/markluetke">twitter</OutboundLink>
      </li>
      <li>
        <OutboundLink href="https://www.instagram.com/luetkemj/">instagram</OutboundLink>
      </li>
    </ul>

    <ul>
      <li>
        <Link to="/about">about</Link>
      </li>
      <li>
        <Link to="/contact">contact</Link>
      </li>
      <li>
        <Link to="/feed.xml">rss</Link>
      </li>
    </ul>
  </div>
)

export default Footer
