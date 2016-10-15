app.factory('MyService', function($http, $location){
  return {
    findUsers: function(){
      return $http.get('/api/users')
    },
    myBands: function(){
      return $http.get('/mybands')
    },
    messageRooms: function(id){
      console.log(id);
      var messageobj = {};
      messageobj.myid = id;
      return $http.post('/messages', messageobj)
    },
    makeRoom: function(user1, user2){
      var chatobj = {};
      chatobj.user1 = user1;
      chatobj.user2 = user2;
      return $http.post('/newchat', chatobj)
    },
    findBands: function(owner_id, band){
      var newBandRelation = {};
      newBandRelation.owner_id = owner_id;
      newBandRelation.addedband = band;
      console.log('hi about to go to route');
      return $http.post('/api/bands', newBandRelation)
    },
    logIn: function(username, password){
      var user = {};
      user.username = username;
      user.password = password;
      return $http.post('/login', user)
    },
    signup: function(username, password, userlat, userlong){
      var newUser = {};
      newUser.username = username.toLowerCase();
      newUser.password = password;
      newUser.lat = userlat;
      newUser.long = userlong;
      return $http.post('/signup', newUser)
    },
    tunes: function(bandName){
      console.log(bandName);
      if(!bandName){
          bandName = "Slowdive"
      }
      return $http.get('https://api.spotify.com/v1/search?query=' + bandName + '&offset=0&limit=20&type=artist')
    }
  }
})
app.service("cordovaInterceptor", function cordovaInterceptor() {
  return {
    request: function(config){
      // console.log(localStorage.jwt);
      if (localStorage.jwt) {
        config.headers.Authorization = 'Bearer ' + localStorage.jwt;
      }
      return config;
    }
  }
})
