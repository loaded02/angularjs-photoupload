var app = angular.module('PhotoUpload' , ['ngResource', 'ngRoute', 'users', 'photos', 'ngFileUpload']);

app.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';
