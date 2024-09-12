require('dotenv').config()

const express = require('express')
const app = express()
const consign = require('consign')

app.db = require('./config/database')

const HOST = process.env.APP_HOST
const PORT = process.env.APP_PORT

app.use('/book-covers', express.static('../storage/book-covers/'))

consign()
    .include('./middlewares/passport.js')
    .then('./middlewares/connection.js')
    .then('./models')
    .then('./controllers/validation.js')
    .then('./controllers')
    .then('./routes')
    .into(app)

app.listen(PORT, () => {
    console.log(`backend listenning on http://${HOST}:${PORT}`)
})