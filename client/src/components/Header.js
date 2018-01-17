import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  componentDidMount () {
    document.addEventListener('scroll', this.handleScroll)
  }

  toggle = () => {
    this.setState(prevState => {
      if (!prevState.isOpen) {
        this.addScrolled()
      }
      return { isOpen: !prevState.isOpen }
    })
  }

  addScrolled = () => {
    this.navbar.classList.add('scrolled')
  }

  removeScrolled = () => {
    this.navbar.classList.remove('scrolled')
  }

  handleScroll = event => {
    if (event.target.documentElement.scrollTop !== 0 || this.state.isOpen) {
      this.addScrolled()
    } else {
      this.removeScrolled()
    }
  }

  render () {
    let toggleLanguage = null;
    if (this.props.language === 'en') {
      toggleLanguage = (
        <NavItem>
          <Button size='sm' outline color='secondary' onClick={this.props.changeNl}>
            Change to Dutch 
          </Button>
        </NavItem>
      )
    } else {
      toggleLanguage = (
        <NavItem>
          <Button size='sm' outline color='secondary' onClick={this.props.changeEn}>
            Change to English
          </Button>
        </NavItem>
      )
    }
    return (
      // Navbar is functional, so need a wrapping plain DOM node to use ref, which is chosen over state for perf.
      <div className='nav-container' ref={(navbar) => { this.navbar = navbar }}>
        <Navbar id='nav-1' color='faded' light className='nav nav-1 transparent light' expand='md'>
          <NavbarBrand href='/' className='logo'>
            <span>Birgit &amp; Merlin</span>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto menu' navbar>
              <NavItem>
                <NavLink href='#map' className='inner-link'>
                  Map
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='#accommodation' className='inner-link'>
                  Accommodation
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='#rsvp' className='inner-link'>
                  RSVP
                </NavLink>
              </NavItem>
              {toggleLanguage}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Header
