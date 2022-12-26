import express from 'express';
import morgan from 'morgan';
import {urlencoded, json} from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
//const cors = require('cors');

import commentRouter from './routes/comments';

const PORT : Number = 4001;
const HOST_NAME : String = 'localhost';

const app = express();

app.use(morgan('dev'));
app.use(urlencoded({extended: false}));
app.use(json());
//app.use(cors());

mongoose.connect('mongodb://localhost:27017/Comments');

app.use('/comments', commentRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});