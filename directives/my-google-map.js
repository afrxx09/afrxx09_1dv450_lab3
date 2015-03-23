(function(){
	'use strict';

	angular
	.module('googleMapsDirective', [])
	.factory('myGoogleMap', MyGoogleMapFactory)
	.directive('googleMap', MyGoogleMapDirective);
	
	MyGoogleMapFactory.$inject = [];
	function MyGoogleMapFactory(){
		return {
			events: [],
			markers: [],
			setEvents: function(events){
				this.events = events;
			},
		};
	}
	
	MyGoogleMapDirective.$inject = [];
	function MyGoogleMapDirective(){
		return {
			restrict: 'A',
			scope: {},
			replace: true,
			template: '<div id="my-google-map-canvas"></div>',
			controller: MyGoogleMapController
		};
		
		MyGoogleMapController.$inject = ['$scope', '$element', '$attrs', 'myGoogleMap', 'eventService', 'myMessages'];
		function MyGoogleMapController($scope, $element, $attrs, myGoogleMap, eventService, myMessages){
			$scope.factory = myGoogleMap;
			//Init map
			var mapOptions = {
				center: { lat: 59.300, lng: 18.200},
				zoom: 8,
				panControl: false,
				zoomControl: false
			};
			$scope.googleMap = new google.maps.Map(document.getElementById('my-google-map-canvas'), mapOptions);
			getNearbyEvents()
			//If user accepts geo location map is centerd on that location
			if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
            		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            		$scope.googleMap.setCenter(pos);
            		$scope.googleMap.setZoom(12);
                });
            }
            
            //EventListener for when the map position is updated
			google.maps.event.addListener($scope.googleMap, 'dragend', function() {
				getNearbyEvents();
			});
			
			//Get events by position from service
			function getNearbyEvents(){
				var center = $scope.googleMap.getCenter();
				eventService.getNearbyEvents(center.lat(), center.lng())
				.success(function(data){
					$scope.factory.setEvents(data.events);
				})
				.error(function(){
					myMessages.error('Could not get events from current location.');
				});
			}
			
			//Watching the factory for change in events, updates markers on map if set of events changes
			$scope.$watch('factory.events', updateMarkers);
			function updateMarkers(){
				clearMarkers($scope.factory.markers);
				createMarkers($scope.factory.events);
				placeMarkers($scope.factory.markers);
			}
			function clearMarkers(markers){
				for(var i = 0; i < markers.length; i++){
					markers[i].setMap(null);
				}
			}
			function createMarkers(events){
				$scope.factory.markers = [];
				for(var i = 0; i < events.length; i++){
					$scope.factory.markers.push(createMarker(events[i]));
				}
			}
			function createMarker(e){
				var latlng = new google.maps.LatLng(e.position.lat, e.position.lng);
				return new google.maps.Marker({ position: latlng});
			}
			function placeMarkers(markers){
				for(var i = 0; i < markers.length; i++){
					markers[i].setMap($scope.googleMap);
				}
			}
		}
	}
})();