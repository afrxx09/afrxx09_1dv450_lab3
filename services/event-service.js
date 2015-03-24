(function(){
	'use strict';

	angular
	.module('app')
	.factory('eventService', EventService);

	EventService.$inject = ['$http', 'CONST'];

	function EventService($http, CONST){
		return {
			getEvents: function(){
				return $http.get(CONST.API_URL + 'events');
			},
			getEvent: function(id){
				return $http.get(CONST.API_URL + 'events/' + id);
			},
			getNearbyEvents: function(lat, lng){
				return $http.get(CONST.API_URL + 'events/nearby?lat=' + lat + '&lng=' + lng + '&radius=10');
			},
			deleteEvent: function(id){
				return $http.delete(CONST.API_URL + 'events/' + id);
			}
		};
	}
})();