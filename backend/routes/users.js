const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  getUserById,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');
const { regExpForLinks } = require('../utils/constants');

router.get('/users', getUser);
router.get('/users/me', getUserInfo);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regExpForLinks).required(),
  }),
}), updateAvatar);

module.exports = router;
