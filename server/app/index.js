require('dotenv').config()

const Koa = require('koa')
const logger = require('koa-logger')
const { routes, allowedMethods } = require('./routes')
const config = require('../data-example.json')

const app = new Koa()

app.keys = config.keys

app.use(logger())
app.use(routes())
app.use(allowedMethods())

app.listen(3000)
console.log('💍 Wedding API is LIVE on port 3000 👰')
