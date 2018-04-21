import React, { Component } from 'react'
import {
  Alert,
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  CardDeck,
  Card,
  CardHeader,
  CardBody,
  CardText
} from 'reactstrap'
import { translate } from 'react-i18next'

let index = 0

class RSVP extends Component {
  state = {
    day: false,
    email: '',
    guests: [],
    success: false,
    error: '',
    rsvpComplete: false,
    message: '',
    loading: false
  }

  componentWillMount () {
    this.prepareState(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.prepareState(nextProps)
  }

  prepareState = props => {
    let guests = []
    if (props.data.hasOwnProperty('guests')) {
      this.setState({
        rsvpComplete: true,
        guests: props.data.guests,
        email: props.data.email,
        message: props.data.message
      })
    } else {
      props.data.names.forEach(name => {
        guests.push({
          name,
          attending: '',
          starter: '',
          main: ''
        })
      })
      this.setState({
        rsvpComplete: false,
        guests
      })
    }
    this.setState({
      names: props.data.names,
      day: props.data.day
    })
  }

  updateGuest = (name, field, value) => {
    if (this.state.rsvpComplete) {
      return
    }
    this.setState(state => {
      state.guests.map(guest => {
        if (guest.name !== name) {
          return guest
        }
        guest[field] = value
        if (field === 'attending' && value === false && this.state.day) {
          guest.starter = ''
          guest.main = ''
        }
        return guest
      })
      return {
        ...state
      }
    })
  }

  submitRSVP = e => {
    e.preventDefault()
    if (this.state.loading) {
      // Don't send again if we're waiting for server resp.
      return
    }
    if (!this.validateState()) {
      this.setState({ error: this.props.t('missingField') })
      return
    }
    this.setState({ loading: true })
    window
      .fetch(process.env.API_URL + 'rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          guests: this.state.guests,
          email: this.state.email,
          message: this.state.message
        }),
        credentials: 'same-origin'
      })
      .then(response => {
        return new Promise((resolve, reject) => {
          if (response.status !== 200) {
            reject(new Error('non 200 status code'))
          }
          response
            .text()
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
      })
      .then(data => {
        this.setState({ success: true, rsvpComplete: true, loading: false })
      })
      .catch(() => {
        this.setState({
          error: this.props.t('sendError'),
          rsvpComplete: false,
          loading: false
        })
      })
  }

  validateState = () => {
    const guests = this.state.guests
    for (let i = 0; i < guests.length; i++) {
      const g = guests[i]
      if (g.attending !== true && g.attending !== false) {
        return false
      }
      if (g.attending === true && this.state.day && (g.main === '' || g.starter === '')) {
        return false
      }
    }
    return true
  }

  render () {
    const { t } = this.props
    if (this.state.success) {
      return (
        <section className='accommodation'>
          <Container>
            <Alert color='success'>{t('rsvpReceived')}</Alert>
          </Container>
        </section>
      )
    }
    let guestCards = (
      <CardDeck>
        {this.state.guests.map(guest => {
          return (
            <Card key={index++} className='rsvp-card'>
              <CardHeader>{guest.name}</CardHeader>
              <CardBody>
                <CardText>
                  <span className='form-group' tag='fieldset'>
                    <Label>{t('makeIt')}</Label>
                    <span className='form-check'>
                      <Label check>
                        <Input
                          type='radio'
                          name={`radio-${index}`}
                          checked={guest.attending === true}
                          required
                          onChange={() => {
                            this.updateGuest(guest.name, 'attending', true)
                          }}
                        />
                        {t('willAttend')}
                      </Label>
                    </span>
                    <span className='form-check'>
                      <Label check>
                        <Input
                          type='radio'
                          name={`radio-${index}`}
                          checked={guest.attending === false}
                          required
                          onChange={() => {
                            this.updateGuest(guest.name, 'attending', false)
                          }}
                        />
                        {t('cantAttend')}
                      </Label>
                    </span>
                  </span>
                  {this.state.day && (
                    <span>
                      <span className='form-group'>
                        <Label for={`${guest.name}-starterSelect`}>{t('whichStarter')}</Label>
                        <Input
                          type='select'
                          name={`${guest.name}-starterSelect`}
                          value={guest.starter}
                          disabled={guest.attending === false}
                          onChange={e => {
                            this.updateGuest(guest.name, 'starter', e.target.value)
                          }}
                        >
                          <option value='' disabled>
                            {t('chooseOption')}
                          </option>
                          <option value='Haddock fishcake with creamed leeks'>{t('fishcakes')}</option>
                          <option value='Garlic wild mushroom brioche (v)'>{t('mushroom')}</option>
                        </Input>
                      </span>
                      <span className='form-group'>
                        <Label for={`${guest.name}-mainSelect`}>{t('whichMain')}</Label>
                        <Input
                          type='select'
                          name={`${guest.name}-mainSelect`}
                          value={guest.main}
                          disabled={guest.attending === false}
                          onChange={e => {
                            this.updateGuest(guest.name, 'main', e.target.value)
                          }}
                        >
                          <option value='' disabled>
                            {t('chooseOption')}
                          </option>
                          <option value='Shin of beef, dauphinoise potatoes, and seasonal vegetables'>
                            {t('beef')}
                          </option>
                          <option value='Winter vegetable wellington, roasted potatoes, and seasonal vegetables (v)'>
                            {t('wellington')}
                          </option>
                        </Input>
                      </span>
                    </span>
                  )}
                </CardText>
              </CardBody>
            </Card>
          )
        })}
      </CardDeck>
    )
    return (
      <section className='accommodation'>
        <Container>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 10 }} className='text-center'>
              <h2>RSVP</h2>
            </Col>
          </Row>
          {this.state.rsvpComplete && (
            <Row>
              <Alert color='success'>✔ {t('alreadyRSVPd')}</Alert>
            </Row>
          )}
          <Form onSubmit={this.submitRSVP}>
            <FormGroup row>
              <Label for='emailInput' sm={2}>
                Email
              </Label>
              <Col sm={10}>
                <Input
                  type='email'
                  name='emailInput'
                  id='emailInput'
                  value={this.state.email}
                  onChange={e => {
                    if (!this.state.rsvpComplete) {
                      this.setState({ email: e.target.value })
                    }
                  }}
                  placeholder={t('emailPlaceholder')}
                />
              </Col>
            </FormGroup>
            {guestCards}
            <FormGroup row>
              <Label for='messageInput' sm={2}>
                {t('message')}
              </Label>
              <Col sm={10}>
                <Input
                  type='textarea'
                  name='messageInput'
                  id='messageInput'
                  placeholder={t('messagePlaceholder')}
                  value={this.state.message}
                  onChange={e => {
                    if (!this.state.rsvpComplete) {
                      this.setState({ message: e.target.value })
                    }
                  }}
                />
              </Col>
            </FormGroup>
            {this.state.loading && (
              <Button block>
                <span className='spinny'>⏳</span>
              </Button>
            )}
            {!this.state.rsvpComplete &&
              !this.state.loading && (
                <Button block type='submit'>
                  {t('send')}
                </Button>
              )}
          </Form>
          {this.state.error !== '' && (
            <Row>
              <Alert color='danger'>{this.state.error}</Alert>
            </Row>
          )}
        </Container>
      </section>
    )
  }
}

export default translate('RSVP')(RSVP)
