(function() {
	'use strict';

	angular
	.module('app')
	.controller('tagsController',TagsController);

	TagsController.$inject = ['$scope'];

	function TagsController($scope) {
		$scope.items = ['x', 'y', 'z'];
	}
})();