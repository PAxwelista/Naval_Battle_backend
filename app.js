var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config()

var pushersRouter = require('./routes/pusher');
const { env } = require('process');

var app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/pusher', pushersRouter);

module.exports = app;
