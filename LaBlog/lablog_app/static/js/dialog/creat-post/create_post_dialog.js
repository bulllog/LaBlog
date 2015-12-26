/**
 *  Controller for dialog to create new ticket.
 */
var createTicketDialogCtrl = function($scope, $mdDialog,
    $window, ticket, TicketsApi) {
 
  this.scope_ = $scope;

  // Form will be in edit mode by default.
  this.scope_.isNew = false;

  this.ticketsApi_ = TicketsApi;
  
  this.mdDialog_ = $mdDialog;
  
  this.scope_.ticket = angular.isUndefined(ticket)?
      this.createEmptyTicket() : ticket;
  
  this.scope_.cancel = function() {
    $mdDialog.cancel();
  };
  
  // Handler for form submit.
  this.scope_.submit = angular.bind(this, this.submit_, $window);
  this.scope_.isSubmit = angular.bind(this, this.isSubmit_);
};


/** Name used by AngularJS dependency injector. */
createTicketDialogCtrl.NG_NAME = 'createTicketDialogCtrl';


/**
 * Handler for submit the ticket form.
 */
createTicketDialogCtrl.prototype.submit_ = function($window) {
  if(this.scope_.isNew) {
    
    this.scope_.ticket.status =
        (this.scope_.ticket.assigned_to == null) ? "new" : "open";

    this.ticketsApi_.createTicket(this.scope_.ticket,
      angular.bind(null, function($window, response) {
        console.log("Ticket successfully created");
        $window.location.reload();
    }, $window), function(response) {
      console.log("Ticket creation failed");
    })
  } else {
    var request = {};
    if (this.scope_.ticket.assigned_to != "") {
      request["status"] = "open";
      request["assigned_to"] = this.scope_.ticket.assigned_to;
    } else {
      request["status"] = "new";
    }
    request["comments"] = this.scope_.ticket.comments;
    this.ticketsApi_.updateTicket(this.scope_.ticket.ticket_no,
        request, angular.bind(null, function($window, response) {
      $window.location.reload();
      console.log("Ticket successfully updated");
    }, $window), function() {
      console.log("Ticket updation failed");
    });
  }
  this.mdDialog_.hide();
};


/**
 * Return true if all the required info for ticket is field.
 */
createTicketDialogCtrl.prototype.isSubmit_ = function() {
  if(this.scope_) {
    var ticket = this.scope_.ticket;
    return ((ticket.status == "close") || !(ticket.summary && ticket.created_by &&
        ticket.customer_info.name && ticket.customer_info.email_id));
  }
};

