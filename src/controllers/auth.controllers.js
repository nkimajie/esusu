const AuthRepository = require('../repositories/auth.repositories');
const generateToken = require('../utils/generatetoken.utils');
const _ = require('lodash');

module.exports = class AuthController {
    /**
     * sign in user
     * @param {*} req
     * @param {*} res
     * @return {object} json  with user data
     */
    static async signin(req, res) {
        const { email, password } = req.body;
        const user = await AuthRepository.validateUser(email, password);
        if (user) {
            const token = generateToken.generateAccessToken(user);
            const userData = _(user).assign({ token }).omit('otpExpires', 'otp', 'password', 'updatedAt');
            return res.data(userData);
        }
    }

    /**
     * create user account
     * @param {*} req
     * @param {*} res
     * @return {string} string
     */
    static async createAccount(req, res) {
        const data = _.omit(req.body, ['confirmPassword']);
        await AuthRepository.createUser(data);
        return res.data('user created');
    }
};