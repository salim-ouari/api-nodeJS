// importer le package HTTP de Node.js pour créer un serveur

const http = require('http');
// console.log(http);

// importer l'application app.js
const app = require('./app');

// importer le package dotenv pour gérer les variables d'environnement
const dotenv = require('dotenv');
const result = dotenv.config();

// paramètrage du port avec la méthode set de express
app.set('port', process.env.PORT);

// créer un serveur avec la méthode createServer de http
// la fonction qui sera appelée à chaque requête reçue par le serveur
// ici les fonctions seront dans app.js
const server = http.createServer(app);

// le serveur écoute sur le port
server.listen(process.env.PORT);