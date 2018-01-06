import React, { Component } from 'react'
import { Container, Row, Col, Input, Button } from 'reactstrap'

class LoggedIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ['Greg', 'Keith']
    }
  }
  friendlyNames = () => {
    if (this.state.name.length > 1) {
      return `${this.state.name[0]} and ${this.state.name[1]}`
    }
    return `${this.state.name[0]}`
  }
  render () {
    return (
      <section id='rsvp' className='rsvp'>
        <Container>
          <Row className='justify-content-center'>
            <Col className='align-self-center text-center-if-small' sm={{ size: 9 }} xs={{ size: 12 }}>
              <h3>Hi {this.friendlyNames()}</h3>
            </Col>
            <Col className='align-self-center' sm='3' xs='12'>
              <Button block color='danger'>Logout</Button>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default LoggedIn
