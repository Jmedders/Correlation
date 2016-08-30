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

    var wrapArr = [];

    for (var i = 0; i < data.length; i++) {
      var obj = {};
      var userlatitude = parseFloat(data[i].latitude);
      var userlongitude = parseFloat(data[i].longitude);
      userlocation = new GeoPoint(userlatitude, userlongitude);
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
    for (var i = 0; i < data.length; i++) {
      console.log(i);
      var bandArr = [];
      knex('users_bands').where('user_id', data[i]['userid'])
        .fullOuterJoin('bands', 'bands.id', 'users_bands.band_id').then(function (info) {
          // console.log(data[i]);
          // for (var j = 0; j < info.length; j++) {
            console.log(info[3]['name']);
          // }
          console.log(bandArr);
        });
        // console.log(bandArr);
        data[i].bandNames = bandArr;
        console.log(data);
    }
    // console.log(data);
    res.json('hi');

    // [
    //   {
    //     username: '',
    //     userid: num,
    //     bandNames: [],
    //     distance:
    //   },
    //   {
    //     username: '',
    //     userid: num,
    //     bandNames: [],
    //     distance:
    //   }
    // ]
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
  });
});
module.exports = router;
