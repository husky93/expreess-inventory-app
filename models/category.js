const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  description: { type: String, maxLength: 500 },
});

CategorySchema.virtual('url').get(function () {
  return `/categories/${this._id}`;
});

module.exports = mongoose.model('Category', CategorySchema);
