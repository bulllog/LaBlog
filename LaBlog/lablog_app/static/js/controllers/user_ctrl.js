/**
 * User Controller.
 */
var userCtrl = function($scope, $mdDialog) {
  this.scope_ = $scope;

  this.scope_.posts = null;

  this.user = this.scope_.$parent.getUser();
  // Set header, sub header and background.
  this.scope_.$parent.setHeader(this.user.fields.name);
  this.scope_.$parent.setSubHeader(this.user.fields.about);
  this.scope_.$parent.setBackground(this.user.fields.background_image);

  // Load posts.
  this.loadPosts();
};

/** Name used by Angular JS dependency injector. */
userCtrl.NG_NAME = 'userCtrl';

userCtrl.prototype.loadPosts = function () {
  this.scope_.posts = Constants.posts;
}


