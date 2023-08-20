const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const UserSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      salt: {
        type: String,
        required: true
      },
      orderItems: [
        {
          orderCard: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrderCard',
          },
          quantity: {
            type: Number,
            required: true
          },
          orderDate: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    { timestamps: true } // This option adds created_at and updated_at fields
  )

UserSchema.plugin(autopopulate)

module.exports = mongoose.model('User', UserSchema)
