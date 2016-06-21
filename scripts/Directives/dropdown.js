/**
 * Created by Miguel on 6/20/2016.
 */
var BusApp = angular.module("BusApp", []);

BusApp.directive("dropdown", function() {
    return {
        restrict: "E",
        replace: true,
        template: 'Name:  Address: '
    };
});