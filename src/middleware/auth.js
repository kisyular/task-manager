const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('config');
const SECRET_OR_PUBLIC_KEY = config.get('SECRET_OR_PUBLIC_KEY');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, SECRET_OR_PUBLIC_KEY);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        console.log(user);

        if (!user) {
            console.log("No user");
            throw new Error()
        }
        req.token = token;
        req.user = user;
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth