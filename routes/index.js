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
    querierloc = new GeoPoint(querierlat, querierlong);

    var obj = {};
    var wrapArr = [];

    for (var i = 0; i < data.length; i++) {
      var userlatitude = parseFloat(data[i].latitude);
      var userlongitude = parseFloat(data[i].longitude);
      userlocation = new GeoPoint(userlatitude, userlongitude);
      var miles = querierloc.distanceTo(userlocation);
      var usersnames = data[i].username;
      if(miles < 50){
        userNameArr.push(usersnames);
        milesArr.push(miles);
        userInfoArr.push(data[i]);
        obj.usersNames = userNameArr;
        obj.distance = milesArr;
        obj.usersInfo = userInfoArr;
      } else {
        return 'no matches in your area'
      }
    }
    // console.log('line 35', obj);
    // console.log(userInfoArr);
    // console.log(obj);
    return obj
  })
  .then(function(data){
    var bandArr = [];
    // console.log(data);
    // console.log(obj);
    for (var i = 0; i < data['usersInfo'].length; i++) {
      knex('users_bands').where('user_id', data['usersInfo'][i].id)
        .fullOuterJoin('bands', 'bands.id', 'users_bands.band_id').then(function(info){
          // console.log(info);
        });
    }
    res.json('hi');
  //  var usermatched = data;
  //   knex('users_bands').where('user_id', data.id)
  //     .fullOuterJoin('bands', 'bands.id', 'users_bands.band_id').then(function(info) {
  //       var arr = [];
  //     for (var i = 0; i < info.length; i++) {
  //       arr.push(info[i].name);
  //     }
  //     console.log(usermatched.username);
  //     res.json("You matched with " + usermatched.username + " and you share these bands in common " + arr);
  //   });
  });
});
module.exports = router;
