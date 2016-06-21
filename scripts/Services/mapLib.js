/**
 * Created by Miguel on 5/13/2016.
 */
var mapLib = angular.module('mapLib', []);
mapLib.factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
}]);