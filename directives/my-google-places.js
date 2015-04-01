(function(){
	'use strict';

	angular
	.module('googlePlacesDirective', [])
	.factory('myGooglePlaces', MyGooglePlacesFactory)
	.directive('googlePlaces', MyGooglePlacesDirective);
	
	MyGooglePlacesFactory.$inject = [];
	function MyGooglePlacesFactory(){
		return {
			autocomplete: null,
			place: null,
			map: null,
			infoWindow: null
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
		
		MyGooglePlacesController.$inject = ['$scope', '$element', '$attrs',, 'myGooglePlaces', 'myGoogleMap'];
		function MyGooglePlacesController($scope, $element, $attrs, myGooglePlaces, myGoogleMap){
			myGoogleMap.clearMarkers();
			myGooglePlaces = myGooglePlaces;
			myGooglePlaces.map = myGoogleMap.map;
			myGooglePlaces.autocomplete = new google.maps.places.Autocomplete(
				document.getElementById('queryInput'),
				{
					bounds: myGooglePlaces.map.getBounds(),
					types: ['establishment']
				}	
			);
			myGooglePlaces.infoWindow = new google.maps.InfoWindow();
			
			google.maps.event.addListener(myGooglePlaces.map, 'bounds_changed', function() {
				myGooglePlaces.autocomplete.setBounds(myGooglePlaces.map.getBounds());
			});
			
			$scope.$on('$destroy', function(){
				myGooglePlaces.place = null;
				myGooglePlaces.autocomplete = null;
				myGooglePlaces.infoWindow.close();
				google.maps.event.clearListeners(myGooglePlaces.map, 'bounds_changed');
			});
		}
	}
})();