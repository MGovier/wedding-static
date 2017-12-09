const Router = require('koa-router')
const KoaBody = require('koa-body')
const { info, update, authenticate } = require('./api')

const router = new Router()
const bodyParser = KoaBody({
  text: false,
  encoding: 'utf-8',
  multipart: false,
  urlencoded: false,
  json: true,
  jsonLimit: '50b',
  strict: true
})

router
  .get('/info', info)
  .post('/auth', bodyParser, authenticate)
  .post('/info', bodyParser, update)

module.exports = {
  routes () { return router.routes() },
  allowedMethods () { return router.allowedMethods() }
}
