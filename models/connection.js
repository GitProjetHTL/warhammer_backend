const mongoose = require('mongoose');

// Définir le lien de connexion MongoDB
const mongoURI = process.env.MONGODB_URI;

// Se connecter à MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    // Votre code ici une fois la connexion établie
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });