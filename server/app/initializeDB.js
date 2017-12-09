const level = require('level')
const config = require('./data-example.json')
const db = level('./mydb')

config.guests.forEach(guest => {
  db.put(guest.name, {
    rsvp: false
  }, err => {
    if (err) return console.log('Ooops!', err) // some kind of I/O error
  })
})
