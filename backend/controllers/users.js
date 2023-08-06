/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-unused-vars
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
/* eslint-disable import/no-extraneous-dependencies */
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
const Unauthrized = require('../errors/Unauthorized');
const { JWT_SECRET_DEV } = require('../models/config');

const { JWT_SECRET, NODE_ENV } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
        return res.status(200).send({ token });
      }

      throw new Unauthrized('Неправильные почта или пароль');
    })
    .catch((err) => next(err));
};

const getUser = (_req, res, next) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).send({ user }))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Передача некорректных данных при поиске пользователя'));
      }

      return next(new NotFound('Пользователь в базе данных не найден.'));
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Передача некорректных данных при поиске пользователя'));
      }

      return next(new NotFound('Пользователь в базе данных не найден.'));
    });
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then(() => res.status(201).send({
      email, name, about, avatar,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new Conflict('Пользователь с таким email уже существует.'));
      }

      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при создании пользователя.'));
      }

      return next(err);
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
      }

      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFound('Пользователь с указанным _id не найден.'));
      }

      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при обновлении аватара.'));
      }

      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFound('Пользователь с указанным _id не найден.'));
      }

      return next(err);
    });
};

module.exports = {
  getUser,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
  login,
  getUserInfo,
};
