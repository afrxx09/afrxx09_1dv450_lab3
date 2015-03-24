(function() {
	'use strict';

	angular
	.module('app')
	.controller('placesController', PlacesController)
	.controller('placeController', PlaceController);

	PlacesController.$inject = ['$scope', '$http', 'placeService', 'myMessages'];
	function PlacesController($scope, $http, placeService, myMessages) {
		placeService.getPlaces(10, 0)
		.success(function(data){
			$scope.places = data.places;
			setupPrevNext(data);
		})
		.error(function(err){
			myMessages.error('Error fetching places.');
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
	
	PlaceController.$inject = ['$scope', '$stateParams', 'placeService', 'myGoogleMap'];
	function PlaceController($scope, $stateParams, placeService, myGoogleMap) {
		placeService.getPlace($stateParams.id)
		.success(function(data){
			console.log(data);
			$scope.place = data;
			if(data.lat && data.lng){
				myGoogleMap.setCenter(lat, lng);
			}
		})
		.error(function(){
			myMessages.error('Error fetching place.');
		});
	}
})();