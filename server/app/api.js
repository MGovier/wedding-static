const level = require('level')
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
    sameSite: true
  })
  await next()
}

async function info (ctx, next) {
  await next()
}

async function update (ctx, next) {
  await next()
}

module.exports = {
  authenticate,
  info,
  update
}
