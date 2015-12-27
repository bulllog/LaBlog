/**
 *  Controller for dialog to create new post.
 */
var createPostDialogCtrl = function($scope, $mdDialog,
    $window) {

  this.scope_ = $scope;

  //this.postApi_ = PostApi;

  this.mdDialog_ = $mdDialog;

  this.scope_.post = this.createEmptyPost();

  this.scope_.cancel = function() {
    $mdDialog.cancel();
  };

  // Handler for form submit.
  this.scope_.submit = angular.bind(this, this.submit_, $window);
  this.scope_.isSubmit = angular.bind(this, this.isSubmit_);
};


/** Name used by AngularJS dependency injector. */
createPostDialogCtrl.NG_NAME = 'createPostDialogCtrl';


/**
 * Handler for submit the post form.
 */
createPostDialogCtrl.prototype.submit_ = function($window, status) {
  this.mdDialog_.hide();
};


/**
 * Return true if all the required info for post is field.
 */
createPostDialogCtrl.prototype.isSubmit_ = function() {
  if(this.scope_) {
    var post = this.scope_.post;
    return true;
  }
};


/**
 * Creates an empty tickets with null fields value.
 */
createPostDialogCtrl.prototype.createEmptyPost = function() {
  // TODO:: Find a better way of doing this.
  var newTicket = {};
  newTicket['header'] = null;
  newTicket['subheader'] = null;
  newTicket['status'] = null;
  newTicket['content'] = null;
  return newTicket;
};
