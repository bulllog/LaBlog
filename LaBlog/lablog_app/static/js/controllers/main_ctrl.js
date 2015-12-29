/**
 * Main Controller.
 */
var lablogCtrl = function($scope, $mdDialog) {
  this.scope_ = $scope;

  this.scope_.header = null;
  this.scope_.subHeader = null;
  this.scope_.background = null;

  // Bind all the function on scope.
  this.scope_.setHeader = angular.bind(this, this.setHeader);
  this.scope_.setSubHeader = angular.bind(this, this.setSubHeader);
  this.scope_.setBackground = angular.bind(this, this.setBackground);

  $scope.openDialogCreatePost = function($event, post) {
    $mdDialog.show({
        controller: createPostDialogCtrl,
        templateUrl: 'static/js/dialog/create-post/create_post_dialog.ng',
        targetEvent: $event,
        locals: {
          post: post
        }
      })
      .then(function(answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      });
  };

};

/** Name used by Angular JS dependency injector. */
lablogCtrl.NG_NAME = 'lablogCtrl';


/**
 * Sets the header according to the related page.
 * @param (String) header Header
 */
lablogCtrl.prototype.setHeader = function (header) {
  this.scope_.header = header;
};

/**
 * Sets the sub header according to the related page.
 * @param (String) subHeader Sub header
 */
lablogCtrl.prototype.setSubHeader = function (subHeader) {
  this.scope_.subHeader = subHeader;
};

/**
 * Sets the background pic according to the related page.
 * @param (String) background Sub header
 */
lablogCtrl.prototype.setBackground = function(background) {
  this.scope_.background = background;
};

