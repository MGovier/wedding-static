import React, { PureComponent } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from './Header'
import Hero from './Hero'
import Couple from './Couple'
import Location from './Location'
import Venue from './Venue'
import Footer from './Footer'

import './i18n'
import { translate } from 'react-i18next'

class TemplateWrapper extends PureComponent {
  render () {
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            site {
              siteMetadata {
                title
              }
            }
            heroImage: imageSharp(fluid: {originalName: {regex: "/autumn-bg/"}}) {
              sizes(maxWidth: 1500) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
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
            <Hero image={data.heroImage} />
            <Couple />
            <Location />
            <Venue />
            {this.props.children}
            <Footer />
          </>
        )}
      />
    )
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object
}

export default translate('translations')(TemplateWrapper)
