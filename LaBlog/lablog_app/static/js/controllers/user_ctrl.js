/**
 * User Controller.
 */
var userCtrl = function($scope, $mdDialog) {
  this.scope_ = $scope;

  this.scope_.posts = null;

  this.user = {
    "name": "Pankaj Kumar",
    "about": "I am just another guy.",
    "background": "user-bg.jpg"
  };
  // Set header, sub header and background.
  this.scope_.$parent.setHeader(this.user.name);
  this.scope_.$parent.setSubHeader(this.user.about);
  this.scope_.$parent.setBackground(this.user.background);

  // Load posts.
  this.loadPosts();
};

/** Name used by Angular JS dependency injector. */
userCtrl.NG_NAME = 'userCtrl';

userCtrl.prototype.loadPosts = function () {
  this.scope_.posts = Constants.posts;
}


