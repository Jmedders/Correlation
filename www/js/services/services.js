app.factory('MyService', function($http, $location){
  return {
    findUsers: function(){
      return $http.get('/api/users')
    }
  }
})
