const mongoose = require('mongoose');

const cartsSchema = mongoose.Schema({
  name: String,
  img: String,
  price: Number,
  description:String,
  type:String
});

const Cart = mongoose.model('cart', cartsSchema);

module.exports = Cart;