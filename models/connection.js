const mongoose = require('mongoose');
require('dotenv').config();

// Définir le lien de connexion MongoDB
const mongoURI = process.env.MONGODB_URI;


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion à MongoDB établie avec succès');
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB :', error);
  });