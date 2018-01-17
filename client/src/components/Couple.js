import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { translate } from 'react-i18next'
import moment from 'moment'
import 'moment/locale/en-gb'
import 'moment/locale/nl'

import MerlinPortrait from '../img/merlin-min.jpg'
import BirgitPortrait from '../img/bir-min.jpg'

class Couple extends Component {
  constructor () {
    super()
    this.getTimescale = this.getTimescale.bind(this)
  }

  getTimescale () {
    if (this.props.i18n.language === 'nl') {
      moment.locale('nl')
    } else {
      moment.locale('en-gb')
    }
    return moment([2018, 9, 15]).fromNow()
  }

  render () {
    const { t } = this.props
    return (
      <section className='story'>
        <Container>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 10 }} className='text-center'>
              <h3>Join us {this.getTimescale()} to celebrate our wedding</h3>
            </Col>
          </Row>
          <Row className='justify-content-around'>
            <Col md={{ size: 3 }} xs={{ size: 8 }}>
              <h5 className='event-emoji'>👰🏻</h5>
              <h5 className='time-heading'>12:30</h5>
              <p style={{textAlign: 'center', verticalAlign: 'middle'}}>
                {t('reception')}
              </p>
            </Col>
            <Col md={{ size: 3 }} xs={{ size: 6 }}>
              <img alt='Portrait of Birgit' className='birgy' src={BirgitPortrait} />
            </Col>
            <Col md={{ size: 3 }} xs={{ size: 6 }}>
              <img alt='Portrait of Merlin' className='merly' src={MerlinPortrait} />
            </Col>
            <Col md={{ size: 3 }} xs={{ size: 8 }}>
              <h5 className='event-emoji'>🎉</h5>
              <h5 className='time-heading'>17:00</h5>
              <p style={{textAlign: 'center', verticalAlign: 'middle'}}>
                {t('party')}
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default translate('Couple')(Couple)
