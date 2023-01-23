const router = require('express').Router();
const user = require('../../controllers/user_contraller');

router.post('/user/login', user.loginUser);

module.exports = router;