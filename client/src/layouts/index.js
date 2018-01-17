import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Couple from '../components/Couple'
import Location from '../components/Location'
import Venue from '../components/Venue'
import Footer from '../components/Footer'

import '../components/i18n'
import { translate } from 'react-i18next'

const TemplateWrapper = ({ children, data, i18n }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Information for Birgit and Merlin Wedding October 2018' },
        { name: 'keywords', content: 'eastington, wedding, birgit, merlin, govier' }
      ]}
    />
    <Header changeEn={() => i18n.changeLanguage('en')} changeNl={() => i18n.changeLanguage('nl')} language={i18n.language} />
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

export default translate('translations')(TemplateWrapper)

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
