import React, { Component } from 'react'
import LogIn from './LogIn'
import RSVP from './RSVP'

class UserManager extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      name: ['Lucy', 'Shannon'],
      coming: false
    }
  }
  render () {
    let extraContent = null
    if (this.state.loggedIn) {
      extraContent = <div><RSVP /></div>
    }
    return (
      <div>
        <div className='main-container'>
          <LogIn loggedIn={this.state.loggedIn} name={this.state.name} image={this.props.image} />
          { extraContent }
        </div>
      </div>
    )
  }
}

export default UserManager
