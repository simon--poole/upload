//dev config
require('dotenv')
	.config({
		silent: false
	});
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('bristol');
logger.addTarget('console')
	.withFormatter('human');

var app = express();

// Logging setup
var routes = require('./app/routes');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'assets', 'img', 'rocket.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
	logger.error(err);
	if(process.env.NODE_ENV == "development")
  		res.json(err);
	else if(err.status = 404)
		res.sendStatus('404');
	else res.sendStatus('503');
});

app.listen(process.env.PORT || 5000);
logger.info('App Listening on localhost:'+ (process.env.PORT || 5000));
module.exports = app;
