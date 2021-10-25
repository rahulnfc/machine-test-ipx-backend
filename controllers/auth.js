const jwt = require('jsonwebtoken');
const {AuthHelper} = require('../helpers');

module.exports = {
    // Register a new user
    register: async (req, res) => {
        const Register = await AuthHelper.register(req.body);
        if (Register.emailExists) {
            return res.status(400).json({ emailExists: true });
        } else if (Register.phoneExists) {
            return res.status(400).json({ phoneExists: true });
        } else if (Register.user) {
            return res.status(200).json({ accountCreated: true });
        }
    },
    // Login a user
    login: async (req, res) => {
        const Login = await AuthHelper.login(req.body);
        if (Login.invalidEmail) {
            return res.status(400).json({ invalidEmail: true });
        } else if (Login.invalidPassword) {
            return res.status(400).json({ invalidPassword: true });
        } else if (Login.user) {
            const token = jwt.sign({ _id: Login.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
            return res.status(200).json({ token: token, userId: Login.user._id });
        }
    }
};