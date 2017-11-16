import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class LogIn extends Component {
  render () {
    return (
      <section id='rsvp' className='rsvp'>
        <Container>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 10 }} className='text-center'>
              <h2>Do we know you?</h2>
              <h6>RSVP, Menu Choices &amp; Table Plans... (oooh)</h6>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default LogIn
