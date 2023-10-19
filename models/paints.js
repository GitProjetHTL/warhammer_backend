const mongoose = require('mongoose');

const paintsSchema = mongoose.Schema({
  name: String,
  img: String,
  price: Number,
  description:String
});

const Paint = mongoose.model('paints', paintsSchema);

module.exports = Paint;