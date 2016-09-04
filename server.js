require('dotenv').config();
var express = require('express');
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(bearerToken());

app.use(express.static('www'));

app.use('/', routes);
app.use('/users', users);

app.listen(3000);
