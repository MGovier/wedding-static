import React, { PureComponent } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import UserManager from '../components/UserManager'
import Layout from '../components/layout'
import '../style/Bootstrap.scss'
import '../style/Theme.css'
import '../style/Custom.css'

class IndexPage extends PureComponent {
  render () {
    return (
      <Layout>
        <UserManager image={this.props.data.rsvpImage} />
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.object
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    rsvpImage: imageSharp(fluid: {originalName: {regex: "/rsvp-bg/"}}) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
  }
`
