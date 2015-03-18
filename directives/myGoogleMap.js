(function(){
	'use strict';

	angular
	.module('googleMapsDirective', [])
	.directive('myGoogleMap', MyGoogleMap);
	
	function MyGoogleMap(){
		return {
			restrict: 'A',
			scope: {},
			replace: true,
			template: '<div id="my-google-map-canvas"></div>',
			controller: myGoogleMapController
		};
		
		myGoogleMapController.$inject = ['$scope', '$element', '$attrs'];

		function myGoogleMapController($scope, $element, $attrs){
			var mapOptions = {center: { lat: -34.397, lng: 150.644}, zoom: 8};
			$scope.googleMap = new google.maps.Map(document.getElementById('my-google-map-canvas'), mapOptions);
		}

		function getCenter(){
			return $scope.googleMap.getCenter();
		}
	}
})();