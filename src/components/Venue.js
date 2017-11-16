import React, { Component } from 'react'
import { Row, Col, Container } from 'reactstrap'

import eastington from '../img/eastington-park.jpg'

class Venue extends Component {
  render () {
    return (
      <section className='accom'>
        <Container>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 10 }} className='text-center'>
              <h2>Venue + Accomodation</h2>
              <h6>Where to be and where to stay...</h6>
            </Col>
          </Row>
          <Row style={{ paddingTop: '5em' }}>
            <Col sm={{ size: 4 }}>
              <img src={eastington} alt='Eastington Park' />
              <h5 className='text-center'>Ceremony &amp; Reception</h5>
              <p>Eastington Park,
                <br />
                Eastington,
                <br />
                Nr Stonehouse,
                <br />
                Gloucestershire
                <br />
                GL10 3RY</p>
            </Col>
            <Col sm={{ size: 4 }}>
              <h5 className='text-center'>Ceremony</h5>
              <p>Address</p>
            </Col>
            <Col sm={{ size: 4 }}>
              <h5 className='text-center'>Ceremony</h5>
              <p>Address</p>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Venue
