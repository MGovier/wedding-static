import React, { PureComponent } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap'
import { translate } from 'react-i18next'

class Header extends PureComponent {
  state = {
    isOpen: false,
    scrolled: false
  }

  componentDidMount () {
    document.addEventListener('scroll', this.handleScroll, { passive: true })
  }

  toggle = () => {
    this.setState(prevState => {
      if (!prevState.isOpen) {
        this.addScrolled()
      } else if (!prevState.scrolled) {
        this.removeScrolled()
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
    if (event.target.scrollingElement.scrollTop !== 0 || this.state.isOpen) {
      if (!this.state.scrolled) {
        this.addScrolled()
        this.setState({ scrolled: true })
      }
    } else if (this.state.scrolled) {
      this.removeScrolled()
      this.setState({ scrolled: false })
    }
  }

  closeNav = () => {
    this.setState({ isOpen: false })
  }

  render () {
    let toggleLanguage = null
    const { t } = this.props
    if (this.props.language === 'en' || this.props.language.startsWith('en')) {
      toggleLanguage = (
        <NavItem>
          <Button
            size='sm'
            outline
            color='secondary'
            onClick={() => {
              this.props.changeNl()
              this.closeNav()
            }}
          >
            <span role='img' aria-label='Dutch flag'>🇳🇱</span> Nederlands
          </Button>
        </NavItem>
      )
    } else {
      toggleLanguage = (
        <NavItem>
          <Button
            size='sm'
            outline
            color='secondary'
            onClick={() => {
              this.props.changeEn()
              this.closeNav()
            }}
          >
            <span role='img' aria-label='British flag'>🇬🇧</span> English
          </Button>
        </NavItem>
      )
    }
    return (
      // Navbar is functional, so need a wrapping plain DOM node to use ref, which is chosen over state for perf.
      <div
        className='nav-container'
        ref={navbar => {
          this.navbar = navbar
        }}
      >
        <Navbar id='nav-1' color='faded' light className='nav nav-1 transparent light' expand='md'>
          <NavbarBrand href='/' className='logo'>
            <span>Birgit &amp; Merlin</span>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto menu' navbar>
              <NavItem>
                <NavLink href='#map' className='inner-link' onClick={this.closeNav}>
                  {t('map')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='#accommodation' className='inner-link' onClick={this.closeNav}>
                  {t('accommodation')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='#rsvp' className='inner-link' onClick={this.closeNav}>
                  {t('rsvp')}
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

export default translate('Header')(Header)
