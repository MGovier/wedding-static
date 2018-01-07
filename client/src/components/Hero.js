import React, { Component } from 'react'

class Hero extends Component {
  runAnimation () {
    var Confetti, confetti, drawCircle, range, resizeWindow, step
    const NUM_CONFETTI = 100
    const COLORS = [[85, 71, 106], [174, 61, 99]]
    const canvas = document.getElementById('header-animation')
    const context = canvas.getContext('2d')
    let width = canvas.width
    let height = canvas.height

    resizeWindow = () => {
      width = canvas.width
      height = canvas.height
    }

    window.addEventListener('resize', resizeWindow, false)

    range = function (a, b) {
      return (b - a) * Math.random() + a
    }

    drawCircle = function (x, y, r, style) {
      context.beginPath()
      context.arc(x, y, r, 0, 2 * Math.PI, false)
      context.fillStyle = style
      context.fill()
    }

    Confetti = class Confetti {
      constructor () {
        this.style = COLORS[1]
        this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`
        this.r = range(0.4, 1.5)
        this.r2 = 2 * this.r
        this.replace()
      }

      replace () {
        this.opacity = 0.8
        this.x = range(-this.r2, width - this.r2)
        this.y = range(-20, height - this.r2)
        this.xmax = width - this.r
        this.ymax = height - this.r
      }

      draw () {
        this.x += 1
        this.y += 2
        if (this.opacity > 1) {
          this.opacity = 1
        }
        if (this.opacity < 0 || this.y > this.ymax) {
          this.replace()
        }
        return drawCircle(this.x, this.y, this.r, `${this.rgb},${this.opacity})`)
      }
    }

    confetti = (function () {
      const results = []
      for (let i = 0; i < NUM_CONFETTI; i++) {
        results.push(new Confetti())
      }
      return results
    })()

    step = function () {
      var c, j, len, results
      window.requestAnimationFrame(step)
      context.clearRect(0, 0, width, height)
      results = []
      for (j = 0, len = confetti.length; j < len; j++) {
        c = confetti[j]
        results.push(c.draw())
      }
      return results
    }
    step()
  }

  componentDidMount () {
    this.runAnimation()
  }

  render () {
    return (
      <section className='header header-1 background-image'>
        <div className='container'>
          <div className='row'>
            <div className='text-center col-sm-11'>
              <h1>You're Invited!</h1>
              <h6>October 15th 2018 - Eastington Park, Cotswolds</h6>
            </div>
          </div>
        </div>
        <canvas id='header-animation' />
      </section>
    )
  }
}

export default Hero
