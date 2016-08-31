'use strict';
require('dotenv').config();
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var GeoPoint = require('geopoint');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/users', function (req,res,next) {
  var wrapArr = [];
  knex('users').then(function(data){
    //json stuff here?
    var querierlat = parseFloat(data[0].latitude);
    var querierlong = parseFloat(data[0].longitude);
    var querierloc = new GeoPoint(querierlat, querierlong);



    for (var i = 0; i < data.length; i++) {
      var obj = {};
      var userlatitude = parseFloat(data[i].latitude);
      var userlongitude = parseFloat(data[i].longitude);
      var userlocation = new GeoPoint(userlatitude, userlongitude);
      var miles = querierloc.distanceTo(userlocation);
      if(miles < 50){
        var usersnames = data[i].username;
        var userids = data[i].id;
        obj.username = usersnames;
        obj.distance = miles;
        obj.userid = userids;
        wrapArr.push(obj);
      }
    }
    return wrapArr
  })
  .then(function(data){
    var promiseArr = [];
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i]);
      // console.log("initially is", i);
      promiseArr.push(
        knex('users_bands').where('user_id', data[i]['userid'])
              .fullOuterJoin('bands', 'bands.id', 'users_bands.band_id')
      )
    }
    return Promise.all(promiseArr);
  })
  .then(function(userbands){
    // console.log(userbands);
    for (var i = 0; i < userbands.length; i++) {
      var currentUser = wrapArr[i];
      currentUser.bandlist = [];
      for (var j = 0; j < userbands[i].length; j++) {
        currentUser.bandlist.push(userbands[i][j]['name']);
      }
      // console.log(currentUser);
    }
    console.log(wrapArr);
    res.json(wrapArr)
  })
});
module.exports = router;
