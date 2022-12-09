const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// exportation de la fonction du middleware
module.exports = (req, res, next) => {
    try {
        // récupérer le token dans le headers authorization : Bearer TOKEN
        // console.log(req.headers.authorization);

        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);



        // décoder le token avec la clé secrète
        const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
        // console.log(decodedToken);
    }
    catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};