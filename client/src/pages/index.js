import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Couple from '../components/Couple'
import Location from '../components/Location'
import Venue from '../components/Venue'
import UserManager from '../components/UserManager'
import 'bootstrap/dist/css/bootstrap.css'
import '../style/Theme.css'
import '../style/Custom.css'

const IndexPage = () => (
  <div className='App'>
    <Header />
    <div className='main-container'>
      <Hero />
      <Couple />
      <Location />
      <Venue />
      <UserManager />
    </div>
  </div>
)

export default IndexPage
