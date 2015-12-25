/**
 * Controller for about us page.
 */
var aboutCtrl = function($scope, $mdDialog) {
  this.scope_ = $scope;

  // Set header, sub header and background.
  this.scope_.$parent.setHeader(Constants.about.header);
  this.scope_.$parent.setSubHeader(Constants.about.subHeader);
  this.scope_.$parent.setBackground(Constants.about.background);
};

/** Name used by Angular JS dependency injector. */
aboutCtrl.NG_NAME = 'aboutCtrl';




