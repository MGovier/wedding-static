import React from 'react'
import UserManager from '../components/UserManager'
import '../style/Bootstrap.scss'
import '../style/Theme.css'
import '../style/Custom.css'

const IndexPage = ({ data }) => (
  <div className='App'>
    <UserManager image={data.rsvpImage} />
  </div>
)

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