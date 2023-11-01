var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

require('../models/connection');


const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//***********route enregistrement */ SignUp
router.post("/signup", (req, res) => {
  //1. check si tous les champs sont bien remplis
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  //2.  Check si l utilisateu n'existe pas deja.
  User.findOne({ username: req.body.username }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hash,
        token: uid2(32),
      });

      newUser.save().then((user) => {
        res.json({ result: true, token: user.token, userId: user._id });
      });
    } else {
      // sinon, l utilisateur existe deja
      res.json({ result: false, error: "User already exists" });
    }
  });
});

//********route de connexion */ signIn
router.post("/signin", (req, res) => {
  // 1. Vérifiez si tous les champs sont bien remplis
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  // 2. Recherchez l'utilisateur par nom d'utilisateur
  User.findOne({ username: req.body.username }).then((data) => {
    if (!data) {
      // Aucun utilisateur trouvé avec le nom d'utilisateur spécifié
      res.json({ result: false, error: "User not found" });
    } else {
      // Vérifiez si le mot de passe correspond
      if (bcrypt.compareSync(req.body.password, data.password)) {
        res.json({
          result: true,
          token: data.token,
          username: data.username,
          userId: data._id,
        });
      } else {
        // Mot de passe incorrect
        res.json({ result: false, error: "Wrong password" });
      }
    }
  }).catch((error) => {
    console.error("Erreur lors de la recherche de l'utilisateur : ", error);
    res.json({ result: false, error: "Une erreur s'est produite. Veuillez réessayer." });
  });
});


//***********modifier ses informations de compte */ update account
router.put("/update", (req, res) => {
  User.findOne({ token: req.body.token }).then((data) => {
    if (!data) {
      res.json({ result: false, error: "User not found" });
      return;
    }
  });

  User.updateOne(
    { token: req.body.token },
    { username: req.body.username },
    { password: req.body.password },
  ).then((data) => {
    res.json({ result: true, user: "User well updated" });
  });
});

//*********supprimer le compte d'un User******route Delete
router.delete("/", (req, res) => {
  //1. verifier si le token existe
  if (!checkBody(req.body, ["token", "username"])) {
    res.json({ result: false, error: "Cant`t delete your account" });
    return;
  }

  //2. rechercher si le token == token donnée
  User.findOne({ token: req.body.token }).then((user) => {
    if (user === null) {
      res.json({ result: false, error: "User not found" });
      return;
    }

    //3. supprimer par rapport a son token
    User.findOneAndRemove({ token: req.body.token }).then((data) => {
      // console.log(data);
      if (data) {
        res.json({ result: true, message: "Account well deleted" });
      } else {
        res.json({ result: false });
      }
    });
  });
});


module.exports = router;

