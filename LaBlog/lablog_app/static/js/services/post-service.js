/**
 * Service for handling post API calls.
 */
var postService = function($resource) {

  this.PostsApi_ = $resource(
      '/api/post/:user_name', {
          user_name: '@user_name'
        }, {
          'get': {method: 'Get'}});
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
    opt_user_name) {
  var name = angular.isDefined(opt_user_name) ?
      opt_user_name : null;
  this.PostApi_.get({user_name: name}, successCallback);
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


