app.controller('mainController', ['$scope', '$http', 'MyService', '$location', '$window', '$rootScope', function($scope, $http, MyService, $location, $window, $rootScope){

   // socket.on('join', function(msg){
   //   $('#messages').append($('<li>').text(msg));
   // });

  $scope.view = {};
  $scope.view.grabchatusername = function(username){
    $rootScope.chatwith = username;
    console.log('chatting with',$rootScope.chatwith);
    $location.path('/chat');
  }
  $scope.view.sendmsg = function(){
    var socket=io();
     $('#chatting').submit(function(){
       socket.emit('chat message', {userschat: $rootScope.user.username + $rootScope.chatwith, msg: $('#m').val()});
       $('#m').val('');
       return false;
     });
     socket.on('new_msg', function(msg){
       console.log('hi')
       $('#messages').append($('<li>').text(msg))
     })
  }
  $scope.view.russia = "russia"
  $scope.view.userlat = localStorage.lat;
  $scope.view.userlong = localStorage.long;
  MyService.findUsers().then(function (data){
    $scope.view.users = data.data;
  })

  MyService.myBands().then(function(data){
    $scope.view.mybands = data.data;
  })

  $scope.view.addmyband = function(id){
    MyService.findBands(id, $scope.view.myband).then(function(data){
      $scope.view.bands = data.data;
    })
  }

  $scope.view.logIn = function() {
    MyService.logIn($scope.view.username, $scope.view.password).then(function (res) {
      if(res.data.errors){
        $scope.view.error = res.data.errors;
      }
      else{
        localStorage.jwt = res.data.token;
        $location.path('/landing');
        $window.location.reload();
      }
    });
  }

  $scope.view.signup = function(){
    MyService.signup($scope.view.usernamesignup, $scope.view.passwordsignup, $scope.view.userlat, $scope.view.userlong).then(function(res){
      if(res.data.errors){
        $scope.view.error = res.data.errors;
      } else {
        localStorage.jwt = res.data.token;
        $location.path('/landing');
        $window.location.reload();
      }
    })
  }
  $scope.view.logout = function() {
    localStorage.clear();
    $location.path('/');
    $window.location.reload();
  }
}]);
