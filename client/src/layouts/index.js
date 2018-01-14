import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Couple from '../components/Couple'
import Location from '../components/Location'
import Venue from '../components/Venue'
import Footer from '../components/Footer'

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Information for Birgit and Merlin Wedding October 2018' },
        { name: 'keywords', content: 'eastington, wedding, birgit, merlin, govier' }
      ]}
    />
    <Header />
    <Hero image={data.heroImage} />
    <Couple />
    <Location />
    <Venue />
    { children() }
    <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object
}

export default TemplateWrapper

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
    heroImage: imageSharp(id: { regex: "/autumn-bg/" }) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
  }
`
