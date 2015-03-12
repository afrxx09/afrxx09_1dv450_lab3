(function() {
	'use strict';

	angular
	.module('TattooMap')
	.controller('PlacesController',PlacesController);

	PlacesController.$inject = ['$scope'];

	function PlacesController($scope) {
		$scope.items = ['q', 'w', 'e'];
	}
})();