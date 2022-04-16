const express = require('express');



const mongoose = require('mongoose');
// Il nous faudra une nouvelle importation dans app.js pour accéder au path de notre serveur :  qui donne accés au chemin du systeme de fichier 
const path = require('path');
// les routeurs
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://faouaz:mongoBD15@cluster0.947h4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  // Express prend toutes les requêtes qui ont comme Content-Type  application/json  et met à disposition leur  body  directement sur l'objet req
  app.use(express.json());
  
  app.use('/images', express.static(path.join(__dirname, 'images'))); 
  app.use('/api/sauces' ,sauceRoutes);
  app.use('/api/auth', userRoutes);


module.exports = app;