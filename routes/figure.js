var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

require('../models/connection');

const Figure = require("../models/figures")

//***************afficher toutes les émotions sur la HomeScreen
router.get("/", (req, res) => {
  // Trouver les cards aimés par l'utilisateur spécifié
  Figure.find().then((data) => {
    res.json({result: true, data});
  });
});

//

router.get("/:type", (req, res) => {
  // Trouver les cards aimés par l'utilisateur spécifié
  Figure.find({type:req.params.type}).then((data) => {
    res.json({ result: true, data });
  });
});

//afficher toutes les audios selon une recherche (targets)
router.get("/search/:search", (req, res) => {
  //1. afficher toutes les audios selon user id
  Figure.find({ name: { $regex: new RegExp(req.params.search, "i") } }) // Trouver les audios aimés par l'utilisateur spécifié
    .then((data) => {
      res.json({ result: true, data });
    });
});

module.exports = router;