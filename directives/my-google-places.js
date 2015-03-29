(function(){
	'use strict';

	angular
	.module('googlePlacesDirective', [])
	.factory('myGooglePlaces', MyGooglePlacesFactory)
	.directive('googlePlaces', MyGooglePlacesDirective);
	
	MyGooglePlacesFactory.$inject = [];
	function MyGooglePlacesFactory(){
		return {
			query: null,
			place: null
		};
	}
	
	MyGooglePlacesDirective.$inject = [];
	function MyGooglePlacesDirective(){
		return {
			restrict: 'A',
			scope: {},
			replace: true,
			template: '<div id="my-google-places"><input type="text" id="queryInput" /><div class="clear"></div></div>',
			controller: MyGooglePlacesController
		};
		
		MyGooglePlacesController.$inject = ['$scope', '$element', '$attrs', '$http', '$state', 'myGooglePlaces', 'myGoogleMap', 'placeService', 'CONST'];
		function MyGooglePlacesController($scope, $element, $attrs, $http, $state, myGooglePlaces, myGoogleMap, placeService, CONST){
			myGoogleMap.clearMarkers();
			$scope.factory = myGooglePlaces;
			var map = myGoogleMap.map;
			var autocomplete = new google.maps.places.Autocomplete(
				document.getElementById('queryInput'),
				{
					bounds: map.getBounds(),
					types: ['establishment']
				}	
			);
			var infowindow = new google.maps.InfoWindow();
			
  			google.maps.event.addListener(autocomplete, 'place_changed', function() {
  				infowindow.close();
				var place = autocomplete.getPlace();
				$scope.factory.place = place;
				map.setCenter(place.geometry.location);
      			map.setZoom(15);
				
				placeService.getPlaceByGoogleId(place.place_id)
				.success(function(data){
					if(data){
						$state.go('place', {id: data.id})
					}
					infowindow.setContent('<div><strong>' + place.name + '</strong><br /></div>');
	      			infowindow.setPosition(place.geometry.location)
					infowindow.open(map);
				})
				.error(function(){
					console.log('error');
				});
			});
			
			google.maps.event.addListener(map, 'bounds_changed', function() {
				autocomplete.setBounds(map.getBounds());
			});
			
			$scope.$on('$destroy', function(){
				myGooglePlaces.place = null;
				infowindow.close();
			});
		}
	}
})();