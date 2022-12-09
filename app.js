const express = require('express');
// const mysql = require('db.js');

// importation de morgan (logger http)) 
const morgan = require('morgan');

// importation de connexion base de donées mysql
const mysql = require('./db/db');

// importation de body-parser pour transformer le corps de la requête en objet JSON
const bodyParser = require('body-parser');


// importation des routes
const userRoutes = require('./routes/user');
const groupesRoutes = require('./routes/groupes');

// pour créer une application express
const app = express();

// logger les requêtes et les reponses
app.use(morgan('dev'));

// gérer les erreurs CORS (Cross Origin Resource Sharing)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
});


// transformer le corps de la requête en objet JSON
app.use(bodyParser.json());

// la route d'authentification
app.use('/api/auth', userRoutes);

// la route des groupes
app.use('/api/groupes', groupesRoutes);






// Une route qui permet à un utilisateur de s’enregistrer en complétant les champs
//     prenom, nom, email et un groupe.
// app.post('/UsersSignIn', (request, response) => {
//     var sql = "INSERT INTO `user` (`roles`,`lastname`,`firstname`, `email`, `groupes_id`, `password`, `created_at`) VALUES ('[]','test', 'test', 'test@test.io', 7, 'test', NOW())";
//     mysqlconnection.query(sql, (err, result) => {
//         if (err) throw err;
//         response.status(201);
//         response.send(result);
//     });
// });

// Une route qui permet à un utilisateur de se connecter

// Une route qui retourne tous les utilisateurs dans une liste contenant les champs
// prenom et nom.
app.get('/UsersName', (request, response) => {
    var sql = "SELECT `firstname`, `lastname` FROM `user`";
    mysqlconnection.query(sql, (err, result) => {
        if (err) throw err;
        response.status(200);
        response.send(result);
    });
});

// Une route qui retourne uniquement les noms des groupes (groupe 1, groupe 2, ...)

// app.get('/UsersGroupes', (request, response) => {
//     var sql = "SELECT `name` FROM `groupes`";
//     mysqlconnection.query(sql, (err, result) => {
//         if (err) throw err;
//         response.status(200);
//         response.send(result);
//     });
// });

// Une route qui retourne les groupes ainsi que les users qui y sont rattachés
// (uniquement prenom et nom)


// Une route qui permet d’avoir les détails d’un user (nom prenom email groupe)
// app.get('/UsersDetails', (request, response) => {
//     var sql = "SELECT `firstname`, `lastname`, `email`, `groupes_id` FROM `user`";
//     mysqlconnection.query(sql, (err, result) => {
//         if (err) throw err;
//         response.status(200);
//         response.send(result);
//     });
// });


// Une route qui permet aux utilisateur de s’ajouter à un groupe

// Une route qui permet de modifier ses informations (uniquement celles de l’utilisateur connecté)

// Les routes qui permettent de supprimer, modifier un user

//Les routes qui permettent d’ajouter, modifier, supprimer un groupe

// Une route qui permet de modifier les utilisateurs présents dans un groupe


// exportation de app.js pour pouvoir l'utiliser dans server.js;
module.exports = app;