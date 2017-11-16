import React from 'react'
import Header from '../components/Header'
import PropTypes from 'prop-types'

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Header />
    { children() }
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
