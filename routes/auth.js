const router = require('express').Router();

const { loginValidator, createUserValidator } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');

router.post('/signin', loginValidator, login);
router.post('/signup', createUserValidator, createUser);

module.exports = router;
