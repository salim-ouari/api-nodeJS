// importer le package pour utiliser les variables d'environnement
require('dotenv').config();

// Création BDD

const mysql = require('mysql');
console.log(mysql);

// les paramétes de connexion à la base de données
const mysqlconnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// connexion à la base de données
mysqlconnection.connect((err) => {
    if (err) {
        console.log('error connecting: ${err.}');
    } else {

        console.log('connecté à la base de données');
        console.log("connected as id ${mysqlconnection.threadId}");
    }
})

module.exports = mysqlconnection;