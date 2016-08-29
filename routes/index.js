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
    var arr = [];
    for (var i = 0; i < data.length; i++) {

      var userlatitude = parseFloat(data[i].latitude);
      var userlongitude = parseFloat(data[i].longitude);
      // userlatitude = parseFloat(userlatitude);
      // userlongitude = parseFloat(userlongitude);
      userlocation = new GeoPoint(userlatitude, userlongitude);
      console.log(querierloc.distanceTo(userlocation));
      if(querierloc.distanceTo(userlocation) < 50){
        arr.push(data[i]);
      };
      // console.log('line 24', userlocation);
    };
    console.log('line 34', arr.length);
    res.json(arr)
    // console.log(typeof userlatitude, typeof userlongitude);
    // // userlocation = new GeoPoint(39.6242, -105.2620);
    // user2location = new GeoPoint(39.8915, -105.2839);
    // console.log('line30 here', userlocation, user2location);
    // var miles = userlocation.distanceTo(user2location);
    // if (miles < 50) return data[1];
    // else if(miles > 50){
    //   console.log('no matches');
    //   res.json(userlatitude);
    // }
  })
  // }).then(function(data){
  //   var usermatched = data;
  //   knex('users_bands').where('user_id', data.id)
  //     .fullOuterJoin('bands', 'bands.id', 'users_bands.band_id').then(function(info) {
  //       var arr = [];
  //     for (var i = 0; i < info.length; i++) {
  //       arr.push(info[i].name);
  //     }
  //     console.log(usermatched.username);
  //     res.json("You matched with " + usermatched.username + " and you share these bands in common " + arr);
  //   });
  // });
});
module.exports = router;
