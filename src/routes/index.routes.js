const router = require('express').Router();
const authRoute = require('./auth.routes');
const groupsRoute = require('./groups.routes');

router.use(authRoute);
router.use(groupsRoute);

module.exports = router;