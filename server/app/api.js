const level = require('level')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const config = require('../data-example.json')

const db = level('./data.db')

async function authenticate (ctx, next) {
  if (!ctx.request.body.hasOwnProperty('code')) {
    ctx.throw(400)
  }
  const code = ctx.request.body.code.toUpperCase().trim()
  let user = config.guests.find(g => { return g.code === code })
  if (user === undefined) {
    ctx.throw(401, 'Unrecognised code.')
  }
  ctx.body = 'Great, thanks!'
  ctx.cookies.set('MBCodeCookie', code, {
    maxAge: 15778800000,
    secure: false,
    signed: true,
    httpOnly: true,
    overwrite: true,
    // Helps prevent any CSRF:
    sameSite: true
  })
  await next()
}

async function info (ctx, next) {
  // Get up to date information from DB
  await next()
}

async function update (ctx, next) {
  // Update this users information
  // Dispatch new email (but debounce with a massive timeout)
  await next()
}

module.exports = {
  authenticate,
  info,
  update
}
