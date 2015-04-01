(function(){
	'use strict';

	angular
	.module('googleMapsDirective', [])
	.factory('myGoogleMap', MyGoogleMapFactory)
	.directive('googleMap', MyGoogleMapDirective);
	
	MyGoogleMapFactory.$inject = [];
	function MyGoogleMapFactory(){
		return {
			center: { lat: 59.300, lng: 18.200},
			zoom: 8,
			map: null,
			markers: [],
			draggable: null,
			clearMarkers: function(){
				for(var i = 0; i < this.markers.length; i++){
					this.markers[i].setMap(null);
				}
				this.markers = [];
			},
			addMarker: function(lat, lng){
				var latlng = new google.maps.LatLng(lat, lng);
				var marker = new google.maps.Marker({ position: latlng});
				this.markers.push(marker);
			},
			placeMarkers: function(){
				for(var i = 0; i < this.markers.length; i++){
					this.markers[i].setMap(this.map);
				}
			}
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
			var mapOptions = {
				center: myGoogleMap.center,
				zoom: myGoogleMap.zoom,
				panControl: false,
				zoomControl: false
			};
			myGoogleMap.map = new google.maps.Map(document.getElementById('my-google-map-canvas'), mapOptions);
		}
	}
})();