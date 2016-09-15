/**
 * Created by moritz on 12.09.16.
 */
angular.module('photos').controller('PhotoController', [
    '$scope',
    '$http',
    '$location',
    'Comments',
    'Authentication',
    'Upload',
    '$timeout',
    function($scope, $http, $location, Comments, Authentication, Upload, $timeout) {
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

        $scope.uploadPic = function(file) {
            file.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {username: $scope.authentication.user, file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    }]);