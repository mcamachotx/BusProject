/**
 * Created by Sara M on 2/5/2017.
 */
(function (){
        angular
        .module('BusApp')
        .directive('directionalPanel', directionalPanel);

        directionalPanel.$inject = [];

        function directionalPanel()
        {
            return {
                restrict: 'E',
                templateUrl: "views/directionalPanel.template.html",
                controller: "MainController"
            }
        }
})();