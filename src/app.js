import path from 'path'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'

import api from './api'

mongoose.connect('mongodb://localhost/morsel-dev')

const app = express()

app.engine('hbs', handlebars({
  extname: 'hbs',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),
  defaultLayout: 'default'
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))

app.use(morgan('dev'))

app.use(express.static(__dirname + '/../static'))

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/r/:code', (req, res, next) => {
  res.redirect(`/api/redirect/${req.params.code}`)
})

app.use('/api', api)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  })
})

export default app
