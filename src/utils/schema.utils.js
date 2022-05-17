const Joi = require('joi');

module.exports = class schema {
    /**
     * login schema
     */
    static get loginSchema() {
        return Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required(),
        });
    }

    /**
     * register schema
     */
    static get signupSchema() {
        return Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required(),
            confirmPassword: Joi.string().required().valid(Joi.ref('password')),
        });
    }

    /**
     * group schema
     */
     static get createGroupSchema() {
        return Joi.object({
            groupName: Joi.string().required(),
            groupDesc: Joi.string().required(),
            groupStatus: Joi.string().required(),
            groupAdminId: Joi.string().required(),
        });
    }

    static get joinGroupSchema() {
        return Joi.object({
            userId: Joi.string().required(),
            groupId: Joi.string().required(),
        });
    }
};