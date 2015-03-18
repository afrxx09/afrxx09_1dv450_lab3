(function(){
	'use strict';
	angular
	.module('TattooMap')
	.directive('myGoogleMap', MyGoogleMap);
	
	function MyGoogleMap(){
		return {
			restrict: 'A',
			scope: {},
			templateUrl: 'views/directives/my-google-map.html',
			controller: myGoogleMapController
		};
		
		function myGoogleMapController($scope, $element, $attrs){
			$element[0].style.height = '100%';
			var mapOptions = {center: { lat: -34.397, lng: 150.644}, zoom: 8};
			$scope.googleMap = new google.maps.Map(document.getElementById('my-google-map-canvas'), mapOptions);
		}
	}
})();