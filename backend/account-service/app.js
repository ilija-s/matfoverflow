const express = require('express');
const userRouter = require('./routes/account');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const {json, urlencoded} = require('body-parser');

const app = express();

app.use(cors());
app.use(morgan('dev'));

const databaseString =
  process.env.DB_STING || 'mongodb://localhost:27017/users';
  
mongoose.connect(databaseString, {
useNewUrlParser: true,
useUnifiedTopology: true,
});

mongoose.connection.once('open', function () {
console.log('Uspesno povezivanje!');
});

mongoose.connection.on('error', (error) => {
console.log('Greska: ', error);
});
  
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/users', userRouter);

module.exports = app;


