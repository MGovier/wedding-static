import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import UserManager from '../components/UserManager'
import '../style/Bootstrap.scss'
import '../style/Theme.css'
import '../style/Custom.css'

class IndexPage extends PureComponent {
  render () {
    return (
      <UserManager image={this.props.data.rsvpImage} />
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.object
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    rsvpImage: imageSharp(id: { regex: "/rsvp-bg/" }) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
  }
`
