const router = require('express').Router();
const aw = require('../../controllers/awards_controller');

router.get('/awards', aw.findAwards);

module.exports = router;