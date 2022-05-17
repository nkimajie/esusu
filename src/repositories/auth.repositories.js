const { Op } = require('sequelize');
const UsersModel = require('../models/users.models');
const bcrypt = require('bcrypt');
const _ = require('lodash');

module.exports = class AuthRepository extends UsersModel {
    /**
     * validate user credentials
     * @param {*} email
     * @param {*} password
     * @return {object} user details
     */
     static async validateUser(email, password) {
        let user = await this.findOne({
            where: {
                email: {
                    [Op.eq]: email,
                },
            },
        });
        if (!user) {
            return Promise.reject('Invalid email or password');
        }

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return Promise.reject('Invalid email or password');
        }
        user = _.omit(user.toJSON(), ['password']);
        return user;
    }

    /**
     * Create new user account
     * @param {string} data
     * @return {object} user details
     */
    static async createUser(data) {
        const { email, password } = data;
        const [user, created] = await this.findOrCreate({
            where: { email },
            defaults: {
                ...data,
                password: bcrypt.hashSync(password, 8),
            },
        });
        if (!created) return Promise.reject('User already exist');
        return _.omit(user.toJSON(), ['password']);
    }

    static async getOneUser(uuid) {
        const user = await this.findOne({
            where: {
                uuid
            },
        });
        if(!user) return Promise.reject('Invalid user uuid');
        return _.omit(user.toJSON(), ['password', 'updatedAt', 'createdAt']);
    }
}