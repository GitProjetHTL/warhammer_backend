var express = require('express');
var router = express.Router();

require('../models/connection');

const Wargame = require("../models/wargames")

//***************afficher toutes les émotions sur la HomeScreen
router.get("/", (req, res) => {
  // Trouver les cards aimés par l'utilisateur spécifié
  Wargame.find().then((data) => {
    res.json({ result: true, data });
  });
});

router.get("/:type", (req, res) => {
  // Trouver les cards aimés par l'utilisateur spécifié
  Wargame.find({type:req.params.type}).then((data) => {
    res.json({ result: true, data });
  });
});
//

module.exports = router;