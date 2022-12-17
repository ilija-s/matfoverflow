const express = require('express');
const morgan = require('morgan');
const {urlencoded, json} = require('body-parser');
const mongoose = require('mongoose');
//const cors = require('cors');

const commentRouter = require('./routes/comments');

const PORT = process.env.PORT || 4001;
const HOST_NAME = 'localhost';

const app = express();

app.use(morgan('dev'));
app.use(urlencoded({extended: false}));
app.use(json());
//app.use(cors());

mongoose.connect("mongodb://localhost:27017/Comments", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/comments', commentRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});