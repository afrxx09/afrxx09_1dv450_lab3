(function() {
	'use strict';

	angular
	.module('app')
	.controller('searchController', SearchController);

	SearchController.$inject = ['$scope', 'myGooglePlaces', 'eventService'];
	function SearchController($scope, myGooglePlaces, eventService) {
		$scope.places = myGooglePlaces;
		$scope.$watch('places.place', function(){
			var place = $scope.places.place;
			if(place != null){
				eventService.getEventsByGooglePlaceId(place.place_id)
				.success(function(data){
					$scope.events = data.events;
				})
				.error(function(err){
					
				});
			}
		});
	}
})();