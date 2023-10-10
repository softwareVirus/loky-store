const { autopopulate } = require('mongoose-autopopulate')

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
const ContactForm = mongoose.model('ContactForm', contactFormSchema)

module.exports = ContactForm
