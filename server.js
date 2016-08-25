require('dotenv').config();
var express = require('express');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(express.static('www'));

app.use('/', routes);
app.use('/users', users);

app.listen(3000);
