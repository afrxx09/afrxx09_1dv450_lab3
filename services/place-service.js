(function(){
	'use strict';

	angular
	.module('app')
	.factory('placeService', PlaceService);

	PlaceService.$inject = ['$http', 'CONST'];

	function PlaceService($http, CONST){
		return {
			getPlaces: function(){
				return $http.get(CONST.API_URL + 'places');
			},
			getPlace: function(id){
				return $http.get(CONST.API_URL + 'places/' + id);
			}
		};
	}
})();