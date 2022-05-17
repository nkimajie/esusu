const router = require('express').Router();
const validator = require('../../services/validation.services');
const schema = require('../utils/schema.utils');
const $Auth = require('../controllers/auth.controllers');
const $ = require('express-async-handler');


router.route('/auth/signin')
    .post(validator(schema.loginSchema), $($Auth.signin));

router.route('/auth/signup')
    .post(validator(schema.signupSchema), $($Auth.createAccount));


module.exports = router;