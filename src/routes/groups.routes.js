const router = require('express').Router();
const validator = require('../../services/validation.services');
const schema = require('../utils/schema.utils');
const $Groups = require('../controllers/groups.controllers');
const $ = require('express-async-handler');


router.route('/groups/create-group')
    .post(validator(schema.createGroupSchema), $($Groups.createGroup));

router.route('/groups/get-all-public-groups')
    .get($($Groups.getPublicGroups));


router.route('/groups/join-groups')
    .post(validator(schema.joinGroupSchema), $($Groups.joinPublicGroups));


module.exports = router;