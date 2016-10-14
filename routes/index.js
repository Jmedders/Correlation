'use strict';
require('dotenv').config({silent:true});
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

router.post('/signup', function(req, res, next){
  var password = bcrypt.hashSync(req.body.password, 8);
  console.log('my latitude', req.body.lat);
  console.log('my longitude', req.body.long);
  knex('users')
  .where({
    username: req.body.username
  })
  .then(function(data) {
    if(data.length > 0){
      res.json({errors: "username is already taken"});
    }
    else {
      knex('users')
      .insert({
        username: req.body.username,
        password: password,
        latitude: req.body.lat,
        longitude: req.body.long
      }).returning("*")
      .then(function(user){
        token = jwt.sign({ id: user[0].id, username: user[0].username, userlat: user[0].latitude, userlong: user[0].longitude}, process.env.SECRET);
        console.log(token);
        res.json({token:token});
      }).catch(function(err){
        console.log(err);
      });
    }
  });
})

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

router.get('/mybands', function(req,res,next){
  var decoder = jwt.decode(req.token);
  var user_id = decoder.id;
  var mybandarr = [];
  knex('users_bands').where('user_id', user_id)
        .fullOuterJoin('bands', 'bands.id', 'users_bands.band_id')
    .then(function(data){
      for (var i = 0; i < data.length; i++) {
        mybandarr.push(data[i]['name']);
      }
      res.json(mybandarr);
    }).catch(function(err){
      console.log(err);
      res.json(err);
    })
});

router.post('/api/bands', function(req,res,next){
  var userbandobj = {};
  var owner_id =  req.body.owner_id;
  userbandobj.id = owner_id
  var band_name = req.body.addedband.toLowerCase();
  var bandidArr = [];
  knex('bands').then(function(data){
    for (var i = 0; i < data.length; i++) {
      if(band_name == data[i]['name']){
        console.log('hi youre in the if');
        bandidArr.push(data[i]['id']);
        userbandobj.bandsid = bandidArr;
        break;
      } else if(band_name != data[i]['name'] && i == data.length-1){
        console.log('inserting','id is:', i+2);
        bandidArr.push(i+2)
        userbandobj.bandsid = bandidArr;
        knex('bands').insert({
          name: band_name
        }).then(function(data){
          console.log('in else', userbandobj);
        }).catch(function(err){
          console.log(err);
        })
      }
    }
    return userbandobj;
  }).then(function(info){
    console.log(info.id);
    console.log(info.bandsid[0]);
    knex('users_bands').insert({
      user_id: info.id,
      band_id: info.bandsid[0]
    }).then(function(){
      res.redirect("/#/dashboard")
    }).catch(function(err){
      console.log(err);
    })
  }).catch(function(err){
    console.log(err);
  })
})

router.post('/newchat', function(req,res,next){
  var firstuser = req.body.user1;
  var seconduser = req.body.user2;
  console.log(firstuser, seconduser);
  var roomname = firstuser + "_" + seconduser;
  knex('convos').insert({
    roomname: roomname,
    user_id: firstuser,
    user_id2: seconduser
  }).then(function(data){
    console.log('inserted', data);
    res.json(roomname);
  }).catch(function(err){
    res.json(roomname)
  })
})

router.post('/messages', function(req,res,next){
  var myid = req.body.myid;
  knex('convos').where('user_id', myid).orWhere('user_id2', myid)
  .then(function(data){
    res.json(data)
  })
});

router.get('/api/users', function (req,res,next) {
  var wrapArr = [];
  knex('users').then(function(data){
    //json stuff here?
    var decoder = jwt.decode(req.token);
    var originlat = parseFloat(decoder.userlat);
    var originlong = parseFloat(decoder.userlong);
    console.log("line 164:", originlat, originlong);
    var originid = decoder.id;

    var querierlat = originlat;
    var querierlong = originlong;
    var querierloc = new GeoPoint(querierlat, querierlong);
    console.log("line 170", querierloc);
    console.log('line 171: ');
    for (var i = 0; i < data.length; i++) {
      var obj = {};
      var userlatitude = parseFloat(data[i].latitude);
      var userlongitude = parseFloat(data[i].longitude);
      var userlocation = new GeoPoint(userlatitude, userlongitude);
      var miles = querierloc.distanceTo(userlocation);
      if(miles < 50 && originid !== data[i].id){
        console.log('entering miles', miles);
        var usersnames = data[i].username;
        var userids = data[i].id;
        obj.username = usersnames;
        obj.distance = Math.floor(miles);
        obj.userid = userids;
        obj.count = 0;
        wrapArr.push(obj);
      }
    }
    console.log('line 187', wrapArr);
    return wrapArr
  })
  .then(function(data){
    // console.log(data);
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
    console.log('line 208: ', wrapArr);
    res.json(wrapArr)
  }).catch(function(err){
    console.log('line 214', err)
    return err;
  })
});
module.exports = router;
