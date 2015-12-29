/**
 * Intialize app.
 */
var lablogApp = angular.module('lablogApp', [
  'ngMaterial',
  'ngMdIcons',
  'ngRoute',
  'ngResource',
  postTile.NG_NAME]);


/**
 * Controller list.
 */
var ControllerList = [lablogCtrl, homeCtrl, aboutCtrl, contactCtrl, postCtrl, userCtrl, createPostDialogCtrl];


/**
 * Adding Controllers.
 */
angular.forEach(ControllerList,
  function(ctrl) {
    lablogApp.controller(ctrl.NG_NAME, ctrl);
  });


/**
 * Adding Services.
 */
//lablogApp.service();


/**
 * Configures the angular module.
 */
lablogApp.ngConfigure = function($locationProvider, $routeProvider,
     $interpolateProvider) {
  // Configure application deep linking path.
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  // Configure template for path.
  $routeProvider.when('/', {
    'controller': homeCtrl,
    'templateUrl': '/static/templates/home.ng'
  }).when('/about_us', {
    'controller': aboutCtrl,
    'templateUrl': 'static/templates/about_us.ng'
  }).when('/contact_us', {
    'controller': contactCtrl,
    'templateUrl': 'static/templates/contact_us.ng'
  }).when('/post', {
    'controller': postCtrl,
    'templateUrl': 'static/templates/post_page.ng'
  }).when('/user', {
    'controller': userCtrl,
    'templateUrl': 'static/templates/home.ng'
  });

  // Change the Angular JS native notation of {{ }} because it conflict with
  // Django.
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
};



lablogApp.config(lablogApp.ngConfigure);


