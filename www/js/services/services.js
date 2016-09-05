app.factory('MyService', function($http, $location){
  return {
    findUsers: function(){
      return $http.get('/api/users')
    },
    logIn: function(username, password){
      var user = {};
      user.username = username;
      user.password = password;
      return $http.post('/login', user)
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
