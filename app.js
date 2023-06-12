const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = 3000;
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralErrorСontroller = require('./middlewares/centralErrorСontroller');
const limiter = require('./middlewares/rateLimit');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb').then(() => {
  console.log('Connecting mongo');
}).catch((err) => {
  console.log(`Error ${err}`);
});

app.use(express.json());

app.use(requestLogger);

app.use(
  cors({
    origin: ['https://diploma.nomoredomains.rocks',
      'http://diploma.nomoredomains.rocks',
      'https://localhost:3000',
      'http://localhost:3000'],
  }),
);

app.use(limiter);

app.use(helmet());

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(centralErrorСontroller);

app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});
