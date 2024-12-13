const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Name of the category
  description: { type: String } // Optional description
});

module.exports = mongoose.model('Category', CategorySchema);
