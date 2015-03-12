(function() {
	'use strict';

	angular
	.module('TattooMap')
	.controller('HomeController',HomeController);

	HomeController.$inject = ['$scope'];

	function HomeController($scope) {
		console.log('HomeController');
	}
})();