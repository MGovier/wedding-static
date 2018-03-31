import React, { PureComponent } from 'react'
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

class TemplateWrapper extends PureComponent {
  render () {
    return (
      <div>
        <Helmet
          title={this.props.data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: 'Information for Birgit and Merlin Wedding October 2018'
            },
            {
              name: 'keywords',
              content: 'eastington, wedding, birgit, merlin, govier'
            }
          ]}
        />
        <Header
          changeEn={() => this.props.i18n.changeLanguage('en')}
          changeNl={() => this.props.i18n.changeLanguage('nl')}
          language={this.props.i18n.language}
        />
        <Hero image={this.props.data.heroImage} />
        <Couple />
        <Location />
        <Venue />
        {this.props.children()}
        <Footer />
      </div>
    )
  }
}

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
