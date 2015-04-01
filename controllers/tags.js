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
	
	TagController.$inject = ['$rootScope', '$scope', '$stateParams', 'tagService', 'eventService', 'myGoogleMap', 'myMessages'];
	function TagController($rootScope, $scope, $stateParams, tagService, eventService, myGoogleMap, myMessages) {
		tagService.getTag($stateParams.id)
		.success(function(data){
			$scope.tag = data;
			$rootScope.currentStateTitle = '#' + $scope.tag.tag;
			myGoogleMap.map.setZoom(6);
			eventService.getEventsByTagId($scope.tag.id)
			.success(function(data){
				$scope.events = data.events;
				for(var i = 0; i < $scope.events.length; i++){
					myGoogleMap.addMarker($scope.events[i].position.lat, $scope.events[i].position.lng);
					$scope.events[i].marker = myGoogleMap.markers[i];
				}
				myGoogleMap.placeMarkers();
			})
			.error(function(){
				myMessages.error('Error getting events.');
			});
			
		})
		.error(function(){
			myMessages.error('Error getting tag.');
		});
		
		$scope.showEvent = function(index){
			$scope.event = $scope.events[index];
			myGoogleMap.map.setCenter({lat: parseFloat($scope.event.position.lat), lng: parseFloat($scope.event.position.lng)});
			myGoogleMap.map.setZoom(12);
			
		}
		$scope.$on('$destroy', function(){
			myGoogleMap.clearMarkers();
		});
	}
})();