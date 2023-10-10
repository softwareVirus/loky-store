const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate')

const OrderCardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    dimensions: {
      type: [String],
      require: true
    }, 
    imageSrc: {
      type: [{
        image: String,
        alt: String
      }],
      require: true
    },
    size: {
      type: [String],
      require: true
    }, 
    price: {
      type: Number,
      require: true
    },
    releaseYear: {
      type: Number,
      require: true
    },
    releaseMonth: {
      type: String,
      require: true
    },
    inStock: {
      type: Boolean,
      require: true
    },
  },
  { timestamps: true }
);

OrderCardSchema.plugin(autopopulate)

module.exports = mongoose.model('OrderCard', OrderCardSchema);
