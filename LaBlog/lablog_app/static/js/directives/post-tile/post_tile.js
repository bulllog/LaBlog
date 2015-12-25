/**
 * Directive for tile to render the post info into tile form.
 *
 */
var postTile = function($window, $mdToast) {
  return {
    'restrict': 'EAM',
    'replace': true,
    'scope': {
      'post': '='
    },
    'templateUrl': postTile.TEMPLATE_URL_,
    'link': angular.bind(null, postTile.link_,
        $window, $mdToast)
  };
};

/**
 * Template URL for the directive.
 *
 */
postTile.TEMPLATE_URL_ =
    '/static/js/directives/post-tile/post-tile-template.ng';

/** Name used by AngularJS dependency injector. */
postTile.NG_NAME = 'postTile';


/**
 * Module used by AngularJS dependency injector.
 *
 */
postTile.NG_MODULE = angular.module(postTile.NG_NAME, []).
    directive(postTile.NG_NAME, postTile);


/**
 * Link function.
 */
postTile.link_ = function($window, $mdToast, $scope, element, attrs) {
};

