import React, { PureComponent } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { translate, Trans } from 'react-i18next'

import eastington from '../img/eastington-park-min.jpg'
import travelodge from '../img/travelodge-stonehouse-min.jpg'
import kingsHead from '../img/kingshead-min.jpg'

class Venue extends PureComponent {
  render () {
    const { t } = this.props
    return (
      <section className='accom' id='accommodation'>
        <Container>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 10 }} className='text-center'>
              <h2>{t('travel')}</h2>
            </Col>
          </Row>
          <Row>
            <Col md='6' xs='12'>
              <h6 className='text-center'>{t('road')}</h6>
              <p>
                <Trans i18nKey='road-para'>
                  Eastington Park is located near Stonehouse in Gloucestershire.
                  If arriving from the M5, take exit 13 towards Stroud - right
                  on the next roundabout, and down the road just after the
                  canal. Those from further afield, ferries are available
                  between{' '}
                  <a href='http://www.poferries.com/en/rotterdam-hull'>
                    Rotterdam and Hull
                  </a>, or{' '}
                  <a href='https://www.directferries.co.uk/calais_dover_ferry.htm'>
                    Calais and Dover
                  </a>. The <a href='https://www.eurotunnel.com/'>Eurotunnel</a>{' '}
                  can bring you between Folkestone and Calais.
                </Trans>
              </p>
            </Col>
            <Col md='6' xs='12'>
              <h6 className='text-center'>{t('air')}</h6>
              <p>
                <Trans i18nKey='air-para'>
                  <a href='https://www.bristolairport.co.uk/'>Bristol</a> is the
                  nearest airport. <a href='https://www.klm.com/'>KLM</a> and{' '}
                  <a href='https://www.easyjet.com/'>EasyJet</a> operate routes
                  to Amsterdam, and <a href='https://www.flybmi.com/'>FlyBMI</a>{' '}
                  to Munich. Cardiff in Wales is another close airport, and
                  London Heathrow, Gatwick, and Stansted are 2 hours away. You
                  can compare ticket prices using{' '}
                  <a href='https://www.skyscanner.net/'>SkyScanner</a>.
                </Trans>
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 10 }} className='text-center'>
              <h2 style={{ paddingBottom: '0.8em' }}>{t('venue-header')}</h2>
            </Col>
          </Row>
          <Row>
            <Col sm='12'>
              <p>
                <Trans i18nKey='accom-para'>
                  The venue has rooms available for the night itself, which cost
                  around £100 with breakfast included. Check-in opens at 12:00,
                  and check-out the following day by 10:30. Eastington Park
                  require payment ahead of the event, so please get in touch
                  with us at{' '}
                  <a href='mailto:us@birgitandmerlin.com'>
                    us@birgitandmerlin.com
                  </a>{' '}
                  to arrange a room by 1st July. Alternative accommodation
                  options are shown below, both located around a 5-minute drive
                  from the venue. Stroud Taxis (01453 750 211) and Triple-A
                  (07582 77 77 70) operate in the area.
                </Trans>
              </p>
            </Col>
          </Row>
          <Row className='align-items-center'>
            <Col md='4' xs='6'>
              <img
                src={eastington}
                className='img-fluid'
                alt='Eastington Park'
              />
              <h5 className='text-center'>{t('venue')}</h5>
              <address>
                <a href='http://www.eastingtonpark.co.uk/weddings/'>
                  Eastington Park
                </a>,<br />
                Eastington,<br />
                Nr Stonehouse,<br />
                Gloucestershire<br />
                GL10 3RY
              </address>
            </Col>
            <Col md='4' xs='6'>
              <img
                src={travelodge}
                className='img-fluid'
                alt='Travelodge Stonehouse'
              />
              <h5 className='text-center'>{t('alt-accom')}</h5>
              <address>
                <a href='https://www.travelodge.co.uk/hotels/99/Stonehouse-hotel'>
                  Travelodge Stonehouse
                </a>,<br />
                A419 Eastington,<br />
                Nr Stroud,<br />
                Gloucestershire<br />
                GL10 3SQ
              </address>
            </Col>
            <Col md={{ size: 4, offset: 0 }} xs={{ size: 6, offset: 3 }}>
              <img
                src={kingsHead}
                className='img-fluid mx-auto'
                alt='The Kings Head House'
              />
              <h5 className='text-center'>{t('alt-accom')}</h5>
              <address>
                <a href='http://www.thekingsheadhouse.com/'>The King's Head</a>,<br />
                Bath Road,<br />
                Eastington,<br />
                Stonehouse,<br />
                GL10 3AA
              </address>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default translate('Venue')(Venue)
