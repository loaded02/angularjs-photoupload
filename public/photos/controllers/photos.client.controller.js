/**
 * Created by moritz on 12.09.16.
 */
angular.module('photos').controller('PhotoController', [
    '$scope',
    '$http',
    '$location',
    'Comments',
    'Authentication',
    function($scope, $http, $location, Comments, Authentication) {
        $scope.authentication = Authentication;

        $http.get('/api/photos')
            .success(function(data, status, headers, config) {
                $scope.photos = data;
                $scope.photo = $scope.photos[0];
                $scope.loadComments();
            })
            .error(function(data, status, headers, config) {
                $scope.photos = [];
            });

        $scope.loadComments = function(){
            $scope.commentThread = Comments.get({
                commentThreadId: $scope.photo.commentId
            });
        };

        $scope.update = function(parentCommentId, subject, body){
            /*dirty way to pass arguments newComment and parentCommentId into JSON Object ot server*/
            $scope.commentThread.newComment = new Comments({
                subject:subject,
                body:body
            });
            $scope.commentThread.parentCommentId = parentCommentId;

            $scope.commentThread.$update({
                commentThreadId: $scope.photo.commentId
            }, function () {
                $location.path('/');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
            $scope.loadComments();
        };

        $scope.setPhoto = function(photoId){
            $http.get('/api/photo', {params: {photoId: photoId}})
                .success(function(data, status, headers, config) {
                    $scope.photo = data;
                    $scope.loadComments();
                })
                .error(function(data, status, headers, config) {
                    $scope.photo = {};
                });
        };
    }]);