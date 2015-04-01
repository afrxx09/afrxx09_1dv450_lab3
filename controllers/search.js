(function() {
	'use strict';

	angular
	.module('app')
	.controller('searchController', SearchController);

	SearchController.$inject = ['$scope', '$state', 'myGooglePlaces', 'myMessages', 'placeService', 'eventService'];
	function SearchController($scope, $state, myGooglePlaces, myMessages, placeService, eventService) {
		//Wait for autocomplete to load
		$scope.$watch(function(){return myGooglePlaces.autocomplete;},function(){
			google.maps.event.addListener(myGooglePlaces.autocomplete, 'place_changed', function() {
				myGooglePlaces.infoWindow.close();
				myGooglePlaces.place = myGooglePlaces.autocomplete.getPlace();
				myGooglePlaces.map.setCenter(myGooglePlaces.place.geometry.location);
	  			myGooglePlaces.map.setZoom(15);
				
				placeService.getPlaceByGoogleId(myGooglePlaces.place.place_id)
				.success(function(data){
					if(data){
						$state.go('place', {id: data.id})
					}
					else{
						myGooglePlaces.infoWindow.setContent('<div><strong>' + myGooglePlaces.place.name + '</strong><br /></div>');
		      			myGooglePlaces.infoWindow.setPosition(myGooglePlaces.place.geometry.location)
						myGooglePlaces.infoWindow.open(myGooglePlaces.map);
						myMessages.warning('No one has been here yet');
					}
				})
				.error(function(){
					console.log('error');
				});
			});
		});
	}
})();