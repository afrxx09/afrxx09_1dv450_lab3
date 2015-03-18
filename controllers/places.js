(function() {
	'use strict';

	angular
	.module('app')
	.controller('placesController', PlacesController);

	PlacesController.$inject = ['$scope'];
	function PlacesController($scope) {
		$scope.items = ['q', 'w', 'e'];
	}
})();