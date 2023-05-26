const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  updateUser,
  getUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = router;
