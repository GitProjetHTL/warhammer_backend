const mongoose = require('mongoose');

const figuresSchema = mongoose.Schema({
  name: String,
  img: String,
  price: Number,
  description:String,
  type:String
});

const Figure = mongoose.model('figures', figuresSchema);

module.exports = Figure;