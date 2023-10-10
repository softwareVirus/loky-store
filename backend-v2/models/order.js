const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const OrderSchema = new mongoose.Schema(
  {
    orderCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderCard',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    quantity: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    totalPrice: {
      type: Number,
      required: true
    }
  },

  { timestamps: true } // This option adds created_at and updated_at fields
)

OrderSchema.plugin(autopopulate)

module.exports = mongoose.model('Order', OrderSchema)
