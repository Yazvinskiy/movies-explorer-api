const router = require('express').Router();

const {
  updateUser,
  getUserInfo,
} = require('../controllers/users');
const { updateUserValidator } = require('../middlewares/validation');

router.get('/me', getUserInfo);

router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
