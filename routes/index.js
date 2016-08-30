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
  knex('users').then(function(data){
    //json stuff here?
    var querierlat = parseFloat(data[0].latitude);
    var querierlong = parseFloat(data[0].longitude);
    var querierloc = new GeoPoint(querierlat, querierlong);

    var wrapArr = [];

    for (var i = 0; i < data.length; i++) {
      var obj = {};
      var userlatitude = parseFloat(data[i].latitude);
      var userlongitude = parseFloat(data[i].longitude);
      var userlocation = new GeoPoint(userlatitude, userlongitude);
      var miles = querierloc.distanceTo(userlocation);
      var usersnames = data[i].username;
      var userids = data[i].id;
      if(miles < 50){
        obj.username = usersnames;
        obj.distance = miles;
        obj.userid = userids;
        wrapArr.push(obj);
      } else {
        return 'no matches in your area'
      }
    }
    return wrapArr
  })
  .then(function(data){
    // console.log(data);
    var storeArr = [];
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i]);

      let tempData = data[i];
      // console.log(tempData);
       knex('users_bands').where('user_id', data[i]['userid'])
        .fullOuterJoin('bands', 'bands.id', 'users_bands.band_id')
        .then(function(info) {
          // console.log(tempData);
          // console.log('data[i]', data[i]);
          // console.log(info);
          var tempArr = [];

          for (var j = 0; j < info.length; j++) {
            tempArr.push(info[j]['name']);
          }
          // console.log(tempData);
          tempData.bandNames = tempArr;
          // console.log(tempArr);
          storeArr.push(tempData);
          console.log("i is", i);
          if (i === data.length - 1) {
            console.log(storeArr);
            res.json(storeArr);
          }
        })
        // data[i].bandNames = bandArr;
        // console.log(tempArr);
    }
  })
});
module.exports = router;
