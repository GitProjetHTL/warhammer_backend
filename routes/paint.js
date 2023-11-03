var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

require('../models/connection');

const Paint = require("../models/paints")

//***************afficher toutes les émotions sur la HomeScreen
router.get("/", (req, res) => {
  // Trouver les cards aimés par l'utilisateur spécifié
  Paint.find().then((data) => {
    res.json({ result: true, data });
  });
});

router.get("/:type", (req, res) => {
  // Trouver les cards aimés par l'utilisateur spécifié
Paint.find({type:req.params.type}).then((data) => {
    res.json({ result: true, data });
  });
});

//

module.exports = router;