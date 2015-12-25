/**
 * Home Controller.
 */
var homeCtrl = function($scope, $mdDialog) {
  this.scope_ = $scope;

  this.scope_.posts = null;

  // Set header, sub header and background.
  this.scope_.$parent.setHeader(Constants.home.header);
  this.scope_.$parent.setSubHeader(Constants.home.subHeader);
  this.scope_.$parent.setBackground(Constants.home.background);

  // Load posts.
  this.loadPosts();
};

/** Name used by Angular JS dependency injector. */
homeCtrl.NG_NAME = 'homeCtrl';

homeCtrl.prototype.loadPosts = function () {
  this.scope_.posts = Constants.posts;
}
