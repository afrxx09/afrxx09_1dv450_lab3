(function(){
	'use strict';

	angular
	.module('app')
	.factory('placeService', PlaceService);

	PlaceService.$inject = ['$http', 'CONST'];

	function PlaceService($http, CONST){
		return {
			getPlaces: function(limit, offset){
				return $http.get(CONST.API_URL + 'places?limit=' + limit + '&offset=' + offset);
			},
			getPlace: function(id){
				return $http.get(CONST.API_URL + 'places/' + id);
			}
		};
	}
})();