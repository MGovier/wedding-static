import React, { Component } from 'react'
import {
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

let index = 0

class RSVP extends Component {
  constructor (props) {
    super(props)
    this.state = {
      day: true,
      email: '',
      guests: [
        {
          name: 'Steve',
          attending: '',
          starter: '',
          main: ''
        },
        {
          name: 'Mary',
          attending: '',
          starter: '',
          main: ''
        }
      ]
    }
  }

  updateGuest = (name, field, value) => {
    this.setState(state => {
      state.guests.map(guest => {
        if (guest.name !== name) {
          return guest
        }
        guest[field] = value
        return guest
      })
      return {
        ...state
      }
    })
  };

  submitRSVP = e => {
    e.preventDefault()
    console.log(this.state)
  }

  render () {
    let guestCards
    if (this.state.guests.length === 1) {
      let name = this.state.guests[0].name
      guestCards = (
        <CardDeck key={index++}>
          <Card className='rsvp-card'>
            <CardHeader>{name}</CardHeader>
            <CardBody>
              <CardText>
                <Input
                  type='select'
                  name={`${name}-starterSelect`}
                  id={`${name}-starterSelect`}
                  value={this.state.guests[0].starter}
                >
                  <option value='' disabled>
                    Choose an option...
                  </option>
                  <option value='starter 1'>Starter 1</option>
                  <option value='starter 2'>Starter 2</option>
                </Input>
                <Input
                  type='select'
                  name={`${name}-mainSelect`}
                  id={`${name}-mainSelect`}
                  value={this.state.guests[0].starter}
                >
                  <option value='' disabled>
                    Choose an option...
                  </option>
                  <option value='main 1'>Main 1</option>
                  <option value='main 2'>Main 2</option>
                </Input>
              </CardText>
            </CardBody>
          </Card>
        </CardDeck>
      )
    } else {
      guestCards = (
        <CardDeck>
          {this.state.guests.map(guest => {
            return (
              <Card key={index++} className='rsvp-card'>
                <CardHeader>{guest.name}</CardHeader>
                <CardBody>
                  <CardText>
                    <span className='form-group'>
                      <Label for={`${guest.name}-attending`}>Can you make it?</Label>
                      <Input
                        type='select'
                        name={`${guest.name}-attending`}
                        value={guest.attending}
                        onChange={e => {
                          this.updateGuest(guest.name, 'attending', e.target.value)
                        }}
                      >
                        <option value='' disabled>
                          Choose an option...
                        </option>
                        <option value='true'>Yes, I will attend!</option>
                        <option value='false'>No, I can't attend</option>
                      </Input>
                    </span>
                    <span className='form-group'>
                      <Label for={`${guest.name}-starterSelect`}>Which starter do you prefer?</Label>
                      <Input
                        type='select'
                        name={`${guest.name}-starterSelect`}
                        value={guest.starter}
                        onChange={e => {
                          this.updateGuest(guest.name, 'starter', e.target.value)
                        }}
                      >
                        <option value='' disabled>
                          Choose an option...
                        </option>
                        <option value='starter 1'>Starter 1</option>
                        <option value='starter 2'>Starter 2</option>
                      </Input>
                    </span>
                    <span className='form-group'>
                      <Label for={`${guest.name}-mainSelect`}>Which main would you like?</Label>
                      <Input
                        type='select'
                        name={`${guest.name}-mainSelect`}
                        value={guest.main}
                        onChange={e => {
                          this.updateGuest(guest.name, 'main', e.target.value)
                        }}
                      >
                        <option value='' disabled>
                          Choose an option...
                        </option>
                        <option value='main 1'>Main 1</option>
                        <option value='main 2'>Main 2</option>
                      </Input>
                    </span>
                  </CardText>
                </CardBody>
              </Card>
            )
          })}
        </CardDeck>
      )
    }
    return (
      <section className='accommodation'>
        <Container>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 10 }} className='text-center'>
              <h2>RSVP</h2>
            </Col>
          </Row>
          <Form onSubmit={this.submitRSVP}>
            <FormGroup row>
              <Label for='emailInput' sm={2}>
                Email
              </Label>
              <Col sm={10}>
                <Input type='email' name='emailInput' id='emailInput' value={this.state.email} onChange={e => { this.setState({email: e.target.value}) }} placeholder='you@email.com' />
              </Col>
            </FormGroup>
            {this.state.day && guestCards}
            <FormGroup row>
              <Label for='messageInput' sm={2}>
                Message
              </Label>
              <Col sm={10}>
                <Input
                  type='textarea'
                  name='messageInput'
                  id='messageInput'
                  placeholder="Let us know about dietary requirements, or anything you&apos;d like to add..."
                  value={this.state.message}
                  onChange={e => { this.setState({message: e.target.value}) }}
                />
              </Col>
            </FormGroup>
            <Button block type='submit'>Send</Button>
          </Form>
        </Container>
      </section>
    )
  }
}

export default RSVP
