app.controller('mainController', ['$scope', '$http', 'MyService', '$location', '$window', '$rootScope', function($scope, $http, MyService, $location, $window, $rootScope){

   // socket.on('join', function(msg){
   //   $('#messages').append($('<li>').text(msg));
   // });

  $scope.view = {};
  $scope.view.checkmessage = function(id){
    MyService.messageRooms(id).then(function(data){
      $rootScope.room = data.data[0]['roomname'];
    })
  }
  $scope.view.grabchatusername = function(userid){
    // console.log($rootScope.user.id, userid);
    MyService.makeRoom($rootScope.user.id, userid).then(function(data){
      $rootScope.room = data.data;
      console.log($rootScope.room)
    })
    $location.path('/chat');
  }
  $scope.view.sendmsg = function(){
    console.log($rootScope.room);
    var socket=io();
     $('#chatting').submit(function(){
       socket.emit('chat message', {userschat: $rootScope.room, msg: $('#m').val()});
       $('#m').val('');
       return false;
     });
     socket.on('new_msg', function(msg){
       console.log('hi')
       $('#messages').append($('<li>').text(msg))
     })
  }
  $scope.view.userlat = localStorage.lat;
  $scope.view.userlong = localStorage.long;
  MyService.findUsers().then(function (data){
    $scope.view.users = data.data;
    var usersobjs = $scope.view.users;
    comparebands();
    function comparebands(){;
      var count = 0;
      for (var i = 0; i < usersobjs.length; i++) {
        var usersbandslist = usersobjs[i]['bandlist']
        for (var j = 0; j < usersbandslist.length; j++) {
          console.log(usersobjs[i]['username'], usersbandslist[j]);
        }
      }
    }

  })

  MyService.myBands().then(function(data){

    $scope.view.mylistbands = data.data;
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
