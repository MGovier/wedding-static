const sgMail = require('@sendgrid/mail')
const crypto = require('crypto')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const cookieKey = Buffer.from(process.env.COOKIE_ENCRYPTION_KEY, 'hex')
const config = require('../data-example.json')

async function authenticate (ctx, next) {
  if (!ctx.request.body.hasOwnProperty('code')) {
    ctx.throw(400)
  }
  const user = await lookupCode(ctx.request.body.code)
  if (user === undefined) {
    ctx.throw(401, 'Unrecognised code.')
  }
  ctx.body = 'Great, thanks!'
  const encryptedCode = encrypt(user.code)
  ctx.cookies.set('MBCodeCookie', encryptedCode, {
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
  ctx.body = await ctx.state.guest
  await next()
}

async function update (ctx, next) {
  if (!ctx.request.body.hasOwnProperty('code')) {
    ctx.throw(400)
  }
  // Update this users information
  // Dispatch new email (but debounce with a massive timeout)
  await next()
}

async function lookupCode (code) {
  const co = code.toUpperCase().trim()
  return config.guests.find(g => { return g.code === co })
}

async function cookieCheck (ctx, next) {
  let code = ctx.cookies.get('MBCodeCookie', { signed: true })
  if (code === undefined || code.length < 4) ctx.throw(401)
  let guest
  try {
    let plainCode = decrypt(code)
    guest = lookupCode(plainCode)
  } catch (e) {
    ctx.throw(400)
  }
  if (guest === undefined) ctx.throw(400)
  ctx.state.guest = guest
  await next()
}

function encrypt (code) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('AES-128-CBC', cookieKey, iv)
  let crypted = cipher.update(code, 'utf8', 'hex')
  crypted += cipher.final('hex')
  crypted += ',' + iv.toString('hex')
  return crypted
}

function decrypt (input) {
  const split = input.split(',')
  const code = split[0]
  const iv = Buffer.from(split[1], 'hex')
  const decipher = crypto.createDecipheriv('AES-128-CBC', cookieKey, iv)
  let dec = decipher.update(code, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

module.exports = {
  authenticate,
  info,
  update,
  cookieCheck
}
