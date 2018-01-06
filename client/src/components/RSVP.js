import React, { Component } from 'react'
import { Row, Col, Container } from 'reactstrap'

class RSVP extends Component {
  render () {
    return (
      <section className='accom' id='accommodation'>
        <Container>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 10 }} className='text-center'>
              <h2>RSVP</h2>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default RSVP
