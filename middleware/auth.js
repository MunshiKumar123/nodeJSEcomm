const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const verifyToken = (req, resp, next) => {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: 'Please provide a valid token' });
            } else {
                req.user = valid.user;
                next();
            }
        });
    } else {
        resp.status(401).send({ result: 'Please add a token with the header' });
    }
};

module.exports = verifyToken;
