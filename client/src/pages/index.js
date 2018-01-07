import React from 'react'
import Header from '../components/Header'
import UserManager from '../components/UserManager'
import 'bootstrap/dist/css/bootstrap.css'
import '../style/Theme.css'
import '../style/Custom.css'

const IndexPage = () => (
  <div className='App'>
    <UserManager />
  </div>
)

export default IndexPage
