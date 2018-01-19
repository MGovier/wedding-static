import React, { Component } from 'react'
import { Container, Row, Col, Input, Button } from 'reactstrap'
import Img from 'gatsby-image'
import { translate } from 'react-i18next'

class LogIn extends Component {
  friendlyNames = () => {
    if (this.props.name.length > 1) {
      return `${this.props.name[0]} and ${this.props.name[1]}`
    }
    return `${this.props.name[0]}`
  }
  render () {
    const { t, image, loggedIn } = this.props
    if (loggedIn) {
      return (
        <section id='rsvp' className='rsvp'>
          <Img sizes={image.sizes} className='background-image' />
          <Container>
            <Row className='justify-content-center'>
              <Col className='align-self-center text-center-if-small' sm={{ size: 9 }} xs={{ size: 12 }}>
                <h3>Hi {this.friendlyNames()}</h3>
              </Col>
              <Col className='align-self-center' sm='3' xs='12'>
                <Button block color='danger'>
                  Logout
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      )
    }
    return (
      <section id='rsvp' className='rsvp'>
        <Img sizes={image.sizes} className='background-image' />
        <Container>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 10 }} className='text-center'>
              <h2>{t('intro')}</h2>
              <h6>{t('subheading')}</h6>
            </Col>
          </Row>
          <Row className='input-row'>
            <Col xs={{ size: 12 }} md='5'>
              <Input type='text' name='word1' id='word1' placeholder={t('first-word')} />
            </Col>
            <Col xs={{ size: 12 }} md='5'>
              <Input type='text' name='word2' id='word2' placeholder={t('second-word')} />
            </Col>
            <Col xs={{ size: 12 }} md='2'>
              <Button color='primary' block>
                {t('go')}
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default translate('LogIn')(LogIn)
