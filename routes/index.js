'use strict';
require('dotenv').config();
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');
var bcrypt = require('bcrypt');
var token;
var errors;
var GeoPoint = require('geopoint');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next){
  knex('users')
  .where({
    username: req.body.username
  })
  .first()
  .then(function(data){
    if(!data){
      console.log('hi no data');
      res.json({errors: 'username or password is incorrect'})
    } else if(bcrypt.compareSync(req.body.password, data.password)){
      console.log('line 30', data);
      token = jwt.sign({id: data.id, username: data.username, userlat: data.latitude, userlong: data.longitude}, process.env.SECRET);
      res.json({token:token});
      console.log("token is: ", token);
    } else {
      res.json({errors: 'username or password is incorrect'})
    }
  }).catch(function(err){
    next(err);
  })
})

router.get('/api/users', function (req,res,next) {

  var wrapArr = [];
  knex('users').then(function(data){
    //json stuff here?
    var decoder = jwt.decode(req.token);
    var originlat = parseFloat(decoder.userlat);
    var originlong = parseFloat(decoder.userlong);
    var originid = decoder.id;

    var querierlat = originlat;
    var querierlong = originlong;
    var querierloc = new GeoPoint(querierlat, querierlong);



    for (var i = 0; i < data.length; i++) {
      var obj = {};
      var userlatitude = parseFloat(data[i].latitude);
      var userlongitude = parseFloat(data[i].longitude);
      var userlocation = new GeoPoint(userlatitude, userlongitude);
      var miles = querierloc.distanceTo(userlocation);
      if(miles < 50 && originid !== data[i].id){
        var usersnames = data[i].username;
        var userids = data[i].id;
        obj.username = usersnames;
        obj.distance = Math.floor(miles);
        obj.userid = userids;
        wrapArr.push(obj);
      }
    }
    return wrapArr
  })
  .then(function(data){
    var promiseArr = [];
    for (let i = 0; i < data.length; i++) {
      promiseArr.push(
        knex('users_bands').where('user_id', data[i]['userid'])
              .fullOuterJoin('bands', 'bands.id', 'users_bands.band_id')
      )
    }
    return Promise.all(promiseArr);
  })
  .then(function(userbands){
    for (var i = 0; i < userbands.length; i++) {
      var currentUser = wrapArr[i];
      currentUser.bandlist = [];
      for (var j = 0; j < userbands[i].length; j++) {
        currentUser.bandlist.push(userbands[i][j]['name']);
      }
    }
    res.json(wrapArr)
  })
});
module.exports = router;
