import React, { PureComponent } from 'react'
import LogIn from './LogIn'
import RSVP from './RSVP'

class UserManager extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      data: {}
    }
  }
  setStatus = (logIn, d = {}) => {
    this.setState({loggedIn: logIn, data: d})
  }
  componentDidMount () {
    window.fetch(process.env.API_URL + 'rsvp', { credentials: 'include' })
      .then(response => {
        return new Promise((resolve, reject) => {
          if (response.status !== 200) {
            reject(new Error('non 200 status code'))
          }
          response
            .json()
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
      })
      .then(data => {
        this.setState({ loggedIn: true, data })
      })
      .catch(() => {
        this.setState({ loggedIn: false })
      })
  }
  render () {
    return (
      <div>
        <div className='main-container'>
          <LogIn loggedIn={this.state.loggedIn} data={this.state.data} image={this.props.image} setStatus={this.setStatus} />
          {this.state.loggedIn && <RSVP data={this.state.data} />}
        </div>
      </div>
    )
  }
}

export default UserManager
