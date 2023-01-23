const router = require('express').Router();

router.use('/v1', require('./user_router'));
router.use('/v1', require('./awards_router'));

module.exports = router;