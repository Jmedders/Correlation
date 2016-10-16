var app = angular.module('practiceCordovaApp', ['ngRoute', 'ngSanitize']);


app.config(function($routeProvider, $httpProvider){
  $httpProvider.interceptors.push('cordovaInterceptor')
  $routeProvider
    .when('/landing', {
      templateUrl: 'partials/landing.html',
      controller: 'mainController'
    })
    .when('/addaband', {
      templateUrl: 'partials/addaband.html',
      controller: 'mainController'
    })
    .when('/', {
      templateUrl: 'partials/intro.html',
      controller: 'mainController'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'mainController'
    })
    .when('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'mainController'
    })
    .when('/chat', {
      templateUrl: 'partials/chat.html',
      controller: 'mainController'
    })
});

app.run(function($rootScope, $location) {

  if (localStorage.jwt) {
    $rootScope.user = jwt_decode(localStorage.jwt);
    console.log("USER: " + $rootScope.user);
  }
});
