/**
 * Service for handling post API calls.
 */
var postService = function($resource) {

  this.PostApi_ = $resource(
      '/api/post/:post_id', {
          post_id: '@post_id'
        }, {
          'create': {method: 'Post'},
          'get': {method: 'Get'},
          'update': {method: 'Put'}});
};

/**
 * Name used for Dependency injector.
 */
postService.NG_NAME = "PostApi";


/**
 * Module used by AngularJS dependency injector.
 *
 */
postService.NG_MODULE = angular.module(postService.NG_NAME,
    [postService.NG_NAME]).
    directive(postService.NG_NAME, postService);

    
/**
 * Gets tickets of the given status if status is given,
 * all tickets otherwise.
 */
postService.prototype.getPosts = function(successCallback,
    opt_ticketStatus) {
  var ticketStatus = angular.isDefined(opt_ticketStatus) ?
      opt_ticketStatus : '';
  this.PostApi_.getTickets({status: ticketStatus}, successCallback);
};


/**
 * Creates new post.
 */
postService.prototype.createPost = function(request,
    successCallback, errorCallback) {
  this.TicketApi_.create(request, successCallback,
      errorCallback);
};


/**
 * Updatess existing post.
 */
postService.prototype.updatePost = function(postId,
    request, successCallback, errorCallback) {
  this.TicketApi_.update({post_id: postId}, request, successCallback,
      errorCallback);
};


/**
 * Gets the post with the given id..
 */
postService.prototype.getPost = function(postId,
    successCallback, errorCallback) {
  this.TicketApi_.get({post_id: postId}, successCallback,
      errorCallback);
};


