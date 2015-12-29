/**
 * Post Controller.
 */
var postCtrl = function($scope, $mdDialog) {
  this.scope_ = $scope;

  this.scope_.post = null;

  // Set header, sub header and background.
  this.scope_.$parent.setHeader(Constants.posts[0].header);
  this.scope_.$parent.setSubHeader(Constants.posts[0].subHeader);
  this.scope_.$parent.setBackground(Constants.posts[0].background);

  // Load posts.
  this.loadPosts();
};

/** Name used by Angular JS dependency injector. */
postCtrl.NG_NAME = 'postCtrl';

postCtrl.prototype.loadPosts = function () {
  this.scope_.posts = Constants.posts;
}

