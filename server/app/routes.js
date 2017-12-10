const Router = require('koa-router')
const KoaBody = require('koa-body')
const rateLimit = require('koa-ratelimit')
const Redis = require('ioredis')
const { info, update, authenticate } = require('./api')

const router = new Router({
  prefix: '/api'
})
const bodyParser = KoaBody({
  text: false,
  encoding: 'utf-8',
  multipart: false,
  urlencoded: false,
  json: true,
  jsonLimit: '50b',
  strict: true
})
const rateLimiter = rateLimit({
  db: new Redis(),
  duration: 60000,
  id: ctx => ctx.ip,
  max: 6
})

router
  .get('/info', info)
  .post('/auth', rateLimiter, bodyParser, authenticate)
  .post('/info', bodyParser, update)

module.exports = {
  routes () { return router.routes() },
  allowedMethods () { return router.allowedMethods() }
}
