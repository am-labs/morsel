import { Router } from 'express'
import { encode, decode } from './lib'
import Url from './models/url'
import url from 'url'

const api = Router()
const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

api.get('/actions/shorten', shorten)
api.get('/redirect/:code', redirect)

export function shorten (req, res, next) {
  const { query } = req

  if (!query.url) {
    const err = new Error('url is required')
    err.status = 400
    return next(err)
  }

  if (!url.parse(query.url).protocol) {
    const err = new Error('url must have a protocol')
    err.status = 400
    return next(err)
  }

  Url.findOne({ long_url: query.url }, (err, doc) => {
    if (err) return next(err)

    if (doc) {
      const result = url.resolve(baseUrl, `/r/${encode(doc._id)}`)
      return res.send(result)
    }

    doc = new Url({
      long_url: query.url
    })

    doc.save((err) => {
      if (err) return next(err)
      const result = url.resolve(baseUrl, `/r/${encode(doc._id)}`)
      res.send(result)
    })
  })
}

export function redirect (req, res, next) {
  Url.findOne({ _id: decode(req.params.code) }, (err, doc) => {
    if (err) return next(err)
    if (!doc) return res.redirect(baseUrl)

    res.redirect(doc.long_url)
  })
}

export default api
