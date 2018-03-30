import React, { Component } from 'react'
import { Row, Col, Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'

let index = 0

class RSVP extends Component {
  constructor (props) {
    super(props)
    this.state = {
      names: ['Steve', 'Mary'],
      day: true
    }
  }

  render () {
    let menuChoices = this.state.names.map(name => {
      return (
        <div key={index++}>
          <FormGroup row>
            <Label for={`${name}starterSelect`} sm={2}>{`${name}'s Starter`}</Label>
            <Col sm={10}>
              <Input type='select' name={`${name}starterSelect`} id={`${name}starterSelect`}>
                <option value='' disabled>Choose an option...</option>
                <option value='starter 1'>Starter 1</option>
                <option value='starter 2'>Starter 2</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for={`${name}mainSelect`} sm={2}>{`${name}'s Main Course`}</Label>
            <Col sm={10}>
              <Input type='select' name={`${name}mainSelect`} id={`${name}mainSelect`}>
                <option value='' disabled>Choose an option...</option>
                <option value='main 1'>Main 1</option>
                <option value='main 2'>Main 2</option>
              </Input>
            </Col>
          </FormGroup>
        </div>
      )
    })
    return (
      <section className='accommodation'>
        <Container>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 10 }} className='text-center'>
              <h2>RSVP</h2>
            </Col>
          </Row>
          <Form>
            <FormGroup row>
              <Label for='rsvpSelect' sm={2}>Can you make it?</Label>
              <Col sm={10}>
                <Input type='select' name='rsvpSelect' id='rsvpSelect'>
                  <option value='' disabled>Choose an option...</option>
                  <option value='true'>Yes!</option>
                  <option value='false'>Afraid Not :-(</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='emailInput' sm={2}>Email</Label>
              <Col sm={10}>
                <Input type='email' name='emailInput' id='emailInput' placeholder='you@email.com' />
              </Col>
            </FormGroup>
            {this.state.day &&
              menuChoices
            }
            <FormGroup row>
              <Label for='messageInput' sm={2}>Message</Label>
              <Col sm={10}>
                <Input type='text' name='messageInput' id='messageInput' placeholder='Let us know about dietary requirements, or anything you&apos;d like to add...' />
              </Col>
            </FormGroup>
            <Button block>Send</Button>
          </Form>
        </Container>
      </section>
    )
  }
}

export default RSVP
