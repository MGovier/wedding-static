import React, { Component } from 'react'
import { Row, Col, Container } from 'reactstrap'

import eastington from '../img/eastington-park.jpg'
import travelodge from '../img/travelodge-stonehouse.jpg'
import kingsHead from '../img/kingshead.jpg'

class Venue extends Component {
  render () {
    return (
      <section className='accom' id='accommodation'>
        <Container>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 10 }} className='text-center'>
              <h2>Venue + Accommodation</h2>
              <h6>Where to be and where to stay...</h6>
            </Col>
          </Row>
          <Row style={{ paddingTop: '3em' }}>
            <Col sm={{ size: 4 }}>
              <img src={eastington} alt='Eastington Park' />
              <h5 className='text-center'>Ceremony, Reception &amp; Rooms...</h5>
              <p className='address'><a href='http://www.eastingtonpark.co.uk/weddings/'>Eastington Park</a>,
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
              <img src={travelodge} alt='Travelodge Stonehouse' />
              <h5 className='text-center'>Alternative Accommodation...</h5>
              <p className='address'><a href='https://www.travelodge.co.uk/hotels/99/Stonehouse-hotel'>Travelodge Stonehouse</a>,
                <br />
                A419 Eastington,
                <br />
                Nr Stroud,
                <br />
                Gloucestershire
                <br />
                GL10 3SQ
              </p>
            </Col>
            <Col sm={{ size: 4 }}>
              <img src={kingsHead} alt='The Kings Head House' />
              <h5 className='text-center'>Alternative Accommodation...</h5>
              <p className='address'><a href='http://www.thekingsheadhouse.com/'>The King's Head</a>,
                <br />
                Bath Road,
                <br />
                Eastington,
                <br />
                Stonehouse,
                <br />
                GL10 3AA
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Venue
