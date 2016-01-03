/**
 * Module used by AngularJS dependency injector.
 *
 */
var loginModule = angular.module("loginModule", ['ngResource', 'ngCookies', 'ngRoute']);

/**
 * Login Controller.
 */
var loginCtrl = function($scope, $resource, $cookies, $window) {
  this.scope_ = $scope;

  this.scope_.LoginResource_ = $resource(
    '/',
    null,
    {'save': {method: 'Post'}}
  );


  this.scope_.user = {
    "user_name": null,
    "password": null
  };

  this.scope_.signIn = function () {
    console.log("Singin");
    this.LoginResource_.save(this.user, function(response) {
      $cookies["auth_token"] = response["auth_token"];
      $window.location.reload();
    });
  }

};

/** Name used by Angular JS dependency injector. */
loginCtrl.NG_NAME = 'loginCtrl';



loginModule.controller(loginCtrl.NG_NAME, loginCtrl);
