import mongoose, { Schema } from 'mongoose'
import Counter from './counter'

const urlSchema = new Schema({
  _id: {
    type: Number,
    index: true
  },
  long_url: String,
  created_at: Date
})

urlSchema.pre('save', setId)

function setId (next) {
  const doc = this
  const update = { $inc: { seq: 1 } }

  Counter.findByIdAndUpdate('url_count', update, (err, counter) => {
    if (err) return next(err)
    doc._id = counter.seq
    doc.created_at = new Date()
    next()
  })
}

export default mongoose.model('Url', urlSchema)
