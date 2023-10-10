const autopopulate = require('mongoose-autopopulate')
const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

contactFormSchema.plugin(autopopulate)

module.exports = mongoose.model('ContactForm', contactFormSchema)
