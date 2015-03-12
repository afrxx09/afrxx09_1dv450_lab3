(function() {
	'use strict';

	angular
	.module('TattooMap')
	.controller('TagsController',TagsController);

	TagsController.$inject = ['$scope'];

	function TagsController($scope) {
		$scope.items = ['x', 'y', 'z'];
	}
})();