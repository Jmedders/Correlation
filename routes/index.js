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
    for (var i = 0; i < data.length; i++) {
      var userlatitude = data[1].latitude;
      var userlongitude = data[1].longitude;
      userlatitude = parseFloat(userlatitude).toFixed(6);
      userlongitude = parseFloat(userlongitude).toFixed(6);
      console.log(userlatitude, userlongitude);

      // userlocation = new GeoPoint(userlatitude, userlongitude);
      // console.log(userlocation);

    };
    userlocation = new GeoPoint(39.6242, -105.2620);
    user2location = new GeoPoint(39.8915, -105.2839);
    var miles = userlocation.distanceTo(user2location);
    console.log(miles.toFixed(1));
    res.json(userlatitude);
  });
});
module.exports = router;
