const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: Number,
  number_in_stock: Number,
});

ItemSchema.virtual('url').get(function () {
  return `/items/${this._id}`;
});

module.exports = mongoose.model('Category', ItemSchema);
