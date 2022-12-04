const express = require('express');
const morgan = require('morgan');
//const cors = require('cors');

const commentRouter = require('./routes/comments');

const PORT = process.env.PORT || 7000;
const HOST_NAME = 'localhost';

const app = express();

app.use(morgan('dev'));
//app.use(cors());

app.use('/comments', commentRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});