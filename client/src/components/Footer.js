import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class Footer extends Component {
  render () {
    return (
      <section className='footer'>
        <Container>
          <Row>
            <Col md={{ size: 6 }}>
              <h6>Birgit + Merlin 2018</h6>
            </Col>
            <Col md={{ size: 6 }}>
              <p><a href='https://github.com/MGovier/wedding-static'>GitHub</a></p>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Footer
