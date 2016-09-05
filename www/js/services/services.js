app.factory('MyService', function($http, $location){
  return {
    findUsers: function(){
      return $http.get('/api/users')
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
    signup: function(username, password){
      var newUser = {};
      newUser.username = username.toLowerCase();
      newUser.password = password;
      return $http.post('/signup', newUser)
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
