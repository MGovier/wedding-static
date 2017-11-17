import React, { Component } from 'react'
import { Container, Row, Col, Input, Button } from 'reactstrap'

class LogIn extends Component {
  render () {
    return (
      <section id='rsvp' className='rsvp'>
        <Container>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 10 }} className='text-center'>
              <h2>Do we know you?</h2>
              <h6>RSVP, Menu Choices &amp; Table Plans... (oooh 😯)</h6>
            </Col>
          </Row>
          <Row className='input-row'>
            <Col md={{ size: 5 }}>
              <Input type='text' name='word1' id='word1' placeholder='First word from your invite...' />
            </Col>
            <Col md={{ size: 5 }} >
              <Input type='text' name='word2' id='word2' placeholder='and the second word...' />
            </Col>
            <Col md={{ size: 2 }} >
              <Button color='primary' block>Go 🎉</Button>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default LogIn
