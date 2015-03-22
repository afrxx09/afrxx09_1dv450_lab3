(function() {
	'use strict';

	angular
	.module('app')
	.controller('tagsController',TagsController)
	.controller('tagController',TagController);

	TagsController.$inject = ['$scope', 'tagService', 'myMessages'];
	function TagsController($scope, tagService, myMessages){
		tagService.getTags()
		.success(function(data){
			$scope.tags = data.tags;
			setupPrevNext(data);
		})
		.error(function(){
			myMessages.error('Error getting tags.');
		});
		
		$scope.nextPage = function(){
			if($scope.nextDisabled != 'disabled'){
				$http.get($scope.nextURL)
				.success(function(data){
					$scope.places = data.places;
					setupPrevNext(data);
				});
			}
		};
		
		$scope.prevPage = function(){
			if($scope.prevDisabled != 'disabled'){
				$http.get($scope.prevURL)
				.success(function(data){
					$scope.places = data.places;
					setupPrevNext(data);
				});
			}
		};
		
		var setupPrevNext = function(data){
			$scope.prevDisabled = 'disabled';
			$scope.nextDisabled = 'disabled';
			if(data.prev){
				$scope.prevDisabled = '';
				$scope.prevURL = data.prev;
			}
			if(data.next){
				$scope.nextDisabled = '';
				$scope.nextURL = data.next;
			}
		}
	}
	
	TagController.$inject = ['$scope', '$stateParams', 'tagService'];
	function TagController($scope, $stateParams, tagService) {
		tagService.getTag($stateParams.id)
		.success(function(data){
			$scope.tag = data;
		})
		.error(function(){
			myMessages.error('Error getting tag.');
		});
	}
})();