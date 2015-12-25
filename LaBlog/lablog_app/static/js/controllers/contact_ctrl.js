/**
 * Controller for contact us page.
 */
var contactCtrl = function($scope, $mdDialog) {
  this.scope_ = $scope;

  // Set header, sub header and background.
  this.scope_.$parent.setHeader(Constants.contact.header);
  this.scope_.$parent.setSubHeader(Constants.contact.subHeader);
  this.scope_.$parent.setBackground(Constants.contact.background);
};

/** Name used by Angular JS dependency injector. */
contactCtrl.NG_NAME = 'contactCtrl';





