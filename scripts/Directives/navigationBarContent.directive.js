/**
 * Created by Sara M on 2/5/2017.
 */
(function (){
    angular
        .module('BusApp')
        .directive('navigationBarContentPanel', navigationBarContentPanel);

    navigationBarContentPanel.$inject = [];

    function navigationBarContentPanel()
    {
        return {
            restrict: 'E',
            templateUrl: "views/navigationBarContent.template.html",
            controller: "MainController"
        }
    }
})();