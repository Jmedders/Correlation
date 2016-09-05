app.controller('mainController', ['$scope', '$http', 'MyService', '$location', '$window', function($scope, $http, MyService, $location, $window){

  $scope.view = {};
  MyService.findUsers().then(function (data){
    $scope.view.users = data.data;
  })

  $scope.view.logIn = function() {
    MyService.logIn($scope.view.username, $scope.view.password).then(function (res) {
      if(res.data.errors){
        console.log('hi');
        $scope.view.error = res.data.errors;
      }
      else{
        console.log('hi');
        localStorage.jwt = res.data.token;
        $location.path('/landing');
        $window.location.reload();
      }
    });
  }

  $scope.view.logout = function() {
    localStorage.clear();
    $location.path('/');
    $window.location.reload();
  }
}]);
