require('dotenv').config();
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/users', function (req,res,next) {
  knex('users').then(function(data){
    res.json(data);
  });
});
module.exports = router;
