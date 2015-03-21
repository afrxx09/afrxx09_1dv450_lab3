(function() {
	'use strict';

	angular
	.module('app')
	.controller('tagsController',TagsController)
	.controller('tagController',TagController);

	TagsController.$inject = ['$scope', 'tagService'];
	function TagsController($scope, tagService) {
		tagService.getTags()
		.success(function(data){
			$scope.tags = data.tags;
		})
		.error(function(){
			
		});
	}
	
	TagController.$inject = ['$scope', '$stateParams', 'tagService'];
	function TagController($scope, $stateParams, tagService) {
		tagService.getTag($stateParams.id)
		.success(function(data){
			$scope.tag = data;
		})
		.error(function(){
			
		});
	}
})();