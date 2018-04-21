import React, { PureComponent } from 'react'
import Img from 'gatsby-image'
import { translate } from 'react-i18next'

class Hero extends PureComponent {
  runAnimation () {
    const NUM_CONFETTI = 30
    const COLOURS = [
      '99,00,00',
      'FF,66,00',
      'FF,99,00',
      '99,66,33',
      'CC,99,66'
    ]
    const canvas = document.getElementById('header-animation')
    const context = canvas.getContext('2d')
    let width = canvas.width
    let height = canvas.height

    const resizeWindow = () => {
      width = canvas.width
      height = canvas.height
    }

    window.addEventListener('resize', resizeWindow, false)

    function range (min, max) {
      return Math.random() * (max - min) + min
    }

    function drawCircle (x, y, r, style) {
      context.beginPath()
      context.arc(x, y, r, 0, 2 * Math.PI, false)
      context.fillStyle = style
      context.fill()
    }

    class Confetti {
      constructor () {
        this.style = COLOURS[Math.floor(range(0, COLOURS.length))]
        this.rgb = `rgba(${this.style}`
        this.r = range(0.4, 1.5)
        this.r2 = 2 * this.r
        this.replace()
      }

      replace () {
        this.opacity = 0.8
        this.x = range(-this.r2, width - this.r2)
        this.y = range(-this.r2, height - this.r2 / 2)
        this.xmax = width - this.r
        this.ymax = height - this.r
      }

      draw () {
        this.x += range(0, 0.5)
        this.y += range(0.3, 1)
        this.opacity += range(-0.05, 0.05)
        if (this.opacity > 1) {
          this.opacity = 1
        }
        if (this.opacity < 0 || this.y > this.ymax) {
          this.replace()
        }
        drawCircle(this.x, this.y, this.r, `${this.rgb},${this.opacity})`)
      }
    }

    const confetti = (function () {
      const results = []
      for (let i = 0; i < NUM_CONFETTI; i++) {
        results.push(new Confetti())
      }
      return results
    })()

    function step () {
      context.clearRect(0, 0, width, height)
      for (let j = 0; j < confetti.length; j++) {
        confetti[j].draw()
      }
      window.requestAnimationFrame(step)
    }
    step()
  }

  componentDidMount () {
    this.runAnimation()
  }

  render () {
    const { t } = this.props
    return (
      <section className='header header-1'>
        <Img sizes={this.props.image.sizes} className='background-image' />
        <div className='container'>
          <div className='row'>
            <div className='text-center col-sm-11'>
              <h1>{t('heading')}</h1>
              <h6>{t('subheading')}</h6>
            </div>
          </div>
        </div>
        <canvas id='header-animation' />
      </section>
    )
  }
}

export default translate('Hero')(Hero)
