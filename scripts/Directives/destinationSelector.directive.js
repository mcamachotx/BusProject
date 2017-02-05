/**
 * Created by Sara M on 2/5/2017.
 */
(function (){
    angular
        .module('BusApp')
        .directive('destinationSelector', destinationSelector);

    destinationSelector.$inject = [];

    function destinationSelector()
    {
        console.log('Testing');
        return {
            restrict: 'E',
            templateUrl: "views/destinationSelector.template.html",
            controller: "MainController"
        }
    }
})();