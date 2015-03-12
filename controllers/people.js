(function() {
	'use strict';

	angular
	.module('TattooMap')
	.controller('PeopleController',PeopleController);

	PeopleController.$inject = ['$scope'];

	function PeopleController($scope) {
		$scope.items = ['a', 'b', 'c'];
	}
})();