const express = require('express'),
    es6Renderer = require('express-es6-template-engine'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    // Routes
    indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users'),
    dogsRouter = require('./routes/dogs.js'),
    carsRouter = require('./routes/cars.js'),
    phonesRouter = require('./routes/phones.js'),
    ceosRouter = require('./routes/ceos.js'),

    app = express();

app.engine('html', es6Renderer);
app.set('views','./views');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dogs', dogsRouter);
app.use('/cars', carsRouter);
app.use('/phones', phonesRouter);
app.use('/ceos', ceosRouter);

module.exports = app;