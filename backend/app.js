const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const cors = require('./middlewares/cors');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const { errorHeandler } = require('./middlewares/errorHeandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { regExpForLinks } = require('./utils/constants');
require('dotenv').config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false,
});

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('База данных подключена'))
  .catch(() => console.log('База данных не подключена'));

app.use(helmet());
app.use(limiter);
app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExpForLinks),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.use(auth);
app.use('/', userRoutes);
app.use('/', cardRoutes);
app.use('*', (_req, _res, next) => {
  next(new NotFound('Страница не найдена'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHeandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
