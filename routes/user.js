// importation
const express = require('express');

// importation du middleware password
const password = require('../middleware/password');

// importation du Controller user
const userController = require('../Controllers/user');


// la fonction Router de express
const router = express.Router();


// la route (endpoint) pour la création d'un utilisateur
router.post('/signup', password, userController.signup);

// la route (endpoint) pour la connexion d'un utilisateur
router.post('/login', userController.login);


// exportation du module
module.exports = router;