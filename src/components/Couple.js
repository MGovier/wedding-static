import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import moment from 'moment'
import 'moment/locale/en-gb'

import MerlinPortrait from '../img/merlin-portrait.jpg'
import BirgitPortrait from '../img/birgit-portrait.jpg'

class Couple extends Component {
  constructor () {
    super()
    this.getTimescale = this.getTimescale.bind(this)
  }

  getTimescale () {
    return moment([2018, 9, 15]).fromNow()
  }

  render () {
    return (
      <section className='story'>
        <Container>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 10 }} className='text-center'>
              <h2>Join us {this.getTimescale()} to celebrate our wedding</h2>
            </Col>
          </Row>
          <Row className='justify-content-around'>
            <Col md={{ size: 3 }} sm={{ size: 6 }}>
              <p style={{textAlign: 'right', verticalAlign: 'middle'}}>
                Maybe some text here...
              </p>
            </Col>
            <Col md={{ size: 3 }} sm={{ size: 8 }}>
              <img alt='Portrait of Birgit' className='birgy' src={BirgitPortrait} />
            </Col>
            <Col md={{ size: 3 }} sm={{ size: 8 }}>
              <img alt='Portrait of Merlin' className='merly' src={MerlinPortrait} />
            </Col>
            <Col md={{ size: 3 }} sm={{ size: 6 }}>
              <p>
                Maybe some text here...
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Couple
