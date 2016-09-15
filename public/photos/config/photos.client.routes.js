/**
 * Created by moritz on 15.09.16.
 */
angular.module('photos')
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/photos', {
            templateUrl: '/photos/views/photos-list.client.view.html'
        })
        .otherwise({
            redirectTo: '/photos'
    });
}]);