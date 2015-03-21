(function() {
	'use strict';

	angular
	.module('app')
	.controller('placesController', PlacesController)
	.controller('placeController', PlaceController);

	PlacesController.$inject = ['$scope', 'placeService'];
	function PlacesController($scope, placeService) {
		placeService.getPlaces()
		.success(function(data){
			$scope.places = data.places;
		})
		.error(function(){
			
		});
	}
	
	PlaceController.$inject = ['$scope', '$stateParams', 'placeService'];
	function PlaceController($scope, $stateParams, placeService) {
		placeService.getPlace($stateParams.id)
		.success(function(data){
			$scope.place = data;
		})
		.error(function(){
			console.log('error getting place');
		});
	}
})();