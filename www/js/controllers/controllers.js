app.controller('mainController', ['$scope', '$http', 'MyService', function($scope, $http, MyService){

  $scope.view = {};
  MyService.findUsers().then(function (data){
    console.log(data);
    $scope.view.users = data.data;
  })
}])
