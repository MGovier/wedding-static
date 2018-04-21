import React, { PureComponent } from 'react'
import { Container, Row, Col } from 'reactstrap'

class Footer extends PureComponent {
  render () {
    return (
      <section className='footer'>
        <Container>
          <Row>
            <Col xs={{ size: 6 }}>
              <h6>Birgit + Merlin 2018</h6>
            </Col>
            <Col xs={{ size: 6 }}>
              <p>
                <a href='https://github.com/MGovier/wedding-static'>GitHub</a>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Footer
