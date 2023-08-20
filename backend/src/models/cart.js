const mongoose = require('mongoose');
const { autopopulate } = require('mongoose-autopopulate')

const orderCardSchema = new mongoose.Schema(
  {
    dimensions: String, // Single string for dimensions
    size: String,
    price: Number,
    releaseYear: Number,
    releaseMonth: String,
    inStock: Boolean,
    isFavorite: Boolean
  },
  { timestamps: true }
);

orderCardSchema.plugin(autopopulate)

const OrderCard = mongoose.model('OrderCard', orderCardSchema);
module.exports = OrderCard
