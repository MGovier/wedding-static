import React, { Component } from 'react'
import LogIn from './LogIn'
import LoggedIn from './LoggedIn'
import RSVP from './RSVP'

class UserManager extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authenticated: true
    }
  }
  render () {
    if (this.state.authenticated) {
      return <div><LoggedIn /> <RSVP /></div>
    }
    return <LogIn />
  }
}

export default UserManager
