import React, { PureComponent } from 'react'
import { Container, Row, Col, Input, Button, Form } from 'reactstrap'
import Img from 'gatsby-image'
import { translate } from 'react-i18next'

class LogIn extends PureComponent {
  state = {
    code: ''
  }
  updateCode = e => {
    this.setState({ code: e.target.value })
  }
  submitCode = e => {
    e.preventDefault()
    window
      .fetch(process.env.API_URL + 'auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: this.state.code }),
        credentials: 'same-origin'
      })
      .then(response => {
        return new Promise((resolve, reject) => {
          if (response.status !== 200) {
            reject(new Error('non 200 status code'))
          }
          response
            .json()
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
      })
      .then(data => {
        this.setState({ code: '' })
        this.props.setStatus(true, data)
      })
      .catch(() => {
        this.props.setStatus(false)
        this.animateFailure()
      })
  }
  animateFailure = () => {
    document.getElementById('log-in-row').className += ' shake'
    setTimeout(() => {
      document.getElementById('log-in-row').className = document
        .getElementById('log-in-row')
        .className.replace(/ shake/g, '')
    }, 2000)
  }
  logOut = () => {
    window
      .fetch(process.env.API_URL + 'auth', {
        method: 'DELETE',
        credentials: 'same-origin'
      })
      .then(response => {
        return new Promise((resolve, reject) => {
          if (response.status !== 200) {
            reject(new Error('non 200 status code'))
          }
          response
            .json()
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
      })
      .then(data => {
        console.log(data)
        this.props.setStatus(false)
      })
      .catch(() => {
        this.props.setStatus(false)
      })
  }
  friendlyNames = () => {
    const names = this.props.data.names
    if (names.length === 2) {
      return `${names[0]} and ${names[1]}`
    }
    if (names.length === 3) {
      return `${names[0]}, ${names[1]}, and ${names[2]}`
    }
    return `${names[0]}`
  }
  render () {
    const { t, image, loggedIn } = this.props
    if (loggedIn) {
      return (
        <section id='logged-in' className='rsvp'>
          <Img sizes={image.sizes} className='background-image' />
          <Container>
            <Row className='justify-content-center'>
              <Col className='align-self-center text-center-if-small' sm={{ size: 9 }} xs={{ size: 12 }}>
                <h3>Hey {this.friendlyNames()}!</h3>
              </Col>
              <Col className='align-self-center' sm='3' xs='12'>
                <Button block color='danger' onClick={this.logOut}>
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
          <Form onSubmit={this.submitCode}>
            <Row className='input-row' id='log-in-row'>
              <Col xs={{ size: 12 }} md='10'>
                <Input
                  type='text'
                  name='word1'
                  id='word1'
                  placeholder={t('first-word')}
                  value={this.state.code}
                  onChange={this.updateCode}
                />
              </Col>
              <Col xs={{ size: 12 }} md='2'>
                <Button color='primary' block type='submit'>
                  {t('go')}
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </section>
    )
  }
}

export default translate('LogIn')(LogIn)
