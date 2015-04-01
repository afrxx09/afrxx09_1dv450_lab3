(function() {
	'use strict';

	angular
	.module('app')
	.controller('homeController', HomeController);

	HomeController.$inject = ['$scope', '$state', 'eventService', 'myMessages', 'myGoogleMap'];
	function HomeController($scope, $state, eventService, myMessages, myGoogleMap){
		$scope.events = [];
		
		//If user accepts geo location map is centerd on that location
		if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
        		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        		myGoogleMap.map.setCenter(pos);
        		myGoogleMap.map.setZoom(12);
        		google.maps.event.trigger(myGoogleMap.map, 'dragend');
            });
        }
		
		
		function refreshEvents(){
			var c = myGoogleMap.map.getCenter();
			eventService.getNearbyEvents(c.lat(), c.lng())
			.success(function(data){
				$scope.events = data.events;
			})
			.error(function(){
				myMessages.error('Error getting events');
			});
		}
		refreshEvents();
		google.maps.event.addListener(myGoogleMap.map, 'dragend', function() {
			refreshEvents();
		});
		
		$scope.$watch('events', function(){
			myGoogleMap.clearMarkers();
			for(var i = 0; i < $scope.events.length; i++){
				myGoogleMap.addMarker($scope.events[i].position.lat, $scope.events[i].position.lng);
				$scope.events[i].marker = myGoogleMap.markers[i];
				google.maps.event.addListener(myGoogleMap.markers[i], 'click', (function(event) {
					return function(){
						if(event.place){
							$state.go('place', {id: event.place.id});
							myGoogleMap.clearMarkers();
						}
						else{
							$state.go('event', {id: event.id});
							myGoogleMap.clearMarkers();	
						}
					}
				})($scope.events[i]));
			}
			myGoogleMap.placeMarkers();
		});
		
		$scope.$on('$destroy', function(){
			google.maps.event.clearListeners(myGoogleMap.map, 'dragend')
		});
	}
})();