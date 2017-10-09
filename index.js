var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var jwt        = require('jsonwebtoken');

var config     = require('./config');
var routes     = require('./routes');
// var User       = require('./models/user');

mongoose.connect(config.database);      // Setting mongoose
app.set('secretKey', config.segretKey); // Setting jwt secretKey

// Using bodyParser to get info from POST and URL params
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Using morgan to log requests
app.use(morgan('dev'));

// Linking the router
app.use('/', routes);

app.use(function(request, response, next) {
    var err = new Error('Noooooot Found');
    err.status = 404;
    next(err);
});

var server = app.listen(config.port, function() {
    console.log("Express server listening on port " + server.address().port);
});
