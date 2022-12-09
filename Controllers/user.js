// importation bcrypt pour hasher le mot de pass
const bcrypt = require('bcrypt');

// importation du model User
const User = require('../Models/User');


// importation de crypto.js pour chiffrer l'email
const cryptojs = require('crypto-js');

// importation de jsonwebtoken pour créer un token d'authentification
const jwt = require('jsonwebtoken');

// importation pour gérer les variables d'environnement
require('dotenv').config();

// importation de mysql
const mysqlconnection = require('../db/db');

// signup pour enregistrer un nouvel utilisateur
exports.signup = (req, res,) => {
    // console.log(req.body);
    // console.log(req.body.email);
    // console

    // avec le destructuring j'aurais l'éqivalent à req.body.email et req.body.password

    const { email, password, lastname, firstname } = req.body;
    // console.log("ECMASCRIPT 2017");
    // console.log(email);
    // console.log(password);

    // chiffrer l'email avant de l'envoyer dans la bdd
    // const emailCryptoJs = cryptojs.HmacSHA256(email, process.env.CRYPTOJS_EMAIL.toString());

    // hasher le mot de passe AVANT de l'envoyer dans la bdd
    // salt = l'algorithme de hashage sera exécuté 10 fois
    bcrypt.hash(password, 10).then(hash => {
        // console.log(emailCryptoJs);
        // console.log(hash);
        // les données à envoyer dans la bdd
        const user = {
            email: email,
            password: hash,
            lastname: lastname,
            firstname: firstname
        }
        // console.log(user);

        // requête pour insérer les données dans la bdd
        mysqlconnection.query('INSERT INTO user SET ?', user, (err, results, fields) => {
            if (!err) {
                res.status(201).json({ message: 'Utilisateur créé !' });
            } else {
                res.status(500).json({ error: err });
            }
        });



    })
        .catch((error => res.status(500).json({ error }).send(console.log(error))));

};

// login pour connecter un utilisateur
exports.login = (req, res, next) => {
    // le contenu de la requête
    // console.log(req.body.email);
    // console.log(req.body.password);

    // chiffrer l'email avant de l'envoyer dans la bdd
    // const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, process.env.CRYPTOJS_EMAIL.toString());
    // console.log(emailCryptoJs);

    const email = req.body.email;

    // chercher dans la bdd si l'email existe
    mysqlconnection.query('SELECT * FROM user WHERE email = ?', email, (err, results, fields) => {
        if (err) {
            return res.status(500).json({ err });
        } else {
            if (results.length === 0) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            } else {
                // comparer le mot de passe envoyé avec celui de la bdd
                bcrypt.compare(req.body.password, results[0].password)
                    .then(controlPassword => {
                        if (!controlPassword) {
                            return res.status(401).json({ error: 'Mot de passe incorrect !' });
                        } else {
                            // créer un token d'authentification
                            const token = jwt.sign(
                                // 3 arguments
                                { userId: results[0].id },
                                process.env.JWT_KEY_TOKEN,
                                { expiresIn: '12h' }
                            )
                            console.log(token);

                            // réponse du serveur avec le userId et le token
                            res.status(200).json({
                                userId: results[0].id, token
                            });

                        }
                    })

                    .catch(error => res.status(500).json({ error }));
            };

        };
    });
};





