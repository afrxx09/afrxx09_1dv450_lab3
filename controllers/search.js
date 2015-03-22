(function() {
	'use strict';

	angular
	.module('app')
	.controller('searchController', SearchController);

	SearchController.$inject = ['$scope'];
	function SearchController($scope) {
		$scope.query = '';
		$scope.search = function(){
			console.log($scope.query);	
		};
	}
})();