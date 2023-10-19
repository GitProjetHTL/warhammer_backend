const mongoose = require('mongoose');

const wargamesSchema = mongoose.Schema({
  name: String,
  img: String,
  price: Number,
  description:String
});

const Wargame = mongoose.model('wargames', wargamesSchema);

module.exports = Wargame;