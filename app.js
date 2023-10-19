var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var wargameRouter = require('./routes/wargame');
var paintRouter = require('./routes/paint');
var figureRouter = require('./routes/figure');

var app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/wargame', wargameRouter);
app.use('/paint', paintRouter);
app.use('/figure', figureRouter);

module.exports = app;
