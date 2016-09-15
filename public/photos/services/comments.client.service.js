/**
 * Created by moritz on 12.09.16.
 */
angular.module('photos')
    .factory('Comments', ['$resource',
        function ($resource) {
            return $resource('api/comments/:commentThreadId', {
                commentThreadId: '@_id'
            }, {
                update: {
                    method: 'PUT',
                    data: {
                        newComment: '@newComment',
                        parentCommentId: '@parentCommentId',
                        isArray: false
                    }
                }
            });
}]);