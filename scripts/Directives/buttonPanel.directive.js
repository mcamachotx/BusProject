/**
 * Created by Sara M on 2/5/2017.
 */
/**
 * Created by Sara M on 2/5/2017.
 */
(function (){
    angular
        .module('BusApp')
        .directive('buttonPanel', buttonPanel);

    buttonPanel.$inject = [];

    function buttonPanel()
    {
        return {
            restrict: 'E',
            templateUrl: "views/buttonPanel.template.html",
            controller: "MainController"
        }
    }
})();