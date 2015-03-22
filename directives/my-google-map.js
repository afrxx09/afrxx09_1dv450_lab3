(function(){
	'use strict';

	angular
	.module('googleMapsDirective', [])
	.directive('myGoogleMap', MyGoogleMap);
	
	MyGoogleMap.$inject = ['$rootScope'];
	
	function MyGoogleMap($rootScope){
		return {
			restrict: 'A',
			scope: {},
			replace: true,
			template: '<div id="my-google-map-canvas"></div>',
			controller: MyGoogleMapController
		};
		
		MyGoogleMapController.$inject = ['$rootScope', '$scope', '$element', '$attrs'];

		function MyGoogleMapController($rootScope, $scope, $element, $attrs){
			var mapOptions = {
				center: { lat: 59.300, lng: 18.200},
				zoom: 8,
				panControl: false,
				zoomControl: false
			};
			$scope.googleMap = new google.maps.Map(document.getElementById('my-google-map-canvas'), mapOptions);
			
			if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
            		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            		$scope.googleMap.setCenter(pos);
            		$scope.googleMap.setZoom(12);
                });
            }
            
			google.maps.event.addListener($scope.googleMap, "center_changed", function() {
				$rootScope.mapCenter = $scope.googleMap.getCenter();
			});
		}
	}
})();