const sgMail = require('@sendgrid/mail')
const crypto = require('crypto')
const Redis = require('ioredis')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
sgMail.setSubstitutionWrappers('{{', '}}')

const cookieKey = Buffer.from(process.env.COOKIE_ENCRYPTION_KEY, 'hex')
const config = require('../data-example.json')
const db = new Redis()

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
    sameSite: 'strict'
  })
  await next()
}

async function info (ctx, next) {
  // Get static info from config along with any DB info.
  const staticInfo = await ctx.state.guest
  const guestInfo = {
    eveningOnly: staticInfo.eveningOnly,
    name: staticInfo.name,
    couple: staticInfo.couple
  }
  const dbInfo = await db.get(ctx.state.guest.code)
  if (dbInfo !== null) {
    guestInfo.rsvpStatus = dbInfo.rsvpInfo
    guestInfo.menuChoices = dbInfo.menuChoices
  } else {
    guestInfo.undecided = true
  }
  ctx.body = guestInfo
  await next()
}

async function update (ctx, next) {
  // Check we have RSVP and menu choices!
  const staticInfo = await ctx.state.guest
  let template
  const dbInfo = {
    rsvp: true,
    menuChoices: {
      Joe: {
        main: 'aaargh',
        dessert: 'noooooo'
      }
    }
  }
  db.set(staticInfo.code, JSON.stringify(dbInfo))
  let rsvpStatus = true
  if (rsvpStatus && staticInfo.couple) {
    template = '7488fb6f-70a1-4523-a7ff-378bf0f3e5ab'
  } else if (rsvpStatus) {
    template = '99dd386d-c213-46e8-a744-a2fac90a4450'
  } else if (!rsvpStatus) {
    template = 'b2c0ffb2-38cb-42f3-a2fe-6b164ee1e9df'
  }
  const msg = {
    to: 'merlin@govie.rs',
    from: 'us@birgitandmerlin.com',
    templateId: template,
    substitutions: {
      name: 'Birgit and Merlin',
      guest1: 'Birgit',
      guest1_main: 'Onions',
      guest1_dessert: 'More Onions... Weird.',
      guest2: 'Merlin',
      guest2_main: 'Onions',
      guest2_dessert: 'More Onions... Weird.'
    }
  }
  await sgMail.send(msg)
  ctx.body = 'Got it!'
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
