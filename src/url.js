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

urlSchema.pre('save', function (next) {
  const doc = this
  Counter.findByIdAndUpdate(
    { _id: 'url_count' },
    { $inc: { seq: 1 } },
    (err, counter) => {
      if (err) return next(err)
      doc._id = counter.seq
      doc.created_at = new Date()
      next()
    })
})

export default mongoose.model('Url', urlSchema)
