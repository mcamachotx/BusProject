/**
 * Created by Miguel on 4/19/2016.
 */
(function() {
	'use strict';
	var BusApp = angular.module('BusApp', ['ui.router']);

	BusApp.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state('home',{
				url:'/',
				templateUrl:'views/main.html',
				controller: 'MainController',
				controllerAs: 'MainController'
			});
	}]);
})();
