import React, { Component } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Couple from '../components/Couple'
import Location from '../components/Location'
import Venue from '../components/Venue'
import LogIn from './LogIn'
import RSVP from './RSVP'

class UserManager extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: true,
      name: ['Lucy', 'Shannon'],
      coming: false
    }
  }
  render () {
    let extraContent = null
    if (this.state.authenticated) {
      extraContent = <div><RSVP /></div>
    }
    return (
      <div>
        <Header />
        <div className='main-container'>
          <Hero />
          <Couple />
          <Location />
          <Venue />
          <LogIn loggedIn={this.state.loggedIn} name={this.state.name} />
          { extraContent }
        </div>
      </div>
    )
  }
}

export default UserManager
