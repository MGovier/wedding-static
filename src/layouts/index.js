import React from 'react'
import Header from '../components/Header'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet
      title='Birgit and Merlin 2018'
      meta={[
        { name: 'description', content: 'Information for Birgit and Merlin Wedding October 2018' },
        { name: 'keywords', content: 'eastington, wedding, birgit, merlin, govier' },
      ]}
    />
    <Header />
    { children() }
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
