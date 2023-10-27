var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

require('../models/connection');

const Wargame = require("../models/paints")

//***************afficher toutes les émotions sur la HomeScreen
router.get("/", (req, res) => {
  // Trouver les cards aimés par l'utilisateur spécifié
  Wargame.find().then((data) => {
    res.json({ result: true, data });
  });
});

//

module.exports = router;