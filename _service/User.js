const User = require("../_schema/User");
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const userRegister = async (req, resp) => {
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: req?.body?.email });
        if (existingUser) {
            resp.status(400).json({ error: "Email already exists" });
            return;
        } else {
            // Create a new user
            let user = new User(req?.body);
            let result = await user.save();
            result = result?.toObject();
            delete result?.password;
            resp.status(201).send({ message: "User registration successful", user: result });
        }
    } catch (error) {
        resp.status(500).send({ error: "Registration failed" });
    }
}

const getUserList = async (req, resp) => {
    try {
        const products = await User.find();
        resp.status(200).send(products);
    } catch (err) {
        resp.status(500).send('data not found');
    }
}

const userLogin = async (req, resp) => {
    try {
        if (req?.body?.email && req?.body?.password) {
            let user = await User.findOne(req?.body).select("-password");
            if (user) {
                Jwt.sign({ user }, jwtKey, (err, token) => {
                    if (err) {
                        resp.send({ result: 'something went wrong, Please try after sometime' })
                    }
                    resp.send({ user, auth: token })
                })
            } else {
                resp.send({ result: "no user found" })
            }
        } else {
            resp.status(400).json({ error: "Email and password are required" })
        }
    } catch (error) {
        resp.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    userRegister,
    getUserList,
    userLogin
};
